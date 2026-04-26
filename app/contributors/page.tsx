import { Suspense } from 'react';
import ContributorsClient from './contributors-client';

export default function ContributorsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ContributorsClient />
    </Suspense>
  );
}
