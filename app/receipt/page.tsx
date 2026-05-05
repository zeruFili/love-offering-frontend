import ReceiptClient from './[receiptId]/ReceiptClient';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Receipt',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-40 flex items-center justify-center">Loading...</div>}>
      <ReceiptClient />
    </Suspense>
  );
}
