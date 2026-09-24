'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-context';
import { useData } from '@/lib/data-context';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowLeft } from 'lucide-react';

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

export default function DonateClient({ videoId }: { videoId: string }) {
  const router = useRouter();
  const { user } = useAuth();
  const { getVideoById, addDonation } = useData();

  const video = getVideoById(videoId);
  const isHallelujah = videoId === '686d5ba778f844ec9012011e';
  const hallelujahContributors = [
    { id: '686d5b5678f844ec90120115', name: 'Aster Abebe', role: 'Lead Singer', primary: true },
    { id: '7', name: 'Ephrem Alemu', role: 'Lead Vocalist', primary: false },
    { id: '13', name: 'Samuel Negussie', role: 'Bass Guitar', primary: false },
  ];
  const [amount, setAmount] = useState('');
  const [comment, setComment] = useState('');
  const [contributorPercentages, setContributorPercentages] = useState<Record<string, number>>({
    '686d5b5678f844ec90120115': 100,
    '7': 0,
    '13': 0,
  });

  useEffect(() => {
    if (video && !isHallelujah) {
      setContributorPercentages({ [video.creatorId]: 100 });
    }
  }, [isHallelujah, video]);

  if (!video || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-slate-600">Loading...</p>
      </div>
    );
  }

  const handleDonate = () => {
    const parsedAmount = Number.parseFloat(amount);
    if (!Number.isFinite(parsedAmount) || parsedAmount < 100) {
      alert('Minimum gift amount is $100');
      return;
    }

    const selectedContributors = isHallelujah
      ? Object.fromEntries(
          hallelujahContributors.map((contributor) => [
            contributor.id,
            parsedAmount * ((contributorPercentages[contributor.id] ?? 0) / 100),
          ])
        )
      : { [video.creatorId]: parsedAmount };

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
    router.push(`/receipt?receiptId=${receiptReference}`);
    setAmount('');
    setComment('');
  };

  const totalPercentage = isHallelujah
    ? hallelujahContributors.reduce(
        (total, contributor) => total + (contributorPercentages[contributor.id] ?? 0),
        0
      )
    : 100;
  const remainingPercentage = Math.max(0, 100 - totalPercentage);
  const parsedAmount = Number.parseFloat(amount);

  const updateContributorPercentage = (contributorId: string, nextValue: number) => {
    const otherPercentage = totalPercentage - (contributorPercentages[contributorId] ?? 0);
    const cappedValue = Math.min(nextValue, Math.max(0, 100 - otherPercentage));
    setContributorPercentages((previous) => ({ ...previous, [contributorId]: cappedValue }));
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-10 bg-white px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-3 p-2 hover:bg-slate-100 rounded-lg"
          aria-label="Back to previous"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
          <span className="font-semibold text-slate-900">Send a Gift</span>
        </button>
      </div>

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

        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
          <label className="block text-sm font-semibold text-slate-900 mb-3">Support</label>
          {isHallelujah ? (
            <>
              <div className="mb-5 rounded-lg border border-primary/30 bg-primary/5 p-4 text-center">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">Total Percentage</p>
                <p className="mt-1 text-3xl font-bold text-primary">{totalPercentage}%</p>
                <p className="mt-1 text-xs text-slate-600">{remainingPercentage}% remaining to allocate</p>
              </div>
              <div className="space-y-5">
                {hallelujahContributors.map((contributor) => {
                  const percentage = contributorPercentages[contributor.id] ?? 0;
                  const giftShare = Number.isFinite(parsedAmount) ? parsedAmount * (percentage / 100) : 0;

                  return (
                    <div key={contributor.id} className={`rounded-lg border p-3 ${
                      contributor.primary ? 'border-primary bg-primary/5' : 'border-slate-200 bg-white'
                    }`}>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className={`text-sm font-semibold ${contributor.primary ? 'text-primary' : 'text-slate-900'}`}>
                            {contributor.name}
                          </p>
                          <p className="text-xs text-slate-600">Role: {contributor.role}</p>
                        </div>
                        <span className="text-sm font-bold text-slate-900">{percentage}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={percentage}
                        onChange={(event) => updateContributorPercentage(contributor.id, Number(event.target.value))}
                        className="mt-3 w-full accent-primary"
                        aria-label={`${contributor.name} allocation percentage`}
                      />
                      <div className="mt-1 flex justify-between text-xs text-slate-500">
                        <span>0%</span>
                        <span>{Number.isFinite(parsedAmount) ? `$${giftShare.toFixed(2)}` : '$0.00'}</span>
                        <span>100%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between rounded-lg border border-primary/20 bg-primary/5 p-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">{video.creatorName}</p>
                {amount && <p className="text-xs text-slate-600">${Number.parseFloat(amount).toFixed(2)} (100%)</p>}
              </div>
              <span className="text-xs font-medium text-primary">Primary Recipient</span>
            </div>
          )}
        </div>

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
