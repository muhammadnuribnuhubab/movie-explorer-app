'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  CastAndCrew,
  MovieActions,
  MovieBackground,
  MovieMetaGroup,
  MovieTitle,
  Overview,
  ReleaseDate,
} from '.';

type MovieDetailProps = {
  title: string;
  releaseDate: string;
  overview: string;
  posterUrl: string;
  backdropUrl: string;
  rating?: number;
  genres?: string[];
  age?: number;
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
    <section className='relative min-h-[550px] md:min-h-[700px] overflow-hidden'>
      <MovieBackground
        src={backdropUrl} // ✅ gunakan backdrop dari props
        alt={title}
      />

      <div className='relative z-10 mx-auto flex max-w-[1180px] flex-col justify-start gap-6 px-[18px] pt-10 md:gap-10'>
        <div className='flex items-start gap-4 md:gap-8'>
          <div className='w-full md:w-fit -mt-75 md:-mt-0'>
            <div className='flex-shrink-0 overflow-hidden rounded-md bg-amber-600 md:rounded-xl w-[116px] h-[171px] md:w-[260px] md:h-[384px]'>
              <Image
                src={posterUrl}
                alt={title}
                width={260}
                height={384}
                className='h-full w-full object-cover'
              />
            </div>

            <div className='mt-3 md:hidden'>
              <MovieTitle title={title} />
              <ReleaseDate date={releaseDate} />
            </div>
          </div>

          <div className='flex flex-col justify-center text-left md:w-full md:max-w-[1772px] md:justify-end h-full mt-auto'>
            <div className='flex flex-col justify-end md:gap-6 mt-auto'>
              <div className='hidden flex-col md:flex'>
                <MovieTitle title={title} />
                <ReleaseDate date={releaseDate} />
              </div>

              <div className='hidden gap-4 md:flex'>
                <MovieActions trailerUrl={trailerUrl} />
              </div>

              <div className='hidden md:flex gap-3 md:gap-4'>
                <MovieMetaGroup rating={rating} genres={genres} age={age} />
              </div>
            </div>
          </div>
        </div>

        <div className='flex items-center gap-4 md:hidden'>
          <MovieActions trailerUrl={trailerUrl} />
        </div>

        <div className='flex gap-3 md:hidden'>
          <MovieMetaGroup rating={rating} genres={genres} age={age} />
        </div>
        <Overview description={overview} />
        <CastAndCrew cast={cast} crew={crew} />
      </div>
    </section>
  );
};
