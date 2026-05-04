import { Metadata } from 'next';
import DonateClient from './DonateClient';
import { MOCK_VIDEOS } from '@/lib/mock-data';

export async function generateStaticParams() {
  return MOCK_VIDEOS.map((video) => ({ videoId: video.id }));
}

export const metadata: Metadata = {
  title: 'Donate',
};

export default async function Page({ params }: { params: Promise<{ videoId: string }> }) {
  const { videoId } = await params;
  return <DonateClient videoId={videoId} />;
}
