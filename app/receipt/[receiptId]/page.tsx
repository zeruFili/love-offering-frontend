'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Download, Printer, X } from 'lucide-react';

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
  videoId: string;
};

export default function ReceiptPage() {
  const router = useRouter();
  const params = useParams();
  const receiptId = params.receiptId as string;
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);

  useEffect(() => {
    const storedReceipt = sessionStorage.getItem(`gift-receipt-${receiptId}`);
    if (storedReceipt) {
      setReceipt(JSON.parse(storedReceipt));
    }
  }, [receiptId]);

  if (!receipt) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-slate-700 font-semibold">Receipt not found</p>
          <button onClick={() => router.push('/')} className="mt-2 text-sm font-medium text-primary">
            Back to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-6 text-slate-900">
      <div className="mx-auto flex max-w-115 justify-end pb-3">
        <button
          onClick={() => router.push(`/video/${receipt.videoId}`)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
          aria-label="Close receipt"
          title="Close"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mx-auto w-full max-w-115 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/15">
        <div className="bg-[#0b1d3a] px-5 py-4 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-lime-400/90" />
              <span className="text-lg font-bold tracking-tight text-[#8df300]">Chapa</span>
            </div>
            <span className="text-sm font-bold tracking-widest text-[#8df300]">RECEIPT</span>
          </div>
        </div>

        <div className="border-b border-slate-200 bg-white px-5 py-3">
          <div className="inline-flex rounded border border-slate-200 bg-white px-3 py-1 text-sm font-semibold text-slate-800">
            {receipt.referenceId}
          </div>
        </div>

        <div className="space-y-0 bg-white">
          {[
            ['Payer Name', receipt.payerName],
            ['Email Address', receipt.payerEmail],
            ['Payment Method', receipt.paymentMethod],
            ['Status', 'Paid'],
            ['Payment Date', receipt.paymentDate],
            ['Payment Reason', receipt.message],
          ].map(([label, value], index) => (
            <div key={label} className={`grid grid-cols-[1.15fr_1fr] gap-3 px-5 py-4 text-sm ${index % 2 === 0 ? 'bg-white' : 'bg-slate-100'}`}>
              <p className="text-slate-600">{label}</p>
              <p className="font-semibold text-slate-900 text-right">{value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 px-5 py-5">
          <div>
            <p className="text-sm font-semibold text-[#8db400]">Receipt From</p>
            <p className="mt-1 text-sm text-slate-700">{receipt.creatorName}</p>
            <p className="mt-3 text-sm font-semibold text-[#8db400]">References</p>
            <p className="mt-1 text-xs text-slate-700">Chapa: {receipt.referenceId.replace('RC-', '')}</p>
            <p className="text-xs text-slate-700">Merchant: {receipt.merchantId}</p>
          </div>

          <div className="space-y-3 text-center">
            <div className="rounded border border-slate-200 px-3 py-3">
              <p className="text-sm text-slate-600">Sub Total</p>
              <p className="text-lg font-semibold text-slate-900">{receipt.amount.toFixed(2)} ETB</p>
            </div>
            <div className="rounded border border-slate-200 px-3 py-3">
              <p className="text-sm text-slate-600">Charge</p>
              <p className="text-lg font-semibold text-slate-900">0 ETB</p>
            </div>
            <div className="rounded border border-slate-200 px-3 py-3">
              <p className="text-sm text-slate-600">Total</p>
              <p className="text-lg font-bold text-slate-900">{receipt.amount.toFixed(2)} ETB</p>
            </div>
          </div>
        </div>

        <div className="px-5 pb-5">
          <div className="mb-3 rounded bg-amber-400 px-3 py-2 text-xs font-medium text-slate-900">
            Test Mode: Not a real payment.
          </div>

          <div className="flex items-center justify-between gap-3 rounded-b-xl bg-[#0b1d3a] px-4 py-3 text-white">
            <div className="flex items-center gap-2 text-xs text-lime-300">
              <span>+251-960724272</span>
              <span>info@chapa.co</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded p-1.5 hover:bg-white/10" aria-label="Download receipt" title="Download receipt">
                <Download className="w-4 h-4" />
              </button>
              <button className="rounded p-1.5 hover:bg-white/10" aria-label="Print receipt" title="Print receipt">
                <Printer className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-4 flex max-w-115 items-center justify-center">
        <button
          onClick={() => router.push(`/video/${receipt.videoId}`)}
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-slate-100"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to video
        </button>
      </div>
    </div>
  );
}