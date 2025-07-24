// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';

interface User {
  name?: string;
  email?: string;
  // add more user fields as needed
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (user?: User) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URI}/auth/google/current_user`, {
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.error('Error checking current user:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = (userOverride?: User) => {
    if (userOverride) {
      setUser(userOverride);
    } else {
      // fallback call if you want to re-fetch the current_user
      fetch(`${import.meta.env.VITE_BACKEND_URI}/auth/google/current_user`, {
        credentials: 'include',
      })
        .then(res => res.json())
        .then(setUser)
        .catch(() => setUser(null));
    }
  };

  const logout = async () => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URI}/auth/logout`, {
        method: 'GET',
        credentials: 'include',
      });
    } catch (err) {
      console.error('Logout failed', err);
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
