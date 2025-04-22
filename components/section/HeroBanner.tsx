'use client';

import { useEffect, useState } from 'react';
import { Button, PlayIcon } from '../ui';
import { MovieBackground } from './MovieBackground';
import { fetchTrendingMovies } from '@/lib/api/tmdb'; // Pastikan ini sesuai dengan struktur foldermu
import Link from 'next/link';
import { Movie } from '@/types/movie';

export const HeroBanner = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [topMovie, setTopMovie] = useState<Movie | null>(null);

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

  useEffect(() => {
    const getTrendingMovies = async () => {
      const data = await fetchTrendingMovies();
      setTopMovie(data[0]); // Ambil film nomor 1 untuk latar belakang
    };

    getTrendingMovies();
  }, []);

  if (!topMovie) return <div>Loading...</div>; // Tampilkan loading sementara jika data belum ada

  return (
    <section className='relative min-h-[550px] md:min-h-[700px] overflow-hidden'>
      <MovieBackground
        src={`https://image.tmdb.org/t/p/original${topMovie.backdrop_path}`} // Gunakan backdrop_path untuk latar belakang
        alt={topMovie.title}
      />

      <div className='absolute inset-0 z-10 mx-auto flex max-w-[1180px] flex-col justify-end gap-6 px-[18px] pb-24 md:gap-10 md:pb-40'>
        <div className='flex flex-col gap-1.5 md:gap-8 md:max-w-[635px]'>
          <h1 className='text-2xl md:text-5xl font-bold text-neutral-25'>
            {topMovie.title} {/* Tampilkan judul film di banner */}
          </h1>
          <p className='text-base md:text-xl font-normal text-neutral-400'>
            {topMovie.overview} {/* Tampilkan deskripsi singkat film */}
          </p>
        </div>

        <div className='flex flex-col md:flex-row gap-4'>
          {isMobile ? (
            <>
              <Button className='w-full' size='sm'>
                Watch Trailer <PlayIcon size={18} />
              </Button>
              <Link href={`/detail/${topMovie.id}`} className='w-full'>
                <Button variant='secondary' className='w-full' size='sm'>
                  See Detail
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Button className='w-full md:w-[230px]' size='lg'>
                Watch Trailer <PlayIcon size={24} />
              </Button>
              <Link href={`/detail/${topMovie.id}`}>
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
