import { useEffect, useState } from "react";
import { supabase } from "../lib/Supabase";
import { getAuthError } from "../utils/index";
import { AuthContext } from "./AuthContextValue";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error("Session error:", error.message);
        }

        if (!mounted) return;

        const currentUser = session?.user ?? null;

        setUser(currentUser);

        if (currentUser?.id) {
          await fetchProfile(currentUser.id);
        } else {
          setProfile(null);
        }
      } catch (err) {
        console.error("Auth load error:", err);
        setUser(null);
        setProfile(null);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {

      setUser(session?.user?? null);

      if (session?.user) {
        await fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function fetchProfile(userId) {
    if (!userId) {
      setProfile(null);
      return null;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      console.error("Profile fetch error:", error.message);
      setProfile(null);
      return null;
    }

    setProfile(data);
    return data;
  }
  async function signUp({email,password,fullName,username,role ="participant",college = "",yearOfStudy = "",mobile = "",skills = [],domains = [],
  }) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/verify-email`,
        data: {
          full_name: fullName,
          username,
          role,
          college,
          year_of_study: yearOfStudy,
          mobile,
          skills,
          domains,
        },
      },
    });

    return {
      data,
      error: error ? getAuthError(error.message) : null,
    };
  }

  async function signIn({ email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    return {
      data,
      error: error ? getAuthError(error.message) : null,
    };
  }

  async function signInWithGithub() {
    return supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  }

  async function signInWithGoogle() {
    return supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });
  }

  async function resetPassword(email) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });

    return {
      data,
      error: error ? getAuthError(error.message) : null,
    };
  }

  async function signOut() {
    console.log("AuthContext signOut called");

    try {
      await supabase.auth.signOut();

      const storageKeys = Object.keys(localStorage);

      storageKeys.forEach((key) => {
        if (
          key.includes("supabase") ||
          key.includes("sb-") ||
          key.includes("auth-token")
        ) {
          localStorage.removeItem(key);
        }
      });

      sessionStorage.clear();

      setUser(null);
      setProfile(null);
      setLoading(false);

      return { error: null };
    } catch (error) {
      console.error("Logout failed:", error);
      return { error };
    }
  }

  async function updateProfile(updates) {
    if (!user?.id) {
      return {
        data: null,
        error: "User is not authenticated.",
      };
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)
      .select()
      .single();

    if (!error) {
      setProfile(data);
    }

    return { data, error };
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        signUp,
        signIn,
        signInWithGithub,
        signInWithGoogle,
        signOut,
        resetPassword,
        updateProfile,
        fetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

