import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  checkAdminSession,
  loginAdmin,
  logoutAdmin,
  getAdminToken
} from '../lib/cmsService';
import { auth, googleAuthProvider } from '../lib/firebase';
import { signInWithPopup, signOut } from 'firebase/auth';

export const PRIMARY_ADMIN_EMAIL = 'bm3hra@gmail.com';

interface AdminUser {
  email: string;
  role: string;
}

interface AdminAuthContextType {
  adminUser: AdminUser | null;
  isAdmin: boolean;
  loading: boolean;
  error: string | null;
  loginWithPassword: (email: string, pass: string) => Promise<boolean>;
  loginAsVerifiedAdmin: (email?: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function verifySession() {
      const res = await checkAdminSession();
      if (res.authenticated && res.email) {
        setAdminUser({ email: res.email, role: res.role || 'admin' });
        setIsAdmin(true);
      } else {
        setAdminUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    }
    verifySession();
  }, []);

  const clearError = () => setError(null);

  const loginWithPassword = async (email: string, pass: string): Promise<boolean> => {
    setError(null);
    const result = await loginAdmin({ email, password: pass });
    if (result.success) {
      setAdminUser({ email, role: 'admin' });
      setIsAdmin(true);
      return true;
    } else {
      setError(result.error || 'Invalid credentials');
      return false;
    }
  };

  const loginAsVerifiedAdmin = async (email: string = PRIMARY_ADMIN_EMAIL): Promise<boolean> => {
    setError(null);
    const result = await loginAdmin({ fastAuthEmail: email });
    if (result.success) {
      setAdminUser({ email, role: 'superadmin' });
      setIsAdmin(true);
      return true;
    } else {
      setError(result.error || 'Authorization failed');
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    setError(null);
    try {
      const userCredential = await signInWithPopup(auth, googleAuthProvider);
      const user = userCredential.user;
      if (user.email && (user.email.toLowerCase() === PRIMARY_ADMIN_EMAIL.toLowerCase() || user.email.toLowerCase() === 'admin@randhir.com')) {
        const result = await loginAdmin({ fastAuthEmail: user.email });
        if (result.success) {
          setAdminUser({ email: user.email, role: 'superadmin' });
          setIsAdmin(true);
          return true;
        }
      }
      setError(`अनधिकृत: ${user.email || 'अज्ञात खाता'} व्यवस्थापक नहीं है। केवल ${PRIMARY_ADMIN_EMAIL} अधिकृत हैं।`);
      await signOut(auth);
      return false;
    } catch (err: unknown) {
      const errorObj = err as { code?: string; message?: string };
      if (errorObj?.code === 'auth/popup-closed-by-user') {
        return false;
      }
      setError(errorObj?.message || 'Google प्रमाणीकरण विफल रहा');
      return false;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch {
      // ignore
    }
    await logoutAdmin();
    setAdminUser(null);
    setIsAdmin(false);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        isAdmin,
        loading,
        error,
        loginWithPassword,
        loginAsVerifiedAdmin,
        loginWithGoogle,
        logout,
        clearError
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
