'use client';

import { useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Upload, FileText } from 'lucide-react';

const ROLE_LABELS: Record<string, string> = {
  singer: 'Singer',
  worship_group: 'Worship Group',
  preacher: 'Preacher',
  church: 'Church',
  ministry: 'Ministry',
};

type RoleKey = 'singer' | 'worship_group' | 'preacher' | 'church' | 'ministry';

type RequirementItem = {
  id: string;
  label: string;
  required: boolean;
  uploadMode?: 'single' | 'frontBack';
};

const ROLE_REQUIREMENTS: Record<RoleKey, { purpose: string; docs: RequirementItem[] }> = {
  church: {
    purpose: 'Ensure the church is legally recognized.',
    docs: [
      { id: 'church_registration_certificate', label: 'Church registration certificate', required: true },
      { id: 'government_registration_document', label: 'Government registration document', required: true },
    ],
  },
  ministry: {
    purpose: 'Confirm official ministry status.',
    docs: [{ id: 'ministry_registration_certificate', label: 'Ministry registration certificate', required: true }],
  },
  worship_group: {
    purpose: 'Ensure a responsible leader represents the group.',
    docs: [
      {
        id: 'worship_group_certificate_or_leader_id',
        label: 'Worship group certificate OR leader government ID',
        required: true,
      },
    ],
  },
  preacher: {
    purpose: 'Verify identity and credibility.',
    docs: [
      { id: 'government_id', label: 'Government ID', required: true, uploadMode: 'frontBack' },
      { id: 'church_affiliation_document', label: 'Church affiliation document', required: false },
    ],
  },
  singer: {
    purpose: 'Verify the artist identity.',
    docs: [{ id: 'government_id', label: 'Government ID', required: true, uploadMode: 'frontBack' }],
  },
};

export default function SelectedRoleClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const role = useMemo(() => {
    const fromQuery = searchParams.get('role');
    const fromStorage = typeof window !== 'undefined' ? sessionStorage.getItem('selectedVerificationRole') : null;
    return fromQuery || fromStorage || '';
  }, [searchParams]);

  const roleKey = role as RoleKey;
  const roleLabel = ROLE_LABELS[role] || role;
  const config = ROLE_REQUIREMENTS[roleKey];

  const missingRoleConfig = !role || !config;

  const requiredDocs = config?.docs.filter((doc) => doc.required) ?? [];
  const canSubmit = requiredDocs.every((doc) => {
    if (doc.uploadMode === 'frontBack') {
      return Boolean(uploadedFiles[`${doc.id}_front`]) && Boolean(uploadedFiles[`${doc.id}_back`]);
    }
    return Boolean(uploadedFiles[doc.id]);
  });

  const handleFileChange = (docId: string, fileName: string) => {
    if (!fileName) return;
    setUploadedFiles((prev) => ({ ...prev, [docId]: fileName }));
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    setSubmitted(true);
  };

  if (missingRoleConfig) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h1 className="text-xl font-semibold text-slate-900">No role selected</h1>
          <p className="mt-2 text-slate-600">Please choose a role first.</p>
          <Link
            href="/verify/role-selection"
            className="mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition"
          >
            Go to Role Selection
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Verification Submitted</h1>
          <p className="mt-2 text-slate-600">
            Role: <span className="font-semibold text-slate-900">{roleLabel}</span>
          </p>
          <p className="mt-1 text-sm text-slate-500">Your documents were attached successfully.</p>
          <div className="mt-6 flex gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition"
            >
              Back to Home
            </Link>
            <Link
              href="/verify/role-selection"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
            >
              Change Role
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <button
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <FileText className="w-6 h-6" />
        </div>

        <h1 className="text-2xl font-bold text-slate-900">Verification Requirements</h1>
        <p className="mt-2 text-slate-600">
          Selected role: <span className="font-semibold text-slate-900">{roleLabel}</span>
        </p>
        <p className="mt-1 text-sm text-slate-500">Purpose: {config.purpose}</p>

        <div className="mt-6 space-y-3">
          {config.docs.map((doc) => (
            <div key={doc.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{doc.label}</p>
                  <p className="mt-1 text-xs text-slate-500">{doc.required ? 'Required' : 'Optional'}</p>
                </div>
                {((doc.uploadMode === 'frontBack' && uploadedFiles[`${doc.id}_front`] && uploadedFiles[`${doc.id}_back`]) ||
                  (doc.uploadMode !== 'frontBack' && uploadedFiles[doc.id])) && (
                  <span className="text-xs font-medium rounded-full bg-green-100 text-green-700 px-2 py-1">Uploaded</span>
                )}
              </div>

              {doc.uploadMode === 'frontBack' ? (
                <div className="mt-3 space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <label className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition cursor-pointer">
                      <Upload className="w-4 h-4" />
                      Upload Front
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        onChange={(event) => handleFileChange(`${doc.id}_front`, event.target.files?.[0]?.name || '')}
                      />
                    </label>
                    <label className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition cursor-pointer">
                      <Upload className="w-4 h-4" />
                      Upload Back
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        onChange={(event) => handleFileChange(`${doc.id}_back`, event.target.files?.[0]?.name || '')}
                      />
                    </label>
                  </div>
                  {uploadedFiles[`${doc.id}_front`] && (
                    <p className="text-xs text-slate-600">Front: {uploadedFiles[`${doc.id}_front`]}</p>
                  )}
                  {uploadedFiles[`${doc.id}_back`] && (
                    <p className="text-xs text-slate-600">Back: {uploadedFiles[`${doc.id}_back`]}</p>
                  )}
                </div>
              ) : (
                <>
                  <label className="mt-3 inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition cursor-pointer">
                    <Upload className="w-4 h-4" />
                    Upload File
                    <input
                      type="file"
                      className="hidden"
                      onChange={(event) => handleFileChange(doc.id, event.target.files?.[0]?.name || '')}
                    />
                  </label>

                  {uploadedFiles[doc.id] && (
                    <p className="mt-2 text-xs text-slate-600">{uploadedFiles[doc.id]}</p>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Verification
          </button>
          <Link
            href="/verify/role-selection"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition"
          >
            Choose Again
          </Link>
        </div>
      </div>
    </div>
  );
}
