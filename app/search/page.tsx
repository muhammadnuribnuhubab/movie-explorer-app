'use client';

import { useMemo, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { EmptyContent } from '@/components/section/EmptyContent';

import { useMovieContext } from '@/contexts/MovieContext';
import type { FormattedMovie } from '@/types/movie';
import { motion } from 'framer-motion';
import { SearchResultsGrid } from './SearchResultsGrid';
const SearchPage = () => {
  const { newReleases, trendingMovies, fetchTrending } = useMovieContext();

  const searchParams = useSearchParams();
  const router = useRouter();
  const rawQuery = searchParams.get('q');
  const query = (rawQuery ?? '').trim().toLowerCase();

  useEffect(() => {
    if (trendingMovies.length === 0) {
      fetchTrending();
    }
  }, []);

  // Gabungkan dan filter film unik dari data yang sudah ada
  const movies: FormattedMovie[] = useMemo(() => {
    const uniqueMap = new Map<string, FormattedMovie>();

    // Tambahkan trendingMovies dulu supaya trendingIndex-nya tidak tertimpa
    trendingMovies.forEach((movie) => {
      uniqueMap.set(movie.id, movie);
    });

    // Tambahkan newReleases hanya jika belum ada
    newReleases.forEach((movie) => {
      if (!uniqueMap.has(movie.id)) {
        uniqueMap.set(movie.id, movie);
      }
    });

    // Ubah ke array dan sort berdasarkan trendingIndex kalau ada
    return Array.from(uniqueMap.values()).sort((a, b) => {
      const aIndex = a.trendingIndex ?? Infinity;
      const bIndex = b.trendingIndex ?? Infinity;
      return aIndex - bIndex;
    });
  }, [trendingMovies, newReleases]);

  // Filter hasil pencarian berdasarkan query
  const searchResults = useMemo(() => {
    return query
      ? movies.filter((m) => m.title.toLowerCase().includes(query)) // Cek jika query ada dalam title
      : [];
  }, [query, movies]);

  // Redirect ke halaman pencarian jika query kosong
  useEffect(() => {
    if (!query) {
      router.push('/search');
    }
  }, [query, router]);

  useEffect(() => {
    console.log('Search Results:', searchResults);
  }, [searchResults]);

  return (
    <section className='relative   max-w-[1160px] mx-auto'>
      <div className='mt-4'>
        {!query ? (
          <div className='mt-54 text-center text-white text-lg py-16'>
            <EmptyContent
              title='No Search Query'
              description='Please enter a keyword to search movies.'
              imageSrc='/images/not-found.svg'
            />
          </div>
        ) : searchResults.length === 0 ? (
          <div className='mt-54 text-center text-white text-lg py-16'>
            <EmptyContent
              title='Data Not Found'
              description='Try other keywords'
              imageSrc='/images/not-found.svg'
            />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <SearchResultsGrid
              title={`Search results for: ${query}`}
              movies={searchResults}
            />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SearchPage;
