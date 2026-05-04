import { Metadata } from 'next';
import DonateClient from './DonateClient';
import { MOCK_VIDEOS } from '@/lib/mock-data';

export async function generateStaticParams() {
  return MOCK_VIDEOS.map((video) => ({ videoId: video.id }));
}

export const metadata: Metadata = {
  title: 'Donate',
};

export default function Page({ params }: { params: { videoId: string } }) {
  return <DonateClient videoId={params.videoId} />;
}
