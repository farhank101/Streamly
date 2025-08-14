/**
 * Supabase Client Configuration
 * Sets up and exports the Supabase client for database operations
 */

import { createClient } from "@supabase/supabase-js";
import { Database } from "../types/database";
import { storage } from "./storage";

import { config } from "../config/environment";

// Supabase configuration using centralized config
const supabaseUrl = config.supabase.url;
const supabaseAnonKey = config.supabase.anonKey;

// Initialize the Supabase client
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

/**
 * Authentication helpers
 */

// Sign up a new user
export const signUp = async (
  email: string,
  password: string,
  username: string
) => {
  // First, check if username is already taken
  const { data: existingUser, error: checkError } = await supabase
    .from("users")
    .select("username")
    .eq("username", username)
    .single();

  if (existingUser) {
    return {
      data: null,
      error: {
        message: "Username already taken. Please choose a different one.",
      },
    };
  }

  // Create the user account
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
      },
    },
  });

  if (error) {
    return { data, error };
  }

  // If signup successful, create user profile in users table
  if (data.user) {
    const { error: profileError } = await supabase.from("users").insert({
      id: data.user.id,
      email: data.user.email!,
      username,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      premium_status: false,
      preferences: {},
    });

    if (profileError) {
      console.error("Error creating user profile:", profileError);
      // Don't fail the signup if profile creation fails
    }
  }

  return { data, error };
};

// Sign in with email or username
export const signIn = async (emailOrUsername: string, password: string) => {
  // Check if input is email or username
  const isEmail = emailOrUsername.includes("@");

  if (isEmail) {
    // Sign in with email
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailOrUsername,
      password,
    });
    return { data, error };
  } else {
    // Sign in with username - first find the user by username
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("email")
      .eq("username", emailOrUsername)
      .single();

    if (userError || !userData) {
      return {
        data: null,
        error: { message: "Invalid username or password." },
      };
    }

    // Sign in with the found email
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password,
    });
    return { data, error };
  }
};

// Sign out the current user
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

// Get the current user session
export const getCurrentSession = async () => {
  const { data, error } = await supabase.auth.getSession();
  return { data, error };
};

// Get the current user with profile data
export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return { data, error };
  }

  // Get additional user profile data
  const { data: profileData, error: profileError } = await supabase
    .from("users")
    .select("*")
    .eq("id", data.user.id)
    .single();

  if (profileError) {
    console.error("Error fetching user profile:", profileError);
  }

  // Combine auth user with profile data
  const userWithProfile = {
    ...data.user,
    profile: profileData,
  };

  return { data: { user: userWithProfile }, error };
};

// Reset password
export const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  return { error };
};

// Update user profile
export const updateUserProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from("users")
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)
    .select()
    .single();

  return { data, error };
};

/**
 * Delete current user's account and associated data.
 * Note: Deleting the auth user requires a Supabase Edge Function with a service role key.
 * This function will:
 * 1) Delete user-owned rows from public tables
 * 2) Clear local storage data
 * 3) Invoke the `delete-account` edge function to remove the auth user (if configured)
 */
export const deleteUserAccount = async (): Promise<{
  error: { message: string } | null;
  authDeletionAttempted: boolean;
}> => {
  try {
    // Get the current authenticated user
    const { data: userResult, error: userError } =
      await supabase.auth.getUser();
    if (userError || !userResult?.user) {
      return {
        error: { message: userError?.message || "Not authenticated" },
        authDeletionAttempted: false,
      };
    }

    const userId = userResult.user.id;

    // 1) Delete user data from application tables (scoped by RLS to the current user)
    // Listen history
    await supabase.from("listen_history").delete().eq("user_id", userId);

    // Liked tracks
    await supabase.from("liked_tracks").delete().eq("user_id", userId);

    // Follows (both directions)
    await supabase
      .from("user_follows")
      .delete()
      .or(`follower_id.eq.${userId},following_id.eq.${userId}`);

    // Playlists and related playlist_tracks
    const { data: playlists } = await supabase
      .from("playlists")
      .select("id")
      .eq("user_id", userId);

    const playlistIds = (playlists || []).map((p: { id: string }) => p.id);
    if (playlistIds.length > 0) {
      await supabase
        .from("playlist_tracks")
        .delete()
        .in("playlist_id", playlistIds);
    }

    await supabase.from("playlists").delete().eq("user_id", userId);

    // Users profile row
    await supabase.from("users").delete().eq("id", userId);

    // 2) Clear local storage data
    try {
      await storage.clearAllUserData();
    } catch (storageError) {
      console.warn("Failed to clear local storage:", storageError);
      // Continue with account deletion even if local storage cleanup fails
    }

    // 3) Attempt to delete the auth user via Edge Function (requires service role on server)
    try {
      const { error: fnError } = await supabase.functions.invoke(
        "delete-account",
        {
          body: { userId },
        }
      );
      if (fnError) {
        // Edge function not configured or failed; app data is removed already
        return {
          error: { message: fnError.message || "Auth deletion failed" },
          authDeletionAttempted: true,
        };
      }
    } catch (invokeError: any) {
      return {
        error: { message: invokeError?.message || "Auth deletion failed" },
        authDeletionAttempted: true,
      };
    }

    // Sign out locally to clear session
    await supabase.auth.signOut();

    return { error: null, authDeletionAttempted: true };
  } catch (error: any) {
    return {
      error: { message: error?.message || "Failed to delete account" },
      authDeletionAttempted: false,
    };
  }
};

export default supabase;
