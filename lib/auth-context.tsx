'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'church' | 'ministry' | 'preacher' | 'singer' | 'worship_group' | 'donor';
export type VerificationStatus = 'pending' | 'approved' | 'rejected' | 'under_review';
export type AccountStatus = 'active' | 'disabled';

export interface BankAccount {
  id: string;
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  isDefault: boolean;
  verificationStatus: 'verified' | 'pending' | 'failed';
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  verificationStatus: VerificationStatus;
  accountStatus: AccountStatus;
  totalEarnings: number;
  supporterCount: number;
  documentUrl?: string;
  submissionDate?: string;
  bankAccounts: BankAccount[];
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isAuthLoaded: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  addBankAccount: (account: Omit<BankAccount, 'id'>) => void;
  updateBankAccount: (id: string, updates: Partial<BankAccount>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'admin@love.offering': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@love.offering',
      name: 'Admin User',
      role: 'admin',
      verificationStatus: 'approved',
      accountStatus: 'active',
      totalEarnings: 0,
      supporterCount: 0,
      bankAccounts: [],
    },
  },
  'church@example.com': {
    password: 'church123',
    user: {
      id: '2',
      email: 'church@example.com',
      name: 'Grace Community Church',
      role: 'church',
      verificationStatus: 'approved',
      accountStatus: 'active',
      totalEarnings: 5200,
      supporterCount: 48,
      documentUrl: '/docs/church-cert.pdf',
      bankAccounts: [
        {
          id: 'bank-1',
          bankName: 'First National Bank',
          accountNumber: '****4321',
          accountHolderName: 'Grace Community Church',
          isDefault: true,
          verificationStatus: 'verified',
        },
      ],
    },
  },
  'ministry@example.com': {
    password: 'ministry123',
    user: {
      id: '3',
      email: 'ministry@example.com',
      name: 'Hope Ministry International',
      role: 'ministry',
      verificationStatus: 'approved',
      accountStatus: 'active',
      totalEarnings: 3800,
      supporterCount: 32,
      documentUrl: '/docs/ministry-cert.pdf',
      bankAccounts: [
        {
          id: 'bank-2',
          bankName: 'Global Bank',
          accountNumber: '****5678',
          accountHolderName: 'Hope Ministry International',
          isDefault: true,
          verificationStatus: 'verified',
        },
      ],
    },
  },
  'preacher@example.com': {
    password: 'preacher123',
    user: {
      id: '4',
      email: 'preacher@example.com',
      name: 'Rev. John Mensah',
      role: 'preacher',
      verificationStatus: 'approved',
      accountStatus: 'active',
      totalEarnings: 2150,
      supporterCount: 24,
      documentUrl: '/docs/preacher-cert.pdf',
      bankAccounts: [
        {
          id: 'bank-3',
          bankName: 'Heritage Bank',
          accountNumber: '****7890',
          accountHolderName: 'John Mensah',
          isDefault: true,
          verificationStatus: 'verified',
        },
      ],
    },
  },
  'singer@example.com': {
    password: 'singer123',
    user: {
      id: '5',
      email: 'singer@example.com',
      name: 'Aster Abebe',
      role: 'singer',
      verificationStatus: 'approved',
      accountStatus: 'active',
      totalEarnings: 1650,
      supporterCount: 19,
      documentUrl: '/docs/singer-cert.pdf',
      bankAccounts: [
        {
          id: 'bank-4',
          bankName: 'Metropolitan Bank',
          accountNumber: '****1234',
          accountHolderName: 'Aster Abebe',
          isDefault: true,
          verificationStatus: 'verified',
        },
      ],
    },
  },
  'user@example.com': {
    password: 'user123',
    user: {
      id: '6',
      email: 'user@example.com',
      name: 'Regular Donor',
      role: 'donor',
      verificationStatus: 'approved',
      accountStatus: 'active',
      totalEarnings: 0,
      supporterCount: 0,
      bankAccounts: [],
    },
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('loveoffering_user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setIsAuthLoaded(true);
  }, []);

  const login = (email: string, password: string): boolean => {
    const userRecord = MOCK_USERS[email];
    if (userRecord && userRecord.password === password) {
      const userData = { ...userRecord.user };
      setUser(userData);
      localStorage.setItem('loveoffering_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('loveoffering_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updated = { ...user, ...updates };
      setUser(updated);
      localStorage.setItem('loveoffering_user', JSON.stringify(updated));
    }
  };

  const addBankAccount = (account: Omit<BankAccount, 'id'>) => {
    if (user) {
      const newAccount: BankAccount = {
        ...account,
        id: `bank-${Date.now()}`,
      };
      const updated = {
        ...user,
        bankAccounts: [...user.bankAccounts, newAccount],
      };
      setUser(updated);
      localStorage.setItem('loveoffering_user', JSON.stringify(updated));
    }
  };

  const updateBankAccount = (id: string, updates: Partial<BankAccount>) => {
    if (user) {
      const updated = {
        ...user,
        bankAccounts: user.bankAccounts.map(acc =>
          acc.id === id ? { ...acc, ...updates } : acc
        ),
      };
      setUser(updated);
      localStorage.setItem('loveoffering_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, isAuthLoaded, login, logout, updateUser, addBankAccount, updateBankAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
