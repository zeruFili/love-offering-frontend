'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeft, FileText, CheckCircle, AlertCircle, Clock, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function VerifyPage() {
  const router = useRouter();
  const { user, updateUser } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!mounted || !user) return null;

  const roles = [
    { id: 'church', label: 'Church', description: 'Religious organization' },
    { id: 'ministry', label: 'Ministry', description: 'Ministry organization' },
    { id: 'preacher', label: 'Preacher', description: 'Individual preacher' },
    { id: 'singer', label: 'Singer', description: 'Worship singer' },
    { id: 'worship_group', label: 'Worship Group', description: 'Group/band' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole || !fileName) {
      alert('Please select a role and upload a document');
      return;
    }

    updateUser({
      verificationStatus: 'pending',
      documentUrl: `/docs/verification-${Date.now()}.pdf`,
    });

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-amber-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-3">Verification Submitted</h1>
            <p className="text-slate-600 mb-6">
              Your verification request has been submitted. Our admin team will review your documents and get back to you within 24-48 hours.
            </p>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
              <div className="text-left space-y-3">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-amber-900">Status: PENDING REVIEW</p>
                    <p className="text-xs text-amber-700 mt-1">You'll be notified once approved</p>
                  </div>
                </div>
              </div>
            </div>

            <Button
              onClick={() => router.push('/dashboard')}
              className="w-full bg-primary hover:bg-primary/90 text-white"
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
        <FileText className="w-5 h-5 text-primary" />
        <h1 className="font-semibold text-slate-900">Get Verified</h1>
      </div>

      <div className="px-4 py-6">
        {/* Status Alert */}
        {user.verificationStatus === 'rejected' && (
          <div className="mb-6 flex gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-900">Verification Rejected</p>
              <p className="text-xs text-red-700 mt-1">
                Your previous submission was rejected. Please review and resubmit with corrected information.
              </p>
            </div>
          </div>
        )}

        {user.verificationStatus === 'approved' && (
          <div className="mb-6 flex gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-green-900">Verification Approved</p>
              <p className="text-xs text-green-700 mt-1">
                You can now upload videos and receive donations!
              </p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selection */}
          <div>
            <h2 className="text-sm font-semibold text-slate-900 mb-3">Select Your Role</h2>
            <div className="grid grid-cols-1 gap-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  type="button"
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-4 rounded-lg border-2 transition text-left ${
                    selectedRole === role.id
                      ? 'border-primary bg-primary/5'
                      : 'border-slate-200 hover:border-primary hover:bg-slate-50'
                  }`}
                >
                  <p className="font-semibold text-slate-900">{role.label}</p>
                  <p className="text-xs text-slate-600 mt-1">{role.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Document Upload */}
          <div>
            <h2 className="text-sm font-semibold text-slate-900 mb-3">Upload Document</h2>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-6 text-center hover:border-primary transition cursor-pointer">
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.png"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFileName(e.target.files[0].name);
                  }
                }}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer block">
                <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-900">Upload Document</p>
                <p className="text-xs text-slate-600 mt-1">
                  {fileName || 'Certificate, license, or organization document'}
                </p>
                <p className="text-xs text-slate-500 mt-2">PDF, DOC, DOCX, JPG, or PNG (Max 10MB)</p>
              </label>
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-2">
            <p className="text-sm font-semibold text-blue-900">Requirements</p>
            <ul className="text-xs text-blue-700 space-y-1 list-disc list-inside">
              <li>Valid identification or organization certificate</li>
              <li>Clear proof of your role/position</li>
              <li>Document must be current and readable</li>
              <li>Verification typically takes 24-48 hours</li>
            </ul>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!selectedRole || !fileName}
            className="w-full bg-primary hover:bg-primary/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit for Verification
          </Button>
        </form>
      </div>
    </div>
  );
}
