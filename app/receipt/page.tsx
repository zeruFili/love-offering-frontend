import ReceiptClient from './[receiptId]/ReceiptClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Receipt',
};

export default function Page({ searchParams }: { searchParams: { receiptId?: string } }) {
  return <ReceiptClient receiptId={searchParams.receiptId ?? ''} />;
}
