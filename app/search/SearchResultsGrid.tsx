'use client';

import { useRouter } from 'next/navigation';

import type { FormattedMovie } from '@/types/movie';
import { SectionTitle } from '@/components/section';
import { MovieCard } from '@/components/card';

type SearchResultsGridProps = {
  title: string;
  className?: string;
  movies: FormattedMovie[];
};

export const SearchResultsGrid = ({
  title,
  className = '',
  movies,
}: SearchResultsGridProps) => {
  const router = useRouter();

  if (movies.length === 0) {
    return (
      <section
        className={`max-w-[1180px] ${className}`}
      >
        <SectionTitle title={title} />
        <div className='text-center text-white'>
          <p>No movies found. Try using different keywords.</p>
        </div>
      </section>
    );
  }

  return (
    <section className={`pt-[70px] md:pt-[110px] mx-auto max-w-[1180px] px-[18px] ${className}`}>
      <SectionTitle title={title} />

      <div className='mt-6 md:mt-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
        {movies.map((movie) => (
          <div
            key={movie.id}
            className='cursor-pointer'
            onClick={() => router.push(`/detail/${movie.id}`)}
          >
            <MovieCard
              imageUrl={movie.imageUrl}
              title={movie.title}
              rating={movie.rating}
              trendingIndex={movie.trendingIndex}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
