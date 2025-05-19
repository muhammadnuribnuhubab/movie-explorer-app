'use client';

import React, { useState, useEffect } from 'react';
import { MovieBackground } from './MovieBackground';
import { Button } from '../ui/Button';
import { PlayIcon } from '../ui/Icons';
import { useRouter } from 'next/navigation';

import type { Movie } from '@/types/movie';

type HeroBannerProps = {
  movie: Movie;
  trailerUrl: string | null;
};

export const HeroBanner = ({ movie, trailerUrl }: HeroBannerProps) => {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  // Handle navigation to detail page with internal flag
  const handleSeeDetail = () => {
    sessionStorage.setItem('fromInternalNavigation', 'true');
    router.push(`/detail/${movie.id}`);
  };

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <section className='relative min-h-[550px] md:min-h-[700px] overflow-hidden'>
      <MovieBackground
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
      />

      <div className='absolute inset-0 z-10 mx-auto flex max-w-[1180px] flex-col justify-end gap-6 px-[18px] pb-10 md:gap-10 md:pb-40'>
        <div className='flex flex-col gap-1.5 md:gap-8 '>
          <h1 className='text-2xl md:text-5xl font-bold text-neutral-25'>
            {movie.title}
          </h1>
          <p className='hidden lg:block text-base md:text-xl font-normal text-neutral-400'>
            {movie.overview}
          </p>
        </div>

        <div className='flex flex-col md:flex-row gap-4'>
          {isMobile ? (
            <>
              {trailerUrl && (
                <a
                  href={trailerUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='w-full'
                >
                  <Button className='w-full' size='sm'>
                    Watch Trailer <PlayIcon size={18} />
                  </Button>
                </a>
              )}
              <Button
                variant='secondary'
                className='w-full'
                size='sm'
                onClick={handleSeeDetail}
              >
                See Detail
              </Button>
            </>
          ) : (
            <>
              {trailerUrl && (
                <a href={trailerUrl} target='_blank' rel='noopener noreferrer'>
                  <Button className='w-full md:w-[230px]' size='lg'>
                    Watch Trailer <PlayIcon size={24} />
                  </Button>
                </a>
              )}
              <Button
                variant='secondary'
                className='w-full md:w-[230px]'
                size='lg'
                onClick={handleSeeDetail}
              >
                See Detail
              </Button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
