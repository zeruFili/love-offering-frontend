'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VerifyEntryPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/verify/role-selection');
  }, [router]);

  return null;
}
