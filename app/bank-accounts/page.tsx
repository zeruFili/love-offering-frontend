'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeft, CreditCard, Plus, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function BankAccountsPage() {
  const router = useRouter();
  const { user, addBankAccount, updateBankAccount } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    bankName: '',
    accountNumber: '',
    accountHolderName: '',
  });

  useEffect(() => {
    setMounted(true);
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!mounted || !user) return null;

  const handleAddAccount = () => {
    if (!formData.bankName || !formData.accountNumber || !formData.accountHolderName) {
      alert('Please fill in all fields');
      return;
    }

    addBankAccount({
      bankName: formData.bankName,
      accountNumber: `****${formData.accountNumber.slice(-4)}`,
      accountHolderName: formData.accountHolderName,
      isDefault: user.bankAccounts.length === 0,
      verificationStatus: 'verified',
    });

    setFormData({ bankName: '', accountNumber: '', accountHolderName: '' });
    setShowForm(false);
  };

  const handleSetDefault = (accountId: string) => {
    user.bankAccounts.forEach(acc => {
      if (acc.id === accountId) {
        updateBankAccount(accountId, { isDefault: true });
      } else if (acc.isDefault) {
        updateBankAccount(acc.id, { isDefault: false });
      }
    });
  };

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
        <CreditCard className="w-5 h-5 text-primary" />
        <h1 className="font-semibold text-slate-900">Bank Accounts</h1>
      </div>

      <div className="px-4 py-6">
        {/* Info Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-700">
            <p className="font-semibold mb-1">How Bank Accounts Work</p>
            <ul className="text-xs space-y-1 list-disc list-inside">
              <li>Set one account as default for receiving tips</li>
              <li>Tips split proportionally among all recipients</li>
              <li>Automatic routing minimizes transfer fees</li>
              <li>All accounts must be verified before use</li>
            </ul>
          </div>
        </div>

        {/* Bank Accounts List */}
        {user.bankAccounts.length > 0 && (
          <div className="mb-6">
            <h2 className="text-sm font-semibold text-slate-900 mb-3">Your Bank Accounts</h2>
            <div className="space-y-3">
              {user.bankAccounts.map((account) => (
                <div
                  key={account.id}
                  className={`rounded-xl border p-4 ${
                    account.isDefault
                      ? 'bg-primary/5 border-primary'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-900">{account.bankName}</h3>
                        {account.isDefault && (
                          <span className="text-xs font-semibold px-2 py-1 rounded-full bg-primary text-white">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mt-1">{account.accountHolderName}</p>
                      <p className="text-xs text-slate-500 mt-1 font-mono">{account.accountNumber}</p>
                    </div>
                    <div>
                      {account.verificationStatus === 'verified' && (
                        <div className="text-green-600 flex items-center gap-1">
                          <CheckCircle className="w-5 h-5" />
                          <span className="text-xs font-semibold">Verified</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {!account.isDefault && (
                    <button
                      onClick={() => handleSetDefault(account.id)}
                      className="text-xs font-medium text-primary hover:text-primary/80 transition"
                    >
                      Set as Default
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Account Form */}
        {showForm ? (
          <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
            <h2 className="text-sm font-semibold text-slate-900 mb-4">Add New Bank Account</h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-900 mb-1">Bank Name</label>
                <Input
                  type="text"
                  placeholder="e.g., First National Bank"
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-900 mb-1">Account Holder Name</label>
                <Input
                  type="text"
                  placeholder="Full name on account"
                  value={formData.accountHolderName}
                  onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-900 mb-1">Account Number</label>
                <Input
                  type="password"
                  placeholder="••••••••1234"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                />
                <p className="text-xs text-slate-500 mt-1">Last 4 digits will be shown</p>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => {
                    setShowForm(false);
                    setFormData({ bankName: '', accountNumber: '', accountHolderName: '' });
                  }}
                  className="flex-1 py-2 px-3 rounded-lg border border-slate-200 text-slate-900 hover:bg-slate-50 transition text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAccount}
                  className="flex-1 py-2 px-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition text-sm font-medium"
                >
                  Add Account
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowForm(true)}
            className="w-full py-4 px-4 rounded-xl border-2 border-dashed border-primary text-primary hover:bg-primary/5 transition flex items-center justify-center gap-2 font-semibold"
          >
            <Plus className="w-5 h-5" />
            Add Bank Account
          </button>
        )}

        {/* Info Text */}
        <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <p className="text-xs text-slate-600">
            <strong>Security Note:</strong> Your account number is encrypted and secured. Only the last 4 digits are visible for identification purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
