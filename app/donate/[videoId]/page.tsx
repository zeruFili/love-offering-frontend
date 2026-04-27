'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useData } from '@/lib/data-context';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Heart } from 'lucide-react';
import Link from 'next/link';

type ReceiptData = {
  referenceId: string;
  merchantId: string;
  paymentDate: string;
  amount: number;
  payerName: string;
  payerEmail: string;
  paymentMethod: string;
  videoTitle: string;
  creatorName: string;
  message: string;
};

export default function DonatePage() {
  const router = useRouter();
  const params = useParams();
  const videoId = params.videoId as string;
  const { user } = useAuth();
  const { getVideoById, addDonation } = useData();

  const video = getVideoById(videoId);
  const [amount, setAmount] = useState('');
  const [comment, setComment] = useState('');
  const [selectedContributors, setSelectedContributors] = useState<Record<string, number>>({});

  if (!video || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-slate-600">Loading...</p>
      </div>
    );
  }

  useEffect(() => {
    const parsedAmount = Number.parseFloat(amount);
    const safeAmount = Number.isFinite(parsedAmount) ? parsedAmount : 0;
    setSelectedContributors({ [video.creatorId]: safeAmount });
  }, [amount, video.creatorId]);

  const handleDonate = () => {
    const parsedAmount = Number.parseFloat(amount);
    if (!Number.isFinite(parsedAmount) || parsedAmount < 100) {
      alert('Minimum gift amount is $100');
      return;
    }

    const now = new Date();
    const receiptReference = `RC-${now.getTime().toString(36).toUpperCase()}`;

    const newDonation = {
      id: `don-${Date.now()}`,
      donorId: user.id,
      donorName: user.name,
      videoId: video.id,
      amount: parseFloat(amount),
      recipients: selectedContributors,
      comment: comment,
      timestamp: new Date().toISOString(),
      status: 'completed' as const,
    };

    addDonation(newDonation);
    const receiptData: ReceiptData = {
      referenceId: receiptReference,
      merchantId: `TX-${now.getTime().toString(36).toUpperCase()}`,
      paymentDate: now.toLocaleDateString('en-GB'),
      amount: parsedAmount,
      payerName: user.name,
      payerEmail: user.email,
      paymentMethod: 'Test',
      videoTitle: video.title,
      creatorName: video.creatorName,
      message: comment.trim() || 'Gift sent for ministry support',
    };

    sessionStorage.setItem(`gift-receipt-${receiptReference}`, JSON.stringify({ ...receiptData, videoId: video.id }));
    router.push(`/receipt/${receiptReference}`);
    setAmount('');
    setComment('');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-slate-100 rounded-lg"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        <h1 className="font-semibold text-slate-900">Send a Gift</h1>
      </div>

      {/* Video Info */}
      <div className="px-4 py-6">
        <div className="bg-white rounded-xl overflow-hidden mb-6">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-1/2 aspect-video object-cover mx-auto"
          />
          <div className="p-4 text-center">
            <h2 className="font-bold text-slate-900 text-lg line-clamp-2">{video.title}</h2>
            <div className="mt-2 flex flex-col items-center">
              <span className="inline-flex w-6 h-6 rounded-full bg-primary/10 items-center justify-center text-xs font-bold text-primary">
                {video.creatorRole.charAt(0).toUpperCase()}
              </span>
              <p className="text-sm text-slate-600 mt-1">{video.creatorName}</p>
            </div>
            <p className="text-xs text-slate-500 mt-3">{video.description}</p>
          </div>
        </div>

        {/* Amount Input */}
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 mb-6">
          <label className="block text-sm font-semibold text-slate-900 mb-4">Select Amount</label>
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[100, 200, 500, 1000].map((preset) => {
              const isSelected = Number.parseFloat(amount || '0') === preset;

              return (
                <button
                  key={preset}
                  onClick={() => setAmount(preset.toString())}
                  className={`h-14 rounded-xl border text-xl font-semibold transition ${
                    isSelected
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'border-slate-300 bg-white text-slate-900 hover:border-primary/60'
                  }`}
                >
                  ${preset}
                </button>
              );
            })}
          </div>

          <label className="block text-sm font-semibold text-slate-900 mb-3">Custom Amount</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-2xl">$</span>
            <Input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="h-14 pl-10 text-lg border-primary/60 bg-white"
              min="100"
              step="0.01"
            />
          </div>
        </div>

        {/* Contributors Selection */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
          <label className="block text-sm font-semibold text-slate-900 mb-3">Support</label>
          <p className="text-xs text-slate-600 mb-3">
            Your gift will go directly to this ministry creator:
          </p>

          <div className="space-y-2">
            {Object.entries(selectedContributors).map(([contributorId, split]) => (
              <div key={contributorId} className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-primary/20">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {contributorId === video.creatorId ? video.creatorName : 'Contributor'}
                  </p>
                  {amount && (
                    <p className="text-xs text-slate-600">
                      ${split.toFixed(2)} ({((split / parseFloat(amount)) * 100).toFixed(0)}%)
                    </p>
                  )}
                </div>
                <span className="text-xs font-medium text-primary">Primary Recipient</span>
              </div>
            ))}
          </div>
        </div>

        {/* Comment Section */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
          <label className="block text-sm font-semibold text-slate-900 mb-3">Message</label>
          <textarea
            placeholder="Share why this ministry means to you..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none"
            rows={4}
          />
          <p className="text-xs text-slate-500 mt-2">
            Your message will be shared with the creators and can receive replies
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-4 py-3">
        <div className="max-w-md mx-auto flex gap-3">
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDonate}
            disabled={!amount}
            className="flex-1 bg-primary hover:bg-primary/90 text-white"
          >
            Send Gift
          </Button>
        </div>
      </div>
    </div>
  );
}
