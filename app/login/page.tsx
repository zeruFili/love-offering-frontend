'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Lock, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = login(email, password);
    if (success) {
      router.push('/');
    } else {
      setError('Invalid email or password');
    }
    setLoading(false);
  };

  const demoAccounts = [
    { email: 'admin@love.offering', password: 'admin123', role: 'Admin' },
    { email: 'church@example.com', password: 'church123', role: 'Church' },
    { email: 'ministry@example.com', password: 'ministry123', role: 'Ministry' },
    { email: 'preacher@example.com', password: 'preacher123', role: 'Preacher' },
    { email: 'singer@example.com', password: 'singer123', role: 'Singer' },
    { email: 'user@example.com', password: 'user123', role: 'Donor' },
  ];

  const fillCredentials = (email: string, password: string) => {
    setEmail(email);
    setPassword(password);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-6">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-primary">Love Offering</h1>
          </div>
          <p className="text-center text-slate-600 text-sm">Transform spiritual moments into meaningful support</p>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 overflow-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="flex gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading || !email || !password}
              className="w-full bg-primary hover:bg-primary/90 text-white"
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-8 pt-8 border-t border-slate-200">
            <p className="text-center text-sm font-semibold text-slate-700 mb-4">Demo Credentials</p>
            <div className="grid grid-cols-1 gap-2">
              {demoAccounts.map((account) => (
                <button
                  key={account.email}
                  suppressHydrationWarning
                  onClick={() => fillCredentials(account.email, account.password)}
                  className="text-left p-3 rounded-lg border border-slate-200 hover:border-primary hover:bg-primary/5 transition"
                >
                  <div className="text-xs font-medium text-primary">{account.role}</div>
                  <div className="text-xs text-slate-600">{account.email}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
