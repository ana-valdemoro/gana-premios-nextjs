'use client';
import { useSession } from 'next-auth/react';

function DashboardPage() {
  const { data: session, status } = useSession();

  console.log('DATA SESSION', session);
  console.log('DATA STATUS', status);

  return <div>DashboardPage</div>;
}

export default DashboardPage;
