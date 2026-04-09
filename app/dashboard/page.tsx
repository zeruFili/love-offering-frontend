'use client';

import { useAuth } from '@/lib/auth-context';
import { useData } from '@/lib/data-context';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { ArrowLeft, DollarSign, Users, Heart, Upload, CreditCard, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { getDonationsByDonor, getDonationsByCreator, getVideosByCreator } = useData();
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'donations' | 'earnings' | 'videos' | 'settings'>('donations');
  const isDonor = user?.role === 'donor';
  const isCreator = user ? ['church', 'ministry', 'preacher', 'singer', 'worship_group'].includes(user.role) : false;
  const primaryTab: 'donations' | 'earnings' = isDonor ? 'donations' : 'earnings';

  useEffect(() => {
    setMounted(true);
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  useEffect(() => {
    setActiveTab(primaryTab);
  }, [primaryTab]);

  if (!mounted || !user) return null;

  const donations = isDonor ? getDonationsByDonor(user.id) : getDonationsByCreator(user.id);
  const myVideos = isCreator ? getVideosByCreator(user.id) : [];
  const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);

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
                  isCreator ? { id: 'videos', label: 'My Videos' } : null,
                  isCreator ? { id: 'settings', label: 'Bank Accounts' } : null,
                ].filter(Boolean).map((tab) => (
                  <button
                    key={tab!.id}
                    onClick={() => setActiveTab(tab!.id as 'donations' | 'earnings' | 'videos' | 'settings')}
                    className={`flex-1 md:flex-none text-left px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                      activeTab === tab!.id
                        ? 'bg-primary/10 text-primary'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {tab!.label}
                  </button>
                ))}
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
                      <span className="text-sm font-medium text-white/80">Total Earned</span>
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <p className="text-2xl font-bold">${user.totalEarnings.toFixed(2)}</p>
                    <p className="text-xs text-white/70 mt-1">{donations.length} donations</p>
                  </div>
                  <div className="bg-linear-to-br from-accent to-accent/80 rounded-xl p-4 text-slate-900">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-slate-700">Supporters</span>
                      <Users className="w-4 h-4" />
                    </div>
                    <p className="text-2xl font-bold">{user.supporterCount}</p>
                    <p className="text-xs text-slate-600 mt-1">donors</p>
                  </div>
                </>
              )}
                </div>

                {/* Quick Actions */}
                <div className="space-y-2 mb-6">
                  {isCreator && user.verificationStatus === 'approved' && (
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

                  {isCreator && user.verificationStatus !== 'approved' && (
                    <Link href="/verify" className="block">
                      <button className="w-full flex items-center gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-left">
                        <FileText className="w-5 h-5 text-amber-600" />
                        <div>
                          <p className="font-semibold text-amber-900">Get Verified</p>
                          <p className="text-xs text-amber-700">Submit documents to start earning</p>
                        </div>
                      </button>
                    </Link>
                  )}

                  {isCreator && (
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

                {donations.length > 0 ? (
                  <div className="space-y-3">
                    {donations.map((donation) => (
                      <div key={donation.id} className="bg-white rounded-xl border border-slate-200 p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold text-slate-900">{isDonor ? 'Gift to' : 'From'} {isDonor ? donation.videoId : donation.donorName}</p>
                            <p className="text-xs text-slate-500 mt-1">
                              {new Date(donation.timestamp).toLocaleDateString()}
                            </p>
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

            {/* My Videos Tab */}
            {activeTab === 'videos' && isCreator && (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-900">My Videos</h2>
                  <Link href="/upload">
                    <Button className="bg-primary hover:bg-primary/90 text-white">Upload Video</Button>
                  </Link>
                </div>

                {myVideos.length > 0 ? (
                  <div className="space-y-3">
                    {myVideos.map((video) => (
                      <div key={video.id} className="bg-white rounded-xl border border-slate-200 p-4">
                        <div className="flex gap-3">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-20 h-14 rounded-md object-cover shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-slate-900 line-clamp-1">{video.title}</p>
                            <p className="text-xs text-slate-500 mt-1">Duration: {video.duration}</p>
                            <p className="text-xs text-slate-500 mt-1">Status: {video.status}</p>
                            <div className="mt-2">
                              <Link href={`/contributors?videoId=${video.id}`} className="text-xs font-medium text-primary hover:underline">
                                Manage Contributors
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-slate-600 mb-4">You have not uploaded videos yet</p>
                    <Link href="/upload">
                      <Button className="bg-primary hover:bg-primary/90 text-white">Upload Your First Video</Button>
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Bank Accounts Tab */}
            {activeTab === 'settings' && isCreator && (
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
