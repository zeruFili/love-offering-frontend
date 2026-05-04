import VideoClient from './VideoClient';
import { Metadata } from 'next';
import { MOCK_VIDEOS } from '@/lib/mock-data';

export async function generateStaticParams() {
  return MOCK_VIDEOS.map((video) => ({ videoId: video.id }));
}

export const metadata: Metadata = {
  title: 'Video',
};

export default function Page({ params }: { params: { videoId: string } }) {
  return <VideoClient videoId={params.videoId} />;
}