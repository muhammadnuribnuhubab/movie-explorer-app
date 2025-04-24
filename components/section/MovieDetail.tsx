// components/section/MovieDetail.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  CastAndCrew,
  MovieBackground,
  MovieMetaGroup,
  MovieTitle,
  Overview,
  ReleaseDate,
} from '.';
import { MovieActions } from './MovieActions';

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
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;

  return (
    <section
      key={id}
      className='relative min-h-[550px] md:min-h-[700px] overflow-hidden'
    >
      <MovieBackground src={backdropUrl} alt={title} />

      <div className='relative z-10 mx-auto flex max-w-[1180px] flex-col gap-6 px-[18px] pt-10 md:gap-10'>
        {/* Poster, Title, ReleaseDate */}
        <div className='flex items-start gap-4 md:gap-8'>
          <div className='w-full md:w-fit'>
            <Image
              src={posterUrl}
              alt={title}
              width={260}
              height={384}
              className='rounded-md'
              style={{ height: 'auto', width: 'auto' }} // Tambahkan ini kalau kamu ubah width
            />
            <div className='mt-3 md:hidden'>
              <MovieTitle title={title} />
              <ReleaseDate date={releaseDate} />
            </div>
          </div>

          <div className='flex flex-col justify-end gap-4 md:gap-8 md:w-full mt-auto'>
            <div className='hidden md:flex flex-col gap-4'>
              <MovieTitle title={title} />
              <ReleaseDate date={releaseDate} />
            </div>

            <div className='hidden md:flex gap-4'>
              <MovieActions
                trailerUrl={trailerUrl}
                movieId={id}
                movieTitle={title}
                movieRating={rating}
                movieDescription={overview}
                posterUrl={posterUrl}
              />
            </div>

            <div className='hidden md:flex gap-4'>
              <MovieMetaGroup rating={rating} genres={genres} age={age} />
            </div>
          </div>
        </div>

        {/* Mobile MovieActions */}
        <div className='flex flex-col gap-4 md:hidden'>
          <MovieActions
            trailerUrl={trailerUrl}
            movieId={id}
            movieTitle={title}
            movieRating={rating}
            movieDescription={overview}
            posterUrl={posterUrl}
          />
          <MovieMetaGroup rating={rating} genres={genres} age={age} />
        </div>

        <Overview description={overview} />
        <CastAndCrew cast={cast} crew={crew} />
      </div>
    </section>
  );
};
