'use client';

import { useRouter } from 'next/navigation';

import type { FormattedMovie } from '@/types/movie';
import { motion } from 'framer-motion';
import { MovieCard } from '@/components/card/MovieCard';
import { SectionTitle } from '@/components/section/SectionTitle';

type SearchResultsGridProps = {
  title: string;
  className?: string;
  movies: FormattedMovie[];
};

export const SearchResultsGrid = ({
  title,
  className = '',
  movies,
}: SearchResultsGridProps) => {
  const router = useRouter();

  const handleClick = (id: string) => {
    sessionStorage.setItem('fromInternalNavigation', 'true');
    router.push(`/detail/${id}`);
  };

  if (movies.length === 0) {
    return (
      <section className={`max-w-[1180px] ${className}`}>
        <SectionTitle title={title} />
        <div className='text-center text-white'>
          <p>No movies found. Try using different keywords.</p>
        </div>
      </section>
    );
  }

  return (
    <section className={`${className}`}>
      <SectionTitle title={title} />

      <motion.div
        className='mt-6 md:mt-8 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        {movies.map((movie) => (
          <motion.div
            key={movie.id}
            className='cursor-pointer'
            onClick={() => handleClick(movie.id)}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: false }}
          >
            <MovieCard
              imageUrl={movie.imageUrl}
              title={movie.title}
              rating={movie.rating}
              trendingIndex={movie.trendingIndex}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
