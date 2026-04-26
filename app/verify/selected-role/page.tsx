import { Suspense } from 'react';
import SelectedRoleClient from './selected-role-client';

export default function SelectedRolePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <SelectedRoleClient />
    </Suspense>
  );
}
