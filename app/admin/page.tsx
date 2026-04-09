'use client';

import { useAuth } from '@/lib/auth-context';
import { useData } from '@/lib/data-context';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeft, Shield, Users, Video, CheckCircle, XCircle, Eye, EyeOff, Download, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function AdminPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { verificationRequests, videos, updateVerificationRequest, toggleVideoStatus, addAdminLog } = useData();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState('verifications');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVerification, setSelectedVerification] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showConfirm, setShowConfirm] = useState<{ type: string; id: string } | null>(null);

  useEffect(() => {
    setMounted(true);
    if (!user || user.role !== 'admin') {
      router.push('/');
    }
  }, [user, router]);

  if (!mounted || !user || user.role !== 'admin') return null;

  const pendingVerifications = verificationRequests.filter(
    v => v.status === 'pending' || v.status === 'under_review'
  );

  const handleApproveVerification = (verificationId: string) => {
    updateVerificationRequest(verificationId, {
      status: 'approved',
    });
    addAdminLog({
      id: `log-${Date.now()}`,
      adminId: user.id,
      action: 'verify_user',
      details: { verificationId, status: 'approved' },
      timestamp: new Date().toISOString(),
    });
    setSelectedVerification(null);
    setShowConfirm(null);
  };

  const handleRejectVerification = (verificationId: string) => {
    if (!rejectReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }
    updateVerificationRequest(verificationId, {
      status: 'rejected',
      rejectionReason: rejectReason,
    });
    addAdminLog({
      id: `log-${Date.now()}`,
      adminId: user.id,
      action: 'reject_verification',
      details: { verificationId, reason: rejectReason },
      timestamp: new Date().toISOString(),
    });
    setSelectedVerification(null);
    setRejectReason('');
    setShowConfirm(null);
  };

  const handleToggleVideoStatus = (videoId: string) => {
    toggleVideoStatus(videoId);
    const video = videos.find(v => v.id === videoId);
    addAdminLog({
      id: `log-${Date.now()}`,
      adminId: user.id,
      action: 'toggle_video',
      targetVideoId: videoId,
      details: { newStatus: video?.status === 'AVAILABLE' ? 'NOT_AVAILABLE' : 'AVAILABLE' },
      timestamp: new Date().toISOString(),
    });
  };

  const filteredVideos = videos.filter(v =>
    v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    v.creatorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <Shield className="w-5 h-5 text-primary" />
        <h1 className="font-semibold text-slate-900">Admin Dashboard</h1>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-slate-200 flex overflow-x-auto px-4 sticky top-14 z-9">
        {[
          { id: 'verifications', label: 'Verifications', count: pendingVerifications.length },
          { id: 'videos', label: 'Videos', count: videos.length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className="ml-2 inline-block px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="px-4 py-6">
        {/* Verifications Tab */}
        {activeTab === 'verifications' && (
          <div>
            {selectedVerification ? (
              // Verification Detail View
              (() => {
                const verification = verificationRequests.find(v => v.id === selectedVerification);
                if (!verification) return null;

                return (
                  <div className="space-y-4">
                    <button
                      onClick={() => setSelectedVerification(null)}
                      className="flex items-center gap-2 text-primary hover:underline text-sm"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back to List
                    </button>

                    <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
                      {/* User Info */}
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-3">User Information</h3>
                        <div className="space-y-2 text-sm">
                          <div>
                            <p className="text-slate-600">Name</p>
                            <p className="font-medium text-slate-900">{verification.userName}</p>
                          </div>
                          <div>
                            <p className="text-slate-600">Applied Role</p>
                            <p className="font-medium text-slate-900">
                              {verification.selectedRole.charAt(0).toUpperCase() + verification.selectedRole.slice(1)}
                            </p>
                          </div>
                          <div>
                            <p className="text-slate-600">Submission Date</p>
                            <p className="font-medium text-slate-900">
                              {new Date(verification.submissionDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-slate-600">Status</p>
                            <p className={`font-medium ${
                              verification.status === 'pending' ? 'text-amber-600' :
                              verification.status === 'under_review' ? 'text-blue-600' :
                              'text-green-600'
                            }`}>
                              {verification.status.toUpperCase()}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Documents */}
                      <div className="border-t border-slate-200 pt-4">
                        <h3 className="font-semibold text-slate-900 mb-3">Documents</h3>
                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <AlertCircle className="w-5 h-5 text-slate-400" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-slate-900">Document.pdf</p>
                            <p className="text-xs text-slate-600">{verification.documentUrl}</p>
                          </div>
                          <button className="text-primary hover:text-primary/80 transition">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="border-t border-slate-200 pt-4 space-y-3">
                        <button
                          onClick={() => setShowConfirm({ type: 'approve', id: verification.id })}
                          className="w-full py-3 px-4 rounded-lg bg-green-50 text-green-700 font-semibold hover:bg-green-100 transition flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve Verification
                        </button>

                        <div className="space-y-2">
                          <textarea
                            placeholder="Rejection reason (if rejecting)..."
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            className="w-full p-3 rounded-lg border border-slate-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-200"
                            rows={3}
                          />
                          <button
                            onClick={() => setShowConfirm({ type: 'reject', id: verification.id })}
                            disabled={!rejectReason.trim()}
                            className="w-full py-3 px-4 rounded-lg bg-red-50 text-red-700 font-semibold hover:bg-red-100 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <XCircle className="w-4 h-4" />
                            Reject Verification
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Confirmation Dialog */}
                    {showConfirm && (
                      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-xl p-6 max-w-sm w-full">
                          <h3 className="font-semibold text-slate-900 mb-2">Confirm Action</h3>
                          <p className="text-slate-600 text-sm mb-4">
                            Are you sure you want to {showConfirm.type === 'approve' ? 'approve' : 'reject'} this verification request?
                          </p>
                          <div className="flex gap-3">
                            <button
                              onClick={() => setShowConfirm(null)}
                              className="flex-1 py-2 px-4 rounded-lg border border-slate-200 text-slate-900 hover:bg-slate-50 transition"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => {
                                if (showConfirm.type === 'approve') {
                                  handleApproveVerification(showConfirm.id);
                                } else {
                                  handleRejectVerification(showConfirm.id);
                                }
                              }}
                              className={`flex-1 py-2 px-4 rounded-lg text-white transition ${
                                showConfirm.type === 'approve'
                                  ? 'bg-green-600 hover:bg-green-700'
                                  : 'bg-red-600 hover:bg-red-700'
                              }`}
                            >
                              Confirm
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()
            ) : (
              // Verifications List
              <div className="space-y-3">
                {pendingVerifications.length > 0 ? (
                  pendingVerifications.map((verification) => (
                    <button
                      key={verification.id}
                      onClick={() => setSelectedVerification(verification.id)}
                      className="w-full text-left bg-white rounded-xl border border-slate-200 p-4 hover:border-primary hover:shadow-lg transition"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-slate-900">{verification.userName}</h3>
                          <p className="text-sm text-slate-600 mt-1">
                            Role: {verification.selectedRole.charAt(0).toUpperCase() + verification.selectedRole.slice(1)}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            Submitted: {new Date(verification.submissionDate).toLocaleDateString()}
                          </p>
                        </div>
                        <div className={`text-xs font-semibold px-2 py-1 rounded ${
                          verification.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {verification.status.toUpperCase()}
                        </div>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <CheckCircle className="w-12 h-12 text-green-300 mx-auto mb-4" />
                    <p className="text-slate-600">All verifications are complete!</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Videos Tab */}
        {activeTab === 'videos' && (
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Search videos by title or creator..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-4"
            />

            <div className="space-y-3">
              {filteredVideos.length > 0 ? (
                filteredVideos.map((video) => (
                  <div key={video.id} className="bg-white rounded-xl border border-slate-200 p-4">
                    <div className="flex gap-4">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 line-clamp-1">{video.title}</h3>
                        <p className="text-sm text-slate-600 mt-1">{video.creatorName}</p>
                        <div className="flex items-center gap-2 mt-3">
                          <span className={`text-xs font-semibold px-2 py-1 rounded ${
                            video.status === 'AVAILABLE'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {video.status === 'AVAILABLE' ? 'AVAILABLE' : 'NOT AVAILABLE'}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          if (confirm(`Set video to ${video.status === 'AVAILABLE' ? 'NOT_AVAILABLE' : 'AVAILABLE'}?`)) {
                            handleToggleVideoStatus(video.id);
                          }
                        }}
                        className={`p-3 rounded-lg transition ${
                          video.status === 'AVAILABLE'
                            ? 'bg-red-50 text-red-600 hover:bg-red-100'
                            : 'bg-green-50 text-green-600 hover:bg-green-100'
                        }`}
                        title={video.status === 'AVAILABLE' ? 'Hide video' : 'Show video'}
                      >
                        {video.status === 'AVAILABLE' ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <Video className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-600">No videos found</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
