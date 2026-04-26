'use client';

import { useAuth } from '@/lib/auth-context';
import { useData } from '@/lib/data-context';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Heart, MessageCircle, DollarSign, Users } from 'lucide-react';

export default function CreatorEarningsDetailPage() {
  const router = useRouter();
  const params = useParams();
  const videoId = params.videoId as string;
  const { user } = useAuth();
  const { videos, comments } = useData();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  const normalizeText = (value: string) => value.trim().toLowerCase();

  const matchedVideos = useMemo(() => {
    if (!user) return [];

    const exactMatches = videos.filter(
      (video) => normalizeText(video.creatorName) === normalizeText(user.name)
    );

    return exactMatches.length > 0
      ? exactMatches
      : videos.filter((video) => normalizeText(video.creatorRole) === normalizeText(user.role));
  }, [user, videos]);

  if (!mounted || !user || user.role === 'donor') return null;

  const video = videos.find((entry) => entry.id === videoId && matchedVideos.some((item) => item.id === entry.id));

  if (!video) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <p className="text-slate-700 font-semibold">Video not found</p>
          <Link href="/dashboard" className="text-primary text-sm mt-2 inline-block">
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  const videoComments = comments
    .filter((comment) => comment.videoId === video.id)
    .sort((left, right) => new Date(right.timestamp).getTime() - new Date(left.timestamp).getTime());

  const totalReceived = videoComments.reduce((sum, comment) => sum + comment.amount, 0);
  const supporterCount = new Set(videoComments.map((comment) => comment.authorName)).size;

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3">
        <button onClick={() => router.back()} className="p-2 hover:bg-slate-100 rounded-lg">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <h1 className="font-semibold text-slate-900">Video Earnings</h1>
      </div>

      <main className="px-4 py-6 max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="aspect-video bg-slate-200 relative overflow-hidden">
            <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
            <div className="absolute top-3 right-3 bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
              {video.duration}
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm text-slate-500">{video.creatorName}</p>
            <h2 className="font-semibold text-slate-900 text-lg mt-1">{video.title}</h2>
            <p className="text-sm text-slate-600 mt-2">{video.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-linear-to-br from-primary to-primary/80 rounded-xl p-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-white/80">Total Received</span>
              <DollarSign className="w-4 h-4" />
            </div>
            <p className="text-2xl font-bold">ETB {totalReceived.toLocaleString()}</p>
          </div>
          <div className="bg-linear-to-br from-accent to-accent/80 rounded-xl p-4 text-slate-900">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Supporters</span>
              <Users className="w-4 h-4" />
            </div>
            <p className="text-2xl font-bold">{supporterCount}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-slate-900 font-semibold">
          <MessageCircle className="w-5 h-5 text-primary" />
          Comments ({videoComments.length})
        </div>

        <div className="space-y-3">
          {videoComments.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
              <Heart className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600">No comments or gifts for this video yet</p>
            </div>
          ) : (
            videoComments.map((comment) => (
              <div key={comment.id} className="bg-white border border-slate-200 rounded-xl p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-1">
                      <p className="text-xs font-semibold text-slate-600">{comment.authorName}</p>
                      <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2 py-0.5">
                        ETB {comment.amount.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-slate-800">{comment.text}</p>
                  </div>
                  <p className="text-[11px] text-slate-400 whitespace-nowrap">
                    {new Date(comment.timestamp).toLocaleDateString()}
                  </p>
                </div>

                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-3 space-y-2 pl-3 border-l-2 border-slate-200">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="pl-2">
                        <p className="text-xs text-slate-500 mb-1">{reply.authorName}</p>
                        <p className="text-sm text-slate-700">{reply.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}