'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { MovieActions } from './MovieActions';
import { motion } from 'framer-motion';
import { CastAndCrew } from './CastAndCrew';
import { MovieBackground } from './MovieBackground';
import { MovieMetaGroup } from './MovieMetaGroup';
import { MovieTitle } from './MovieTitle';
import { Overview } from './Overview';
import { ReleaseDate } from './ReleaseDate';

type MovieDetailProps = {
  id: string;
  title: string;
  releaseDate: string;
  overview: string;
  posterUrl: string;
  backdropUrl: string;
  rating: number;
  genres: string[];
  age: number;
  trailerUrl?: string;
  cast: {
    id: number;
    name: string;
    character: string;
    profile_path?: string;
  }[];
  crew: { id: number; name: string; job: string; profile_path?: string }[];
};

export const MovieDetail = ({
  id,
  title,
  releaseDate,
  overview,
  posterUrl,
  backdropUrl,
  rating,
  genres,
  age,
  trailerUrl,
  cast,
  crew,
}: MovieDetailProps) => {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <section
      key={id}
      className='relative min-h-[550px] md:min-h-[700px] overflow-hidden'
    >
      <MovieBackground
        src={backdropUrl}
        alt={title}
        onLoadingComplete={() => setIsLoading(false)}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className='relative z-10 mx-auto flex max-w-[1180px] flex-col gap-6 px-[18px] pt-10 md:gap-10'
      >
        <div className='flex items-start gap-4 md:gap-8'>
          <div className='w-full md:w-fit'>
            {isLoading ? (
              <div className='w-[260px] h-[384px] bg-muted rounded-md animate-pulse' />
            ) : (
              <Image
                src={posterUrl}
                alt={title}
                width={260}
                height={384}
                className='rounded-md'
                style={{ height: 'auto', width: 'auto' }}
                unoptimized
              />
            )}
            <div className='mt-3 md:hidden'>
              {isLoading ? (
                <div className='space-y-2'>
                  <div className='h-6 w-3/4 bg-muted rounded animate-pulse' />
                  <div className='h-4 w-1/2 bg-muted rounded animate-pulse' />
                </div>
              ) : (
                <>
                  <MovieTitle title={title} />
                  <ReleaseDate date={releaseDate} />
                </>
              )}
            </div>
          </div>

          <div className='flex flex-col justify-end gap-4 md:gap-8 md:w-full mt-auto'>
            <div className='hidden md:flex flex-col'>
              {isLoading ? (
                <div className='space-y-3'>
                  <div className='h-8 w-2/3 bg-muted rounded animate-pulse' />
                  <div className='h-5 w-1/3 bg-muted rounded animate-pulse' />
                </div>
              ) : (
                <>
                  <MovieTitle title={title} />
                  <ReleaseDate date={releaseDate} />
                </>
              )}
            </div>

            <div className='hidden md:flex gap-4'>
              {isLoading ? (
                <div className='h-10 w-full bg-muted rounded animate-pulse' />
              ) : (
                <MovieActions
                  trailerUrl={trailerUrl}
                  movieId={id}
                  movieTitle={title}
                  movieRating={rating}
                  movieDescription={overview}
                  posterUrl={posterUrl}
                />
              )}
            </div>

            <div className='hidden md:flex gap-4'>
              {isLoading ? (
                <div className='h-6 w-2/3 bg-muted rounded animate-pulse' />
              ) : (
                <MovieMetaGroup rating={rating} genres={genres} age={age} />
              )}
            </div>
          </div>
        </div>

        {/* Mobile MovieActions */}
        <div className='flex flex-col gap-4 md:hidden'>
          {isLoading ? (
            <>
              <div className='h-10 w-full bg-muted rounded animate-pulse' />
              <div className='h-6 w-2/3 bg-muted rounded animate-pulse' />
            </>
          ) : (
            <>
              <MovieActions
                trailerUrl={trailerUrl}
                movieId={id}
                movieTitle={title}
                movieRating={rating}
                movieDescription={overview}
                posterUrl={posterUrl}
              />
              <MovieMetaGroup rating={rating} genres={genres} age={age} />
            </>
          )}
        </div>

        <div>
          {isLoading ? (
            <div className='h-28 bg-muted rounded animate-pulse' />
          ) : (
            <Overview description={overview} />
          )}
        </div>

        <div>
          {isLoading ? (
            <div className='h-36 bg-muted rounded animate-pulse' />
          ) : (
            <CastAndCrew cast={cast} crew={crew} />
          )}
        </div>
      </motion.div>
    </section>
  );
};
