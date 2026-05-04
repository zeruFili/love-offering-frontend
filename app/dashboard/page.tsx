'use client';

import { useAuth } from '@/lib/auth-context';
import { useData } from '@/lib/data-context';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeft, DollarSign, Users, Heart, Upload, CreditCard, FileText, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const { user, isAuthLoaded } = useAuth();
  const { videos, comments, getDonationsByDonor, getVideoById } = useData();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'donations' | 'earnings' | 'settings'>('donations');
  const isDonor = user?.role === 'donor';
  const isCreator = user ? ['church', 'ministry', 'preacher', 'singer', 'worship_group'].includes(user.role) : false;
  const canSeeCreatorTabs = !isDonor && isCreator;
  const primaryTab: 'donations' | 'earnings' = isDonor ? 'donations' : 'earnings';

  const normalizeText = (value: string) => value.trim().toLowerCase();

  useEffect(() => {
    setMounted(true);
    if (!isAuthLoaded) return;
    if (!user) {
      router.push('/login');
    }
  }, [user, router, isAuthLoaded]);

  useEffect(() => {
    setActiveTab(primaryTab);
  }, [primaryTab]);

  if (!mounted || !user) return null;

  const donations = isDonor ? getDonationsByDonor(user.id) : [];
  const totalAmount = donations.reduce((sum, donation) => sum + donation.amount, 0);
  const exactCreatorVideos = isCreator
    ? videos.filter((video) => normalizeText(video.creatorName) === normalizeText(user.name))
    : [];
  const creatorVideos = isCreator
    ? (exactCreatorVideos.length > 0
        ? exactCreatorVideos
        : videos.filter((video) => normalizeText(video.creatorRole) === normalizeText(user.role)))
    : [];
  const creatorVideoStats = creatorVideos.map((video) => {
    const videoComments = comments.filter((comment) => comment.videoId === video.id);
    const earnedAmount = videoComments.reduce((sum, comment) => sum + comment.amount, 0);
    const supporterCount = new Set(videoComments.map((comment) => comment.authorName)).size;

    return {
      video,
      earnedAmount,
      supporterCount,
      commentCount: videoComments.length,
    };
  });
  const creatorTotalEarned = creatorVideoStats.reduce((sum, item) => sum + item.earnedAmount, 0);
  const creatorSupporterCount = new Set(
    comments
      .filter((comment) => creatorVideos.some((video) => video.id === comment.videoId))
      .map((comment) => comment.authorName)
  ).size;

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
        <h1 className="font-semibold text-slate-900">
          {isDonor ? 'My Donations' : 'My Earnings'}
        </h1>
      </div>

      <div className="px-4 py-6 md:px-6">
        <div className="max-w-6xl mx-auto md:grid md:grid-cols-[220px_1fr] md:gap-6">
          {/* Sidebar */}
          <aside className="mb-4 md:mb-0">
            <div className="bg-white border border-slate-200 rounded-xl p-2 md:sticky md:top-20">
              <div className="flex gap-2 md:flex-col">
                {[
                  { id: primaryTab, label: isDonor ? 'Supported' : 'Earnings' },
                  canSeeCreatorTabs ? { id: 'settings', label: 'Bank Accounts' } : null,
                ].filter(Boolean).map((tab) => (
                  <button
                    key={tab!.id}
                    onClick={() => setActiveTab(tab!.id as 'donations' | 'earnings' | 'settings')}
                    className={`flex-1 md:flex-none text-left px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                      activeTab === tab!.id
                        ? 'bg-primary/10 text-primary'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {tab!.label}
                  </button>
                ))}
                {canSeeCreatorTabs && (
                  <Link href="/upload" className="flex-1 md:flex-none">
                    <button className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition">
                      Upload Video
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </aside>

          {/* Content */}
          <main>
            {/* Donations/Earnings Section with Overview on Top */}
            {(activeTab === 'donations' || activeTab === 'earnings') && (
              <div>
                <div className="grid grid-cols-2 gap-4 mb-6">
              {isDonor ? (
                <>
                  <div className="bg-linear-to-br from-primary to-primary/80 rounded-xl p-4 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white/80">Total Donated</span>
                      <Heart className="w-4 h-4" />
                    </div>
                    <p className="text-2xl font-bold">${totalAmount.toFixed(2)}</p>
                    <p className="text-xs text-white/70 mt-1">{donations.length} gifts</p>
                  </div>
                  <div className="bg-linear-to-br from-accent to-accent/80 rounded-xl p-4 text-slate-900">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">Creators Supported</span>
                      <Users className="w-4 h-4" />
                    </div>
                    <p className="text-2xl font-bold">{new Set(donations.map(d => d.videoId)).size}</p>
                    <p className="text-xs text-slate-600 mt-1">ministries</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-linear-to-br from-primary to-primary/80 rounded-xl p-4 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-white/80">Total Received</span>
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <p className="text-2xl font-bold">ETB {creatorTotalEarned.toLocaleString()}</p>
                    <p className="text-xs text-white/70 mt-1">{creatorVideoStats.length} videos</p>
                  </div>
                  <div className="bg-linear-to-br from-accent to-accent/80 rounded-xl p-4 text-slate-900">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">Supporters</span>
                      <Users className="w-4 h-4" />
                    </div>
                    <p className="text-2xl font-bold">{creatorSupporterCount}</p>
                    <p className="text-xs text-slate-600 mt-1">unique givers</p>
                  </div>
                </>
              )}
                </div>

                {/* Quick Actions */}
                <div className="space-y-2 mb-6">
                  {canSeeCreatorTabs && user.verificationStatus === 'approved' && (
                    <>
                      <Link href="/upload" className="block">
                        <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200 hover:border-primary hover:bg-primary/5 transition text-left">
                          <Upload className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-semibold text-slate-900">Upload Video</p>
                            <p className="text-xs text-slate-600">Share your ministry content</p>
                          </div>
                        </button>
                      </Link>
                      <Link href="/contributors" className="block">
                        <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200 hover:border-primary hover:bg-primary/5 transition text-left">
                          <Users className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-semibold text-slate-900">Manage Contributors</p>
                            <p className="text-xs text-slate-600">Add co-creators to videos</p>
                          </div>
                        </button>
                      </Link>
                    </>
                  )}

                  {canSeeCreatorTabs && user.verificationStatus !== 'approved' && (
                    <Link href="/verify/role-selection" className="block">
                      <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-left">
                        <FileText className="w-5 h-5 text-amber-600" />
                        <div>
                          <p className="font-semibold text-amber-900">Get Verified</p>
                          <p className="text-xs text-amber-700">Submit documents to start earning</p>
                        </div>
                      </button>
                    </Link>
                  )}

                  {canSeeCreatorTabs && (
                    <Link href="/bank-accounts" className="block">
                      <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-200 hover:border-primary hover:bg-primary/5 transition text-left">
                        <CreditCard className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-semibold text-slate-900">Bank Accounts</p>
                          <p className="text-xs text-slate-600">
                            {user.bankAccounts.length > 0 ? `${user.bankAccounts.length} account${user.bankAccounts.length > 1 ? 's' : ''} added` : 'Add account for payouts'}
                          </p>
                        </div>
                      </button>
                    </Link>
                  )}
                </div>

                {isDonor && donations.length > 0 ? (
                  <div className="space-y-3">
                    {donations.map((donation) => (
                      <div key={donation.id} className="bg-white rounded-xl border border-slate-200 p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-start gap-3 min-w-0">
                            {isDonor ? (() => {
                              const supportedVideo = getVideoById(donation.videoId);

                              return supportedVideo ? (
                                <img
                                  src={supportedVideo.thumbnail}
                                  alt={supportedVideo.title}
                                  className="w-14 h-14 rounded-lg object-cover border border-slate-200 shrink-0"
                                />
                              ) : (
                                <div className="w-14 h-14 rounded-lg bg-slate-100 border border-slate-200 shrink-0 flex items-center justify-center text-[10px] text-slate-500 text-center px-1">
                                  No video
                                </div>
                              );
                            })() : null}
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-900 truncate">
                                {isDonor
                                  ? getVideoById(donation.videoId)?.title ?? donation.videoId
                                  : donation.donorName}
                              </p>
                              {isDonor && getVideoById(donation.videoId)?.creatorName && (
                                <p className="text-xs text-slate-500 mt-1 truncate">
                                  {getVideoById(donation.videoId)?.creatorName}
                                </p>
                              )}
                              <p className="text-xs text-slate-500 mt-1">
                                {new Date(donation.timestamp).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <p className="text-lg font-bold text-primary">${donation.amount.toFixed(2)}</p>
                        </div>
                        {donation.comment && (
                          <p className="text-sm text-slate-600 mt-3 p-3 bg-slate-50 rounded-lg">
                            &quot;{donation.comment}&quot;
                          </p>
                        )}
                        <div className="mt-3 flex items-center gap-2 text-xs text-slate-600">
                          <span className="inline-block px-2 py-1 rounded-full bg-slate-100">
                            {Object.keys(donation.recipients).length} recipient{Object.keys(donation.recipients).length !== 1 ? 's' : ''}
                          </span>
                          {donation.status === 'completed' && (
                            <span className="inline-block px-2 py-1 rounded-full bg-green-100 text-green-700">
                              Completed
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : !isDonor ? (
                  creatorVideoStats.length > 0 ? (
                    <div className="space-y-3">
                      {creatorVideoStats.map(({ video, earnedAmount, supporterCount, commentCount }) => (
                        <Link key={video.id} href={`/dashboard/earnings/${video.id}`} className="block">
                          <div className="bg-white rounded-xl border border-slate-200 p-4 hover:border-primary hover:shadow-sm transition">
                            <div className="flex items-start gap-3">
                              <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="w-16 h-16 rounded-lg object-cover border border-slate-200 shrink-0"
                              />
                              <div className="min-w-0 flex-1">
                                <div className="flex items-start justify-between gap-3">
                                  <div className="min-w-0">
                                    <p className="font-semibold text-slate-900 truncate">{video.title}</p>
                                    <p className="text-xs text-slate-500 mt-1 truncate">{video.creatorName}</p>
                                  </div>
                                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1 text-xs font-semibold text-primary shrink-0">
                                    <PlayCircle className="w-3.5 h-3.5" />
                                    Open
                                  </span>
                                </div>

                                <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-600">
                                  <span className="inline-block px-2 py-1 rounded-full bg-slate-100">
                                    ETB {earnedAmount.toLocaleString()} earned
                                  </span>
                                  <span className="inline-block px-2 py-1 rounded-full bg-slate-100">
                                    {commentCount} gifts
                                  </span>
                                  <span className="inline-block px-2 py-1 rounded-full bg-slate-100">
                                    {supporterCount} supporters
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-white border border-slate-200 rounded-xl">
                      <Heart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                      <p className="text-slate-600 mb-2">No videos matched this creator yet</p>
                      <p className="text-xs text-slate-500">Creator videos are matched by creator name, with role fallback for seeded mock data.</p>
                    </div>
                  )
                ) : (
                  <div className="text-center py-12">
                    <Heart className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-600 mb-4">
                      {isDonor ? 'No donations yet' : 'No earnings yet'}
                    </p>
                    {isDonor && (
                      <Link href="/">
                        <Button className="bg-primary hover:bg-primary/90 text-white">
                          Browse & Give
                        </Button>
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Bank Accounts Tab */}
            {activeTab === 'settings' && canSeeCreatorTabs && (
              <div>
                {user.bankAccounts.length > 0 ? (
                  <div className="space-y-3 mb-6">
                    {user.bankAccounts.map((account) => (
                      <div
                        key={account.id}
                        className={`rounded-xl border p-4 ${
                          account.isDefault
                            ? 'bg-primary/5 border-primary'
                            : 'bg-white border-slate-200'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-slate-900">{account.bankName}</p>
                              {account.isDefault && (
                                <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary text-white">
                                  Default
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-slate-600 mt-1">{account.accountHolderName}</p>
                            <p className="text-xs text-slate-500 mt-1">{account.accountNumber}</p>
                            <p className="text-xs mt-2">
                              {account.verificationStatus === 'verified' ? (
                                <span className="text-green-600">✓ Verified</span>
                              ) : (
                                <span className="text-amber-600">⏳ Pending Verification</span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CreditCard className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-600 mb-4">No bank accounts added yet</p>
                  </div>
                )}

                <Link href="/bank-accounts" className="block">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                    {user.bankAccounts.length > 0 ? 'Add Another Account' : 'Add Bank Account'}
                  </Button>
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
