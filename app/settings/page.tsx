'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeft, Settings as SettingsIcon, LogOut, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

type EditableField = 'name' | 'phone' | 'email' | 'password';

export default function SettingsPage() {
  const router = useRouter();
  const { user, logout, updateProfile, isAuthLoaded } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [editingField, setEditingField] = useState<EditableField | null>(null);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    setMounted(true);
    if (!isAuthLoaded) return;
    if (!user) {
      router.push('/login');
    }
  }, [user, router, isAuthLoaded]);

  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setPhone(user.phone ?? '');
    setEmail(user.email);
  }, [user]);

  if (!mounted || !user) return null;

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      logout();
      router.push('/login');
    }
  };

  const handleEdit = (field: EditableField) => {
    setEditingField(field);
    setSaveMessage('');
  };

  const handleSave = (field: EditableField) => {
    updateProfile({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      password: field === 'password' && password ? password : undefined,
    });
    if (field === 'password') setPassword('');
    setEditingField(null);
    setSaveMessage(`${field === 'password' ? 'Password' : field === 'phone' ? 'Phone number' : field.charAt(0).toUpperCase() + field.slice(1)} saved.`);
  };

  const isCreator = ['church', 'ministry', 'preacher', 'singer', 'musician', 'worship_group', 'choir_director'].includes(user.role);

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-3 p-2 hover:bg-slate-100 rounded-lg"
          aria-label="Back to previous"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
          <SettingsIcon className="w-5 h-5 text-primary" />
          <span className="font-semibold text-slate-900">Settings</span>
        </button>
      </div>

      <div className="px-4 py-6">
        {/* Profile Section */}
        <div className="mb-6">
          <h2 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">Profile</h2>
          <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-4">
            <div>
              <div className="flex items-center justify-between gap-3 mb-1">
                <label htmlFor="name" className="block text-xs text-slate-600">Name</label>
                <Button type="button" variant="outline" size="sm" onClick={() => handleEdit('name')}>Edit</Button>
              </div>
              <input id="name" value={name} onChange={(event) => setName(event.target.value)} disabled={editingField !== 'name'} required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:bg-slate-50 disabled:text-slate-600" />
              {editingField === 'name' && <Button type="button" className="mt-2" size="sm" onClick={() => handleSave('name')}>Save</Button>}
            </div>
            <div>
              <div className="flex items-center justify-between gap-3 mb-1">
                <label htmlFor="phone" className="block text-xs text-slate-600">Phone number</label>
                <Button type="button" variant="outline" size="sm" onClick={() => handleEdit('phone')}>Edit</Button>
              </div>
              <input id="phone" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} disabled={editingField !== 'phone'} required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:bg-slate-50 disabled:text-slate-600" />
              {editingField === 'phone' && <Button type="button" className="mt-2" size="sm" onClick={() => handleSave('phone')}>Save</Button>}
            </div>
            <div>
              <div className="flex items-center justify-between gap-3 mb-1">
                <label htmlFor="email" className="block text-xs text-slate-600">Email address</label>
                <Button type="button" variant="outline" size="sm" onClick={() => handleEdit('email')}>Edit</Button>
              </div>
              <input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} disabled={editingField !== 'email'} required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:bg-slate-50 disabled:text-slate-600" />
              {editingField === 'email' && <Button type="button" className="mt-2" size="sm" onClick={() => handleSave('email')}>Save</Button>}
            </div>
            <div>
              <div className="flex items-center justify-between gap-3 mb-1">
                <label htmlFor="password" className="block text-xs text-slate-600">New password</label>
                <Button type="button" variant="outline" size="sm" onClick={() => handleEdit('password')}>Edit</Button>
              </div>
              <input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} disabled={editingField !== 'password'} placeholder="Enter a new password" minLength={6} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm disabled:bg-slate-50 disabled:text-slate-600" />
              {editingField === 'password' && <Button type="button" className="mt-2" size="sm" onClick={() => handleSave('password')}>Save</Button>}
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
            <p aria-live="polite" className="text-xs text-green-700">{saveMessage}</p>
          </div>
        </div>

        {/* Creator Actions */}
        {isCreator && (
          <>
            {user.verificationStatus !== 'approved' && (
              <>
                <h2 className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-3">Creator Tools</h2>
                <div className="space-y-2 mb-6">
                  <Link href="/verify/role-selection" className="block">
                    <button className="w-full text-left flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200">
                      <FileText className="w-5 h-5 text-amber-600" />
                      <div>
                        <p className="text-sm font-semibold text-amber-900">Get Verified</p>
                        <p className="text-xs text-amber-700">Submit documents to start earning</p>
                      </div>
                    </button>
                  </Link>
                </div>
              </>
            )}
          </>
        )}

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