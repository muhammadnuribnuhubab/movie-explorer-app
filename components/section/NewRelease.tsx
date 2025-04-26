'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MovieCard } from '../card';
import { SectionTitle } from './SectionTitle';
import { Button } from '../ui';
import type { FormattedMovie } from '@/types/movie';

type NewReleasesProps = {
  title: string;
  className?: string;
  movies: FormattedMovie[];
  onLoadMore: () => void;
  isLoading: boolean;
};

export const NewRelease = ({
  title,
  className = '',
  movies,
  onLoadMore,
  isLoading,
}: NewReleasesProps) => {
  const [visibleCount, setVisibleCount] = useState(8);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const isAllVisible = visibleCount >= movies.length;
  const router = useRouter();

  const initialized = useRef(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize(); // set initial width
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Ambil dari sessionStorage saat pertama kali mount
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;

      const savedCount = sessionStorage.getItem('visibleNewRelease');
      const defaultCount = window.innerWidth >= 768 ? 15 : 8;

      setVisibleCount(savedCount ? Number(savedCount) : defaultCount);
    }
  }, []);

  const handleLoadMore = () => {
    const increment = window.innerWidth >= 768 ? 60 : 30;
    const newCount = visibleCount + increment;
    setVisibleCount(newCount);
    sessionStorage.setItem('visibleNewRelease', String(newCount));
    onLoadMore();
  };

  return (
    <section className={`mx-auto mt-12 max-w-[1180px] px-[18px] ${className}`}>
      <SectionTitle title={title} />

      <div className='relative mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
        {movies.slice(0, visibleCount).map((movie) => (
          <div
            key={movie.id}
            className='cursor-pointer'
            onClick={() => router.push(`/detail/${movie.id}`)}
          >
            <MovieCard
              imageUrl={movie.imageUrl}
              title={movie.title}
              rating={movie.rating}
            />
          </div>
        ))}
        {!isAllVisible && (
          <div className='absolute bottom-0 left-0 right-0 h-150 bg-gradient-to-t from-black to-transparent md:h-160' />
        )}
      </div>

      {isLoading && (
        <div className='text-center py-6 text-sm md:text-base text-neutral-25 animate-pulse'>
          <span className='inline-block mr-2 animate-spin'>🎬</span>
          Loading new releases...
        </div>
      )}

      {!isAllVisible && !isLoading && (
        <div className='mt-6 flex justify-center'>
          <Button
            onClick={handleLoadMore}
            variant='secondary'
            size='lg'
            className='hidden md:inline-flex'
          >
            Load More
          </Button>
        </div>
      )}
    </section>
  );
};
