'use client';

import { useAuth } from '@/lib/auth-context';
import { useData } from '@/lib/data-context';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MessageCircle, Heart, Gift } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getYouTubeEmbedUrl } from '@/lib/utils';

type VideoCommentsClientPageProps = {
  videoId: string;
};

export default function VideoCommentsClientPage({ videoId }: VideoCommentsClientPageProps) {
  const router = useRouter();
  const { user } = useAuth();
  const { videos, comments } = useData();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!mounted || !user) return null;

  const video = videos.find((v) => v.id === videoId);
  if (!video) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-slate-700 font-semibold">Video not found</p>
          <Link href="/" className="text-primary text-sm mt-2 inline-block">Back to videos</Link>
        </div>
      </div>
    );
  }

  const threadComments = comments
    .filter((c) => c.videoId === video.id)
    .sort((left, right) => new Date(right.timestamp).getTime() - new Date(left.timestamp).getTime());
  const embedUrl = getYouTubeEmbedUrl(video.youtubeUrl);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-10 bg-white border-b border-slate-200 px-4 py-3 flex items-center gap-3">
        <button onClick={() => router.push('/')} className="p-2 hover:bg-slate-100 rounded-lg">
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <h1 className="font-semibold text-slate-900">Home</h1>
      </div>

      <main className="px-4 py-6 max-w-3xl mx-auto">
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden mb-6">
          <div className="aspect-video bg-slate-200 overflow-hidden relative">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={video.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
            )}
            <div className="absolute top-3 right-3 bg-primary text-white text-xs font-semibold px-2 py-1 rounded">
              {video.duration}
            </div>
          </div>
          <div className="p-4">
            <h2 className="font-semibold text-slate-900">{video.title}</h2>
            <p className="text-sm text-slate-600 mt-2">{video.creatorName}</p>
          </div>
        </div>

        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="font-semibold text-slate-900 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            Comments ({threadComments.length})
          </h3>
          <Link href={`/donate/${video.id}`} className="inline-flex items-center gap-2">
            <Button
              size="icon"
              className="h-10 w-10 rounded-full bg-amber-500 hover:bg-amber-600 text-amber-950 shadow-sm"
              aria-label={`Gift ${video.title}`}
              title={`Gift ${video.title}`}
            >
              <Gift className="w-4 h-4" />
            </Button>
            <span className="text-sm font-semibold text-amber-700">Gift</span>
          </Link>
        </div>

        <div className="space-y-3">
          {threadComments.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
              <Heart className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-600">No comments for this video yet</p>
            </div>
          ) : (
            threadComments.map((comment) => (
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