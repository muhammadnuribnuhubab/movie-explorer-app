'use client';

import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import type { Swiper as SwiperType } from 'swiper';
import { SectionTitle } from './SectionTitle';
import { ChevronLeftIcon, ChevronRightIcon } from '../ui';
import { MovieCard } from '../card';
import Link from 'next/link'; // Import Link

type TrendingNowProps = {
  title: string;
  className?: string;
  movies: {
    id: string;
    title: string;
    imageUrl: string;
    rating: number;
    trendingIndex?: number;
  }[];
};

export const TrendingNow = ({
  title,
  movies,
  className = '',
}: TrendingNowProps) => {
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    if (swiperRef.current && swiperRef.current.navigation) {
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  useEffect(() => {
    console.log('Trending movies:', movies);
  }, [movies]);

  return (
    <section
      className={`relative max-w-[1180px] mx-auto px-[18px] ${className}`}
    >
      <SectionTitle title={title} />

      {/* Tombol panah kiri */}
      <button
        className={`flex items-center justify-center absolute top-[45%] left-0 z-10 w-11 h-11 md:w-14 md:h-14 rounded-full bg-neutral-800/70 text-white hover:bg-neutral-700 transition-opacity ${
          isBeginning ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        id='swiper-prev'
      >
        <ChevronLeftIcon size={18} className='md:size-5' />
      </button>

      {/* Tombol panah kanan */}
      <button
        className={`flex items-center justify-center absolute top-[45%] right-0 z-10 w-11 h-11 md:w-14 md:h-14 rounded-full bg-neutral-800/70 text-white hover:bg-neutral-700 transition-opacity ${
          isEnd ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        id='swiper-next'
      >
        <ChevronRightIcon size={18} className='md:size-5' />
      </button>

      <Swiper
        spaceBetween={16}
        slidesPerView={2}
        navigation={{
          prevEl: '#swiper-prev',
          nextEl: '#swiper-next',
        }}
        breakpoints={{
          480: { slidesPerView: 2.2 },
          640: { slidesPerView: 2.5 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        modules={[Navigation]}
        className='mt-6 md:mt-10'
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            {/* Link untuk menuju halaman detail */}
            <Link href={`/detail/${movie.id}`} passHref>
              <MovieCard
                imageUrl={movie.imageUrl}
                title={movie.title}
                rating={movie.rating}
                trendingIndex={movie.trendingIndex} // ✅ tambahkan ini
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
