'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'church' | 'ministry' | 'preacher' | 'singer' | 'musician' | 'worship_group' | 'choir_director' | 'donor';
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
  phone?: string;
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
  updateProfile: (updates: { name: string; phone: string; email: string; password?: string }) => void;
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

const ADDITIONAL_MOCK_USERS: Record<string, { password: string; user: User }> = {
  'ephrem@example.com': { password: 'ephrem123', user: { id: '7', email: 'ephrem@example.com', name: 'Ephrem Alemu', role: 'singer', verificationStatus: 'approved', accountStatus: 'active', totalEarnings: 2450, supporterCount: 31, bankAccounts: [{ id: 'bank-7', bankName: 'Demo Music Bank', accountNumber: '****7001', accountHolderName: 'Ephrem Alemu', isDefault: true, verificationStatus: 'verified' }] } },
  'kalkidan@example.com': { password: 'kalkidan123', user: { id: '8', email: 'kalkidan@example.com', name: 'Kalkidan Lilly Tilahun', role: 'singer', verificationStatus: 'approved', accountStatus: 'active', totalEarnings: 1980, supporterCount: 26, bankAccounts: [{ id: 'bank-8', bankName: 'Demo Music Bank', accountNumber: '****8001', accountHolderName: 'Kalkidan Lilly Tilahun', isDefault: true, verificationStatus: 'verified' }] } },
  'minase@example.com': { password: 'minase123', user: { id: '9', email: 'minase@example.com', name: 'Minase Firdawek', role: 'musician', verificationStatus: 'approved', accountStatus: 'active', totalEarnings: 1760, supporterCount: 22, bankAccounts: [{ id: 'bank-9', bankName: 'Demo Music Bank', accountNumber: '****9001', accountHolderName: 'Minase Firdawek', isDefault: true, verificationStatus: 'verified' }] } },
  'yosef@example.com': { password: 'yosef123', user: { id: '10', email: 'yosef@example.com', name: 'Yosef Kassa', role: 'singer', verificationStatus: 'approved', accountStatus: 'active', totalEarnings: 1540, supporterCount: 20, bankAccounts: [{ id: 'bank-10', bankName: 'Demo Music Bank', accountNumber: '****1001', accountHolderName: 'Yosef Kassa', isDefault: true, verificationStatus: 'verified' }] } },
  'tesfaye@example.com': { password: 'tesfaye123', user: { id: '11', email: 'tesfaye@example.com', name: 'Tesfaye Gabisso', role: 'singer', verificationStatus: 'approved', accountStatus: 'active', totalEarnings: 1420, supporterCount: 18, bankAccounts: [{ id: 'bank-11', bankName: 'Demo Music Bank', accountNumber: '****1101', accountHolderName: 'Tesfaye Gabisso', isDefault: true, verificationStatus: 'verified' }] } },
  'sofia@example.com': { password: 'sofia123', user: { id: '12', email: 'sofia@example.com', name: 'Sofia Shibabaw', role: 'singer', verificationStatus: 'approved', accountStatus: 'active', totalEarnings: 2210, supporterCount: 29, bankAccounts: [{ id: 'bank-12', bankName: 'Demo Music Bank', accountNumber: '****1201', accountHolderName: 'Sofia Shibabaw', isDefault: true, verificationStatus: 'verified' }] } },
  'samuel@example.com': { password: 'samuel123', user: { id: '13', email: 'samuel@example.com', name: 'Samuel Negussie', role: 'musician', verificationStatus: 'approved', accountStatus: 'active', totalEarnings: 1320, supporterCount: 16, bankAccounts: [{ id: 'bank-13', bankName: 'Demo Music Bank', accountNumber: '****1301', accountHolderName: 'Samuel Negussie', isDefault: true, verificationStatus: 'verified' }] } },
  'bereket@example.com': { password: 'bereket123', user: { id: '14', email: 'bereket@example.com', name: 'Bereket Tesfaye', role: 'singer', verificationStatus: 'approved', accountStatus: 'active', totalEarnings: 1670, supporterCount: 21, bankAccounts: [{ id: 'bank-14', bankName: 'Demo Music Bank', accountNumber: '****1401', accountHolderName: 'Bereket Tesfaye', isDefault: true, verificationStatus: 'verified' }] } },
  'azeb@example.com': { password: 'azeb123', user: { id: '15', email: 'azeb@example.com', name: 'Azeb Hailu', role: 'singer', verificationStatus: 'approved', accountStatus: 'active', totalEarnings: 1890, supporterCount: 25, bankAccounts: [{ id: 'bank-15', bankName: 'Demo Music Bank', accountNumber: '****1501', accountHolderName: 'Azeb Hailu', isDefault: true, verificationStatus: 'verified' }] } },
  'fenan@example.com': { password: 'fenan123', user: { id: '16', email: 'fenan@example.com', name: 'Fenan Befkadu', role: 'singer', verificationStatus: 'approved', accountStatus: 'active', totalEarnings: 2040, supporterCount: 27, bankAccounts: [{ id: 'bank-16', bankName: 'Demo Music Bank', accountNumber: '****1601', accountHolderName: 'Fenan Befkadu', isDefault: true, verificationStatus: 'verified' }] } },
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
    const storedCredentials = localStorage.getItem('loveoffering_credentials');
    const credentials = storedCredentials ? JSON.parse(storedCredentials) as { email: string; password: string } : null;
    const userRecord = MOCK_USERS[email] ?? ADDITIONAL_MOCK_USERS[email];
    const isStoredUser = credentials?.email === email && credentials.password === password;
    if ((userRecord && userRecord.password === password) || isStoredUser) {
      const storedUser = localStorage.getItem('loveoffering_user');
      const userData = storedUser && credentials?.email === email
        ? JSON.parse(storedUser) as User
        : { ...userRecord!.user };
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

  const updateProfile = (updates: { name: string; phone: string; email: string; password?: string }) => {
    if (!user) return;

    const updated = { ...user, name: updates.name, phone: updates.phone, email: updates.email };
    setUser(updated);
    localStorage.setItem('loveoffering_user', JSON.stringify(updated));

    const storedCredentials = localStorage.getItem('loveoffering_credentials');
    const currentCredentials = storedCredentials
      ? JSON.parse(storedCredentials) as { email: string; password: string }
      : { email: user.email, password: '' };
    localStorage.setItem('loveoffering_credentials', JSON.stringify({
      email: updates.email,
      password: updates.password || currentCredentials.password,
    }));
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
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, isAuthLoaded, login, logout, updateProfile, updateUser, addBankAccount, updateBankAccount }}>
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
