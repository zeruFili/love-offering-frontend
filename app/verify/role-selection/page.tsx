'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, FileCheck2 } from 'lucide-react';

const ROLE_OPTIONS = [
  { id: 'singer', label: 'Singer', description: 'Solo worship singer or vocalist' },
  { id: 'worship_group', label: 'Worship Group', description: 'Band, choir, or worship team' },
  { id: 'preacher', label: 'Preacher', description: 'Individual preacher or evangelist' },
  { id: 'church', label: 'Church', description: 'Church organization and leadership' },
  { id: 'ministry', label: 'Ministry', description: 'Ministry organization or mission' },
] as const;

export default function RoleSelectionPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string>('');

  const handleSelectRole = (roleId: string) => {
    setSelectedRole(roleId);
    sessionStorage.setItem('selectedVerificationRole', roleId);
    router.push(`/verify/selected-role?role=${encodeURIComponent(roleId)}`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur px-4 py-3">
        <div className="mx-auto max-w-3xl flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-slate-100 transition"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5 text-slate-700" />
          </button>
          <h1 className="text-base font-semibold text-slate-900">Role Selection</h1>
        </div>
      </header>

      <main className="px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-900">Choose your role to continue</h2>
            
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {ROLE_OPTIONS.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => handleSelectRole(role.id)}
                className={`rounded-2xl border p-4 text-left transition ${
                  selectedRole === role.id
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-primary/60 hover:bg-slate-50'
                }`}
              >
                <p className="text-sm font-semibold text-slate-900">{role.label}</p>
                <p className="mt-1 text-xs text-slate-600">{role.description}</p>
              </button>
            ))}
          </div>

          <div className="mt-6 text-sm text-slate-500">
            <Link href="/" className="hover:text-slate-700">Back to home</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
