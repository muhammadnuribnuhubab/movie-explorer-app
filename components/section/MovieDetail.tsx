'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  CastAndCrew,
  MovieActions,
  MovieBackground,
  MovieMetaGroup,
  MovieTitle,
  Overview,
  ReleaseDate,
} from '.';

export const MovieDetail = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <section className='relative min-h-[550px] md:min-h-[700px] overflow-hidden'>
      <MovieBackground />

      <div className='relative z-10 mx-auto flex max-w-[1180px] flex-col justify-start gap-6 px-[18px] pt-10 md:gap-10 md:pt-24'>
        <div className='flex items-start gap-4 md:gap-8'>
          <div className='w-full md:w-fit'>
            <div className='flex-shrink-0 overflow-hidden rounded-md bg-amber-600 md:rounded-xl w-[116px] h-[171px] md:w-[260px] md:h-[384px]'>
              <Image
                src='/poster.jpg'
                alt='Captain America: Brave New World'
                width={260}
                height={384}
                className='h-full w-full object-cover'
              />
            </div>

            <div className='mt-3 md:hidden'>
              <MovieTitle />
              <ReleaseDate />
            </div>
          </div>

          <div className='flex h-full flex-col justify-center text-left md:w-full md:max-w-[1772px] md:justify-end'>
            <div className='flex flex-col md:gap-6'>
              <div className='hidden flex-col md:flex'>
                <MovieTitle />
                <ReleaseDate />
              </div>

              <div className='hidden gap-4 md:flex'>
                <MovieActions hasTrailer />
              </div>

              <div className='hidden gap-3 md:flex md:gap-4'>
                <MovieMetaGroup />
              </div>
            </div>
          </div>
        </div>

        <div className='flex items-center gap-4 md:hidden'>
          <MovieActions hasTrailer />
        </div>

        <div className='flex gap-3 md:hidden'>
          <MovieMetaGroup />
        </div>

        <Overview description='After meeting with newly elected U.S. President Thaddeus Ross, Sam finds himself in the middle of an international incident. He must discover the reason behind a nefarious global plot before the true mastermind has the entire world seeing red.' />

        <CastAndCrew />
      </div>
    </section>
  );
};
