import { Metadata } from 'next';
import EarningsClient from './EarningsClient';
import { MOCK_VIDEOS } from '@/lib/mock-data';

export async function generateStaticParams() {
  return MOCK_VIDEOS.map((video) => ({ videoId: video.id }));
}

export const metadata: Metadata = {
  title: 'Video Earnings',
};

export default function Page({ params }: { params: { videoId: string } }) {
  return <EarningsClient videoId={params.videoId} />;
}
