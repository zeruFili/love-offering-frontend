'use client';

import { useAuth } from '@/lib/auth-context';
import { useData } from '@/lib/data-context';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowLeft, Check, Inbox, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ContributorRequestsPage() {
  const router = useRouter();
  const { user, isAuthLoaded } = useAuth();
  const { getContributorRequestsForUser, acceptContributorRequest, rejectContributorRequest } = useData();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!isAuthLoaded) return;
    if (!user) router.push('/login');
  }, [isAuthLoaded, router, user]);

  if (!mounted || !user) return null;

  const requests = getContributorRequestsForUser(user.id);
  const pendingRequests = requests.filter((request) => request.status === 'pending');
  const resolvedRequests = requests.filter((request) => request.status !== 'pending');

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-slate-200 bg-white px-4 py-3">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-3 rounded-lg p-2 hover:bg-slate-100"
          aria-label="Back to settings"
        >
          <ArrowLeft className="h-5 w-5 text-slate-600" />
          <Inbox className="h-5 w-5 text-primary" />
          <span className="font-semibold text-slate-900">Contributor Requests</span>
        </button>
      </div>

      <main className="mx-auto max-w-2xl px-4 py-6">
        <div className="mb-6">
          <h1 className="text-xl font-bold text-slate-900">Requests to join videos</h1>
          <p className="mt-1 text-sm text-slate-600">
            Review invitations from video creators before you are linked to their content.
          </p>
        </div>

        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-600">Pending</h2>
          {pendingRequests.length > 0 ? (
            <div className="space-y-3">
              {pendingRequests.map((request) => (
                <div key={request.id} className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex items-start gap-3">
                    <img
                      src={request.contributorProfilePhoto}
                      alt={request.contributorDisplayName}
                      className="h-12 w-12 rounded-full border border-slate-200 object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-slate-900">{request.creatorName} invited you</p>
                      <p className="mt-1 text-sm text-slate-600">{request.videoTitle}</p>
                      <p className="mt-1 text-sm text-primary">Role: {request.role}</p>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button
                      onClick={() => acceptContributorRequest(request.id)}
                      className="flex-1 bg-primary text-white hover:bg-primary/90"
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Accept
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => rejectContributorRequest(request.id)}
                      className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-600">
              No pending contributor requests.
            </div>
          )}
        </section>

        {resolvedRequests.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-600">History</h2>
            <div className="space-y-2">
              {resolvedRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{request.videoTitle}</p>
                    <p className="mt-1 text-xs text-slate-600">{request.creatorName} · {request.role}</p>
                  </div>
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    request.status === 'accepted' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {request.status === 'accepted' ? 'Accepted' : 'Declined'}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}