'use client';

import { useState, useEffect } from 'react';
import { MovieCard } from '../card';
import { SectionTitle } from './SectionTitle';
import { Button } from '../ui';
import type { FormattedMovie } from '@/types/movie';

type NewReleasesProps = {
  title: string;
  className?: string;
  movies: FormattedMovie[];
};

export const NewRelease = ({
  title,
  className = '',
  movies,
}: NewReleasesProps) => {
  const [visibleCount, setVisibleCount] = useState(8);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const isAllVisible = visibleCount >= movies.length;

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (windowWidth >= 768) {
      setVisibleCount(15); // Mulai dengan 15 pada tampilan besar
    } else {
      setVisibleCount(8); // Mulai dengan 8 pada tampilan kecil
    }
  }, [windowWidth]);

  return (
    <section className={`mx-auto mt-12 max-w-[1180px] px-[18px] ${className}`}>
      <SectionTitle title={title} />

      <div className='relative mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
        {movies.slice(0, visibleCount).map((movie) => (
          <MovieCard
            key={movie.id}
            imageUrl={movie.imageUrl}
            title={movie.title}
            rating={movie.rating}
          />
        ))}

        {!isAllVisible && (
          <div className='absolute bottom-0 left-0 right-0 h-150 bg-gradient-to-t from-black to-transparent md:h-160' />
        )}
      </div>

      {!isAllVisible && (
        <div className='mt-6 flex justify-center'>
          {windowWidth < 768 ? (
            <Button
              onClick={() => setVisibleCount((prev) => prev + 15)} // Menambahkan lebih banyak film
              variant='secondary'
              className='!w-[200px] md:hidden'
            >
              Load More
            </Button>
          ) : (
            <Button
              onClick={() => setVisibleCount((prev) => prev + 30)} // Menambahkan lebih banyak film untuk layar besar
              variant='secondary'
              size='lg'
              className='hidden md:inline-flex'
            >
              Load More
            </Button>
          )}
        </div>
      )}
    </section>
  );
};
