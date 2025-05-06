'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface ClientGuardProps {
  children: React.ReactNode;
}

export default function SearchPageGuard({ children }: ClientGuardProps) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const fromInternal = sessionStorage.getItem('fromInternalNavigation');
    if (fromInternal === 'true') {
      setAllowed(true);
      sessionStorage.removeItem('fromInternalNavigation');
    }
    setChecked(true);
  }, []);

  useEffect(() => {
    if (checked && !allowed) {
      const timeout = setTimeout(() => {
        router.replace('/'); // Redirect ke homepage jika tidak ada akses yang sah
      }, 3000); // Redirect setelah 3 detik
      return () => clearTimeout(timeout);
    }
  }, [checked, allowed, router]);

  if (!checked) return null;

  if (!allowed) {
    return (
      <div className='flex h-screen items-center justify-center text-center gap-2'>
        <div>
          <h1 className='text-5xl font-bold text-primary-300'>Access Denied</h1>
          <p className='text-3xl text-neutral-25'>Redirecting to homepag.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
