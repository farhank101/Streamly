/**
 * Authentication Context
 * Provides authentication state and methods throughout the app
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import {
  User,
  AuthState,
  LoginCredentials,
  RegisterCredentials,
} from "../types/user";
import {
  supabase,
  signIn,
  signUp,
  signOut,
  getCurrentUser,
  resetPassword as resetPasswordService,
  deleteUserAccount as deleteUserAccountService,
} from "../services/supabase";

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ error: any }>;
  register: (credentials: RegisterCredentials) => Promise<{ error: any }>;
  logout: () => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  deleteAccount: () => Promise<{ error: any }>;
  isAuthenticated: boolean;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  error: null,
  isAuthenticated: false,
  login: async () => ({ error: null }),
  register: async () => ({ error: null }),
  logout: async () => ({ error: null }),
  resetPassword: async () => ({ error: null }),
  deleteAccount: async () => ({ error: null }),
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
    isAuthenticated: false,
  });

  // Check for existing session on mount
  useEffect(() => {
    const checkUser = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }));

        const { data, error } = await getCurrentUser();

        if (error) {
          throw error;
        }

        if (data?.user) {
          // Convert Supabase user to our User type
          const user: User = {
            id: data.user.id,
            email: data.user.email || "",
            username:
              (data.user as any).profile?.username ||
              data.user.user_metadata?.username,
            avatarUrl:
              (data.user as any).profile?.avatar_url ||
              data.user.user_metadata?.avatar_url,
            premiumStatus:
              (data.user as any).profile?.premium_status ||
              data.user.user_metadata?.premium_status ||
              false,
            preferences:
              (data.user as any).profile?.preferences ||
              data.user.user_metadata?.preferences ||
              {},
            createdAt: new Date(data.user.created_at),
            updatedAt: new Date(
              (data.user as any).profile?.updated_at ||
                data.user.updated_at ||
                data.user.created_at
            ),
          };

          setState({
            user,
            isLoading: false,
            error: null,
            isAuthenticated: true,
          });
        } else {
          setState({
            user: null,
            isLoading: false,
            error: null,
            isAuthenticated: false,
          });
        }
      } catch (error: any) {
        console.error("Auth check error:", error);
        setState({
          user: null,
          isLoading: false,
          error: error.message,
          isAuthenticated: false,
        });
      }
    };

    checkUser();

    // Listen for auth state changes
    const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        checkUser();
      } else if (event === "SIGNED_OUT") {
        setState({
          user: null,
          isLoading: false,
          error: null,
          isAuthenticated: false,
        });
      }
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const { data, error } = await signIn(
        credentials.emailOrUsername,
        credentials.password
      );

      if (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error.message,
        }));
        return { error };
      }

      // User will be updated by the auth state change listener
      return { error: null };
    } catch (error: any) {
      setState((prev) => ({ ...prev, isLoading: false, error: error.message }));
      return { error };
    }
  };

  // Register function
  const register = async (credentials: RegisterCredentials) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const { data, error } = await signUp(
        credentials.email,
        credentials.password,
        credentials.username
      );

      if (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error.message,
        }));
        return { error };
      }

      // User will be updated by the auth state change listener if auto-confirmed
      // Otherwise, we'll need to tell the user to check their email
      return { error: null };
    } catch (error: any) {
      setState((prev) => ({ ...prev, isLoading: false, error: error.message }));
      return { error };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const { error } = await signOut();

      if (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error.message,
        }));
        return { error };
      }

      // User will be updated by the auth state change listener
      return { error: null };
    } catch (error: any) {
      setState((prev) => ({ ...prev, isLoading: false, error: error.message }));
      return { error };
    }
  };

  // Reset password function
  const resetPassword = async (email: string) => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const { error } = await resetPasswordService(email);

      if (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error.message,
        }));
        return { error };
      }

      setState((prev) => ({ ...prev, isLoading: false }));
      return { error: null };
    } catch (error: any) {
      setState((prev) => ({ ...prev, isLoading: false, error: error.message }));
      return { error };
    }
  };

  // Delete account function
  const deleteAccount = async () => {
    try {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      const { error } = await deleteUserAccountService();

      if (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error.message,
        }));
        return { error };
      }

      // Clear the user state immediately after successful deletion
      setState({
        user: null,
        isLoading: false,
        error: null,
        isAuthenticated: false,
      });

      return { error: null };
    } catch (error: any) {
      setState((prev) => ({ ...prev, isLoading: false, error: error.message }));
      return { error };
    }
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    resetPassword,
    deleteAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { useAuth, AuthProvider };
export default AuthContext;
