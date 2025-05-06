// components/detail/ClientDetail.tsx
'use client';

import ClientGuard from '@/components/ClientGuard';
import { MovieDetail } from '@/components/section/MovieDetail';
import type { MovieDetailProps } from '@/types/movie';

export default function ClientDetail(props: MovieDetailProps) {
  return (
    <ClientGuard>
      <MovieDetail {...props} />
    </ClientGuard>
  );
}
