'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeft, Settings as SettingsIcon, LogOut, Shield, FileText, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function SettingsPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!mounted || !user) return null;

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
      router.push('/login');
    }
  };

  const isCreator = ['church', 'ministry', 'preacher', 'singer', 'worship_group'].includes(user.role);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-slate-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <SettingsIcon className="w-5 h-5 text-primary" />
        <h1 className="font-semibold text-slate-900">Settings</h1>
      </div>

      <div className="px-4 py-6">
        {/* Profile Section */}
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">Profile</h2>
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
            <div>
              <p className="text-xs text-slate-600">Name</p>
              <p className="text-sm font-semibold text-slate-900">{user.name}</p>
            </div>
            <div>
              <p className="text-xs text-slate-600">Email</p>
              <p className="text-sm font-semibold text-slate-900">{user.email}</p>
            </div>
            <div>
              <p className="text-xs text-slate-600">Role</p>
              <p className="text-sm font-semibold text-slate-900">
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </p>
            </div>
            {isCreator && (
              <div>
                <p className="text-xs text-slate-600">Verification Status</p>
                <div className="mt-1 flex items-center gap-2">
                  <span className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                    user.verificationStatus === 'approved'
                      ? 'bg-green-100 text-green-700'
                      : user.verificationStatus === 'pending'
                      ? 'bg-amber-100 text-amber-700'
                      : user.verificationStatus === 'under_review'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {user.verificationStatus.toUpperCase()}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Creator Actions */}
        {isCreator && (
          <>
            <h2 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">Creator Tools</h2>
            <div className="space-y-2 mb-6">
              {user.verificationStatus === 'approved' && (
                <>
                  <Link href="/upload" className="block">
                    <button className="w-full text-left flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-primary hover:bg-primary/5 transition">
                      <FileText className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Upload Video</p>
                        <p className="text-xs text-slate-600">Share ministry content</p>
                      </div>
                    </button>
                  </Link>
                  <Link href="/contributors" className="block">
                    <button className="w-full text-left flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-primary hover:bg-primary/5 transition">
                      <Shield className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Manage Contributors</p>
                        <p className="text-xs text-slate-600">Add co-creators to videos</p>
                      </div>
                    </button>
                  </Link>
                </>
              )}
              <Link href="/bank-accounts" className="block">
                <button className="w-full text-left flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200 hover:border-primary hover:bg-primary/5 transition">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <div>
                    {/* FIXED: Added missing quote and closing tag */}
                    <p className="text-sm font-semibold text-slate-900">Accounts</p>
                    <p className="text-xs text-slate-600">
                      {user.bankAccounts?.length > 0 ? `${user.bankAccounts.length} account${user.bankAccounts.length > 1 ? 's' : ''}` : 'Add receiving account'}
                    </p>
                  </div>
                </button>
              </Link>
              {user.verificationStatus !== 'approved' && (
                <Link href="/verify/role-selection" className="block">
                  <button className="w-full text-left flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200">
                    <FileText className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="text-sm font-semibold text-amber-900">Get Verified</p>
                      <p className="text-xs text-amber-700">Submit documents to start earning</p>
                    </div>
                  </button>
                </Link>
              )}
            </div>
          </>
        )}

        {/* Account Actions */}
        <h2 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">Account</h2>
        <div className="space-y-2">
          <button
            onClick={handleLogout}
            className="w-full text-left flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-200 hover:bg-red-100 transition"
          >
            <LogOut className="w-5 h-5 text-red-600" />
            <div>
              <p className="text-sm font-semibold text-red-900">Logout</p>
              <p className="text-xs text-red-700">Sign out from your account</p>
            </div>
          </button>
        </div>

        {/* Info */}
        <div className="mt-8 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div className="text-xs text-slate-600 space-y-2">
            <div className="font-semibold">Love Offering Platform</div>
            <div>Version 1.0.0</div>
            <div>Transform spiritual moments into meaningful support</div>
          </div>
        </div>
      </div>
    </div>
  );
}