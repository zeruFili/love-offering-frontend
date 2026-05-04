'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeft, Upload as UploadIcon, FileVideo, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function UploadPage() {
  const router = useRouter();
  const { user, isAuthLoaded } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fileName: '',
  });
  const [uploaded, setUploaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isAuthLoaded) return;
    if (!user) {
      router.push('/login');
      return;
    }
    if (user.verificationStatus !== 'approved') {
      router.push('/verify/role-selection');
    }
  }, [user, router, isAuthLoaded]);

  if (!mounted || !user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.fileName) {
      alert('Please fill in all fields');
      return;
    }
    setUploaded(true);
  };

  if (uploaded) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <div className="px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-3">Video Uploaded!</h1>
            <p className="text-slate-600 mb-6">
              Your video has been uploaded successfully and is now visible to donors. You can manage contributors and track earnings from your dashboard.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 text-left space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <p className="text-sm font-semibold text-green-900">Video: {formData.title}</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <p className="text-sm font-semibold text-green-900">Status: Available</p>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <p className="text-sm font-semibold text-green-900">Ready to receive donations</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={() => router.push('/dashboard')}
                variant="outline"
              >
                Dashboard
              </Button>
              <Button
                onClick={() => router.push('/contributors')}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Add Contributors
              </Button>
            </div>
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
        <UploadIcon className="w-5 h-5 text-primary" />
        <h1 className="font-semibold text-slate-900">Upload Video</h1>
      </div>

      <div className="px-4 py-6">
        {/* Info Alert */}
        <div className="mb-6 flex gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-900">Upload & Share</p>
            <p className="text-xs text-blue-700 mt-1">
              Upload your ministry content and start receiving donations. You can add contributors and manage their earnings.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Video Title */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Video Title</label>
            <Input
              type="text"
              placeholder="e.g., Sunday Service 2024"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          {/* Video Description */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Description</label>
            <textarea
              placeholder="Describe your video content..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none"
              rows={4}
              required
            />
          </div>

          {/* Video File Upload */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-3">Select Video File</label>
            <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-primary transition cursor-pointer">
              <input
                type="file"
                accept="video/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFormData({ ...formData, fileName: e.target.files[0].name });
                  }
                }}
                className="hidden"
                id="video-upload"
              />
              <label htmlFor="video-upload" className="cursor-pointer block">
                <FileVideo className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <p className="text-sm font-semibold text-slate-900">
                  {formData.fileName || 'Click to select video'}
                </p>
                <p className="text-xs text-slate-600 mt-2">
                  MP4, WebM, or Ogg (Max 500MB)
                </p>
              </label>
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <p className="text-sm font-semibold text-slate-900">Content Guidelines</p>
            <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
              <li>Clear, high-quality audio and video</li>
              <li>Minimum 2 minutes duration</li>
              <li>No copyrighted material without permission</li>
              <li>Appropriate title and description</li>
              <li>Family-friendly content</li>
            </ul>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={!formData.title || !formData.description || !formData.fileName}
            className="w-full bg-primary hover:bg-primary/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Upload Video
          </Button>
        </form>
      </div>
    </div>
  );
}
