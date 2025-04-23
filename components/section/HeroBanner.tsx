'use client';

import { useEffect, useState } from 'react';
import { Button, PlayIcon } from '../ui';
import { MovieBackground } from './MovieBackground';
import Link from 'next/link';
import type { Movie } from '@/types/movie';

type HeroBannerProps = {
  movie: Movie;
  trailerUrl: string | null;
};

export const HeroBanner = ({ movie, trailerUrl }: HeroBannerProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);

  return (
    <section className='relative min-h-[550px] md:min-h-[700px] overflow-hidden'>
      <MovieBackground
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
      />

      <div className='absolute inset-0 z-10 mx-auto flex max-w-[1180px] flex-col justify-end gap-6 px-[18px] pb-24 md:gap-10 md:pb-40'>
        <div className='flex flex-col gap-1.5 md:gap-8 md:max-w-[635px]'>
          <h1 className='text-2xl md:text-5xl font-bold text-neutral-25'>
            {movie.title}
          </h1>
          <p className='text-base md:text-xl font-normal text-neutral-400'>
            {movie.overview}
          </p>
        </div>

        <div className='flex flex-col md:flex-row gap-4'>
          {isMobile ? (
            <>
              {trailerUrl && (
                <Link href={trailerUrl} target='_blank' className='w-full'>
                  <Button className='w-full' size='sm'>
                    Watch Trailer <PlayIcon size={18} />
                  </Button>
                </Link>
              )}
              <Link href={`/detail/${movie.id}`} className='w-full'>
                <Button variant='secondary' className='w-full' size='sm'>
                  See Detail
                </Button>
              </Link>
            </>
          ) : (
            <>
              {trailerUrl && (
                <Link href={trailerUrl} target='_blank'>
                  <Button className='w-full md:w-[230px]' size='lg'>
                    Watch Trailer <PlayIcon size={24} />
                  </Button>
                </Link>
              )}
              <Link href={`/detail/${movie.id}`}>
                <Button
                  variant='secondary'
                  className='w-full md:w-[230px]'
                  size='lg'
                >
                  See Detail
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
