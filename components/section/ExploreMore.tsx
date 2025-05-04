'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { SectionTitle } from './SectionTitle';
import type { FormattedMovie } from '@/types/movie';
import { motion } from 'framer-motion';
import { ScrollButton } from '../ui/ScrollButton';
import { fetchExploreMore } from '@/lib/api/exploreMore';
import { MovieCard } from '../card/MovieCard';
import { Button } from '../ui/Button';

const LOCAL_STORAGE_KEY = 'exploreMoreMovies';
const LOCAL_STORAGE_PAGE = 'exploreMorePage';
const LOCAL_STORAGE_VISIBLE_COUNT = 'exploreMoreVisibleCount';

export const ExploreMore = ({
  title,
  className = '',
}: {
  title: string;
  className?: string;
}) => {
  const [movies, setMovies] = useState<FormattedMovie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [visibleCount, setVisibleCount] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isAllVisible = visibleCount >= movies.length;
  const router = useRouter();
  const initialized = useRef<boolean>(false);

  // Load from localStorage if exists
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const storedMovies = localStorage.getItem(LOCAL_STORAGE_KEY);
    const storedPage = localStorage.getItem(LOCAL_STORAGE_PAGE);
    const storedVisibleCount = localStorage.getItem(
      LOCAL_STORAGE_VISIBLE_COUNT
    );

    if (storedMovies && storedPage && storedVisibleCount) {
      const parsedMovies = JSON.parse(storedMovies);
      setMovies(parsedMovies);
      setPage(Number(storedPage));
      setVisibleCount(Number(storedVisibleCount));
      return;
    }

    const loadInitial = async () => {
      setIsLoading(true);
      try {
        const initial = await fetchExploreMore(1, 10); // Fetch initial data
        setMovies(initial);
        setVisibleCount(Math.min(10, initial.length));
        setPage(1);
      } catch (err) {
        console.error('Error fetching initial movies:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitial();
  }, []);

  // Save to localStorage when movies or page changes
  useEffect(() => {
    if (movies.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(movies));
      localStorage.setItem(LOCAL_STORAGE_PAGE, page.toString());
    }
  }, [movies, page]);

  // Save visibleCount to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_VISIBLE_COUNT, visibleCount.toString());
  }, [visibleCount]);

  // Menyesuaikan visibleCount berdasarkan panjang total film yang ada
  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const batch = await fetchExploreMore(nextPage, 10); // Ambil lebih banyak film dalam batch
      setMovies((prev) => {
        const existingIds = new Set(prev.map((m) => m.id));
        const filtered = batch.filter((m) => !existingIds.has(m.id));
        return [...prev, ...filtered];
      });
      setPage(nextPage);
      setVisibleCount((prev) => Math.min(prev + batch.length, movies.length)); // Pastikan visibleCount tidak melebihi jumlah film
    } catch (err) {
      console.error('Error loading more movies:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Menjaga agar visibleCount tidak lebih dari jumlah film yang ada
  useEffect(() => {
    if (movies.length > 0) {
      setVisibleCount((prev) => Math.min(prev, movies.length));
    }
  }, [movies]);

  return (
    <section className={`mx-auto mt-12 max-w-[1180px] px-[18px] ${className}`}>
      <SectionTitle title={title} />
      <motion.div
        className='relative mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        {movies.slice(0, visibleCount).map((movie) => (
          <motion.div
            key={movie.id}
            className='cursor-pointer'
            onClick={() => router.push(`/detail/${movie.id}`)}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false }}
          >
            <MovieCard
              imageUrl={movie.imageUrl}
              title={movie.title}
              rating={movie.rating}
            />
          </motion.div>
        ))}
        {!isAllVisible && (
          <div className='absolute bottom-0 left-0 right-0 h-150 bg-gradient-to-t from-black to-transparent md:h-160' />
        )}
      </motion.div>

      {isLoading && (
        <div className='text-center py-6 text-sm md:text-base text-neutral-25 animate-pulse'>
          <span className='inline-block mr-2 animate-spin'>🎬</span>
          Loading new releases...
        </div>
      )}

      {!isAllVisible && !isLoading && (
        <div className='mt-6 flex justify-center'>
          <Button onClick={handleLoadMore} variant='secondary' size='lg'>
            Load More
          </Button>
        </div>
      )}

      <ScrollButton />
    </section>
  );
};
