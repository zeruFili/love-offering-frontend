import VideoClient from './VideoClient';
import { Metadata } from 'next';
import { MOCK_VIDEOS } from '@/lib/mock-data';

export async function generateStaticParams() {
  return MOCK_VIDEOS.map((video) => ({ videoId: video.id }));
}

export const metadata: Metadata = {
  title: 'Video',
};

export default async function Page({ params }: { params: Promise<{ videoId: string }> }) {
  const { videoId } = await params;
  return <VideoClient videoId={videoId} />;
}