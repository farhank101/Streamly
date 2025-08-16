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
  isSupabaseInitialized,
} from "../services/supabase";

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<{ error: any }>;
  register: (credentials: RegisterCredentials) => Promise<{ error: any }>;
  logout: () => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  deleteAccount: () => Promise<{ error: any }>;
  isAuthenticated: boolean;
  refreshSession: () => Promise<void>;
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
  refreshSession: async () => {},
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

  // Enhanced session checking with retry mechanism
  const checkUser = async (retryCount = 0): Promise<void> => {
    try {
      // Check if Supabase is properly initialized
      if (!isSupabaseInitialized()) {
        console.warn(
          "Supabase not properly initialized, checking environment..."
        );
        setState({
          user: null,
          isLoading: false,
          error:
            "Supabase configuration error. Please check your environment variables.",
          isAuthenticated: false,
        });
        return;
      }

      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      // First try to get the current session
      const { data: sessionData, error: sessionError } =
        await supabase.auth.getSession();

      if (sessionError) {
        console.warn("Session check error:", sessionError);
        // Don't throw here, continue to user check
      }

      // Then try to get the current user
      const { data, error } = await getCurrentUser();

      if (error) {
        // If it's an auth session missing error, try to refresh
        if (error.message?.includes("Auth session missing") && retryCount < 2) {
          console.log("Auth session missing, attempting to refresh...");
          try {
            const { data: refreshData, error: refreshError } =
              await supabase.auth.refreshSession();
            if (!refreshError && refreshData.session) {
              // Retry after refresh
              setTimeout(() => checkUser(retryCount + 1), 1000);
              return;
            }
          } catch (refreshErr) {
            console.warn("Session refresh failed:", refreshErr);
          }
        }

        // If we still have an error after retry, handle it gracefully
        if (retryCount >= 2) {
          console.warn("Max retries reached, setting unauthenticated state");
          setState({
            user: null,
            isLoading: false,
            error: null,
            isAuthenticated: false,
          });
          return;
        }

        throw error;
      }

      if (data?.user) {
        // Convert Supabase user to our User type
        const user: User = {
          id: data.user.id,
          email: data.user.email || "",
          username:
            (data.user as any).profile?.username ||
            data.user.user_metadata?.username ||
            data.user.email?.split("@")[0] || // Fallback to email prefix
            `user_${data.user.id.slice(0, 8)}`, // Fallback to user ID prefix
          avatarUrl:
            (data.user as any).profile?.avatar_url ||
            data.user.user_metadata?.avatar_url ||
            null,
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

      // Handle specific error types gracefully
      if (error.message?.includes("Auth session missing")) {
        console.log("Auth session missing, setting unauthenticated state");
        setState({
          user: null,
          isLoading: false,
          error: null,
          isAuthenticated: false,
        });
      } else {
        setState({
          user: null,
          isLoading: false,
          error: error.message || "Authentication error",
          isAuthenticated: false,
        });
      }
    }
  };

  // Refresh session function
  const refreshSession = async (): Promise<void> => {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (!error && data.session) {
        await checkUser();
      } else {
        // If refresh fails, clear the state
        setState({
          user: null,
          isLoading: false,
          error: null,
          isAuthenticated: false,
        });
      }
    } catch (error) {
      console.error("Session refresh error:", error);
      setState({
        user: null,
        isLoading: false,
        error: null,
        isAuthenticated: false,
      });
    }
  };

  // Check for existing session on mount
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Log Supabase status in development
        if (process.env.NODE_ENV === "development") {
          console.log("🔐 Initializing authentication...");
          console.log("🔐 Supabase status:", {
            initialized: isSupabaseInitialized(),
            url: process.env.EXPO_PUBLIC_SUPABASE_URL ? "Set" : "Missing",
            anonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY
              ? "Set"
              : "Missing",
          });
        }

        // Wait a bit for Supabase to initialize
        await new Promise((resolve) => setTimeout(resolve, 100));

        if (mounted) {
          await checkUser();
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        if (mounted) {
          setState({
            user: null,
            isLoading: false,
            error: null,
            isAuthenticated: false,
          });
        }
      }
    };

    initializeAuth();

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;

      console.log("Auth state change:", event, session?.user?.id);

      if (event === "SIGNED_IN" && session) {
        await checkUser();
      } else if (event === "SIGNED_OUT") {
        setState({
          user: null,
          isLoading: false,
          error: null,
          isAuthenticated: false,
        });
      } else if (event === "TOKEN_REFRESHED" && session) {
        await checkUser();
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
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
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
