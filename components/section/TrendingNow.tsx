'use client';

import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import type { Swiper as SwiperType } from 'swiper';
import { SectionTitle } from './SectionTitle';
import { useRouter } from 'next/navigation';
import type { Movie } from '@/types/movie';
import { fetchTrendingMovies } from '@/lib/api/trending';
import { MovieCard } from '../card/MovieCard';
import { Button } from '../ui/Button';
import { ChevronLeftIcon, ChevronRightIcon } from '../ui/Icons';

export type TrendingMovie = {
  id: string;
  title: string;
  imageUrl: string;
  rating: string;
  trendingIndex?: number;
};

type TrendingNowProps = {
  title: string;
  className?: string;
};

export const TrendingNow = ({ title, className = '' }: TrendingNowProps) => {
  const [movies, setMovies] = useState<TrendingMovie[]>([]);
  const [isBeginning, setIsBeginning] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const raw: Movie[] = await fetchTrendingMovies();
        const formatted: TrendingMovie[] = raw.map((m: Movie, i: number) => ({
          id: m.id.toString(),
          title: m.title,
          imageUrl: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
          rating: m.vote_average.toFixed(1),
          trendingIndex: i + 1,
        }));
        setMovies(formatted);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (swiperRef.current) {
      setIsBeginning(swiperRef.current.isBeginning);
      setIsEnd(swiperRef.current.isEnd);
    }
  }, [movies]);

  const handleClick = (id: string) => {
    sessionStorage.setItem('fromInternalNavigation', 'true');
    router.push(`/detail/${id}`);
  };

  return (
    <section
      className={`relative max-w-[1180px] mx-auto px-[18px] ${className}`}
    >
      <SectionTitle title={title} />

      <Button
        variant='secondary'
        className={`flex justify-center items-center absolute top-[45%] left-0 z-10 !w-[44px] rounded-full text-white border border-neutral-800 hover:bg-neutral-700 transition-opacity ${
          isBeginning ? '!opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        id='swiper-prev'
      >
        <ChevronLeftIcon size={24} />
      </Button>

      <Button
        variant='secondary'
        className={`flex justify-center items-center absolute top-[45%] right-0 z-10 !w-[44px] rounded-full text-white hover:bg-neutral-700 transition-opacity ${
          isEnd || movies.length <= 1
            ? '!opacity-0 pointer-events-none'
            : 'opacity-100'
        }`}
        id='swiper-next'
      >
        <ChevronRightIcon size={24} />
      </Button>

      <Swiper
        spaceBetween={16}
        slidesPerView={2}
        navigation={{ prevEl: '#swiper-prev', nextEl: '#swiper-next' }}
        breakpoints={{
          300: { slidesPerView: 3 },
          480: { slidesPerView: 3 },
          640: { slidesPerView: 4 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
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
        {movies.map((movie, index) => (
          <SwiperSlide key={`${movie.id}-${movie.trendingIndex ?? index}`}>
            <div
              className='cursor-pointer'
              onClick={() => handleClick(movie.id)}
            >
              <MovieCard
                imageUrl={movie.imageUrl}
                title={movie.title}
                rating={movie.rating}
                trendingIndex={movie.trendingIndex}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
