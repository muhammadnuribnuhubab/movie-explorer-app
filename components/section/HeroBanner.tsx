'use client';

import { useEffect, useState } from 'react';
import { Button, PlayIcon } from '../ui';
import { HeroBackground } from './HeroBackground';

export const HeroBanner = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <section className='relative min-h-[550px] overflow-hidden md:min-h-[700px]'>
      <HeroBackground />

      <div className='absolute inset-0 z-10 mx-auto flex max-w-[1180px] flex-col justify-end gap-6 px-[18px] pb-24 md:gap-10 md:pb-40'>
        <div className='flex flex-col gap-1.5 md:max-w-[635px] md:gap-8'>
          <h1 className='text-2xl font-bold text-neutral-25 md:text-5xl'>
            The Gorge
          </h1>
          <p className='text-base font-normal text-neutral-400 md:text-xl'>
            Two highly trained operatives grow close from a distance after being
            sent to guard opposite sides of a mysterious gorge. When an evil
            below emerges, they must work together to survive what lies within.
          </p>
        </div>

        <div className='flex flex-col gap-4 md:flex-row'>
          {isMobile && (
            <>
              <Button className='w-full' size='sm'>
                Watch Trailer <PlayIcon size={18} />
              </Button>
              <Button variant='secondary' className='w-full' size='sm'>
                See Detail
              </Button>
            </>
          )}

          {!isMobile && (
            <>
              <Button className='w-full md:w-[230px]' size='lg'>
                Watch Trailer <PlayIcon size={24} />
              </Button>
              <Button
                variant='secondary'
                className='w-full md:w-[230px]'
                size='lg'
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
