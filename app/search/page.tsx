'use client';

import { useMemo, useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { EmptyContent } from '@/components/section/EmptyContent';

import { useMovieContext } from '@/contexts/MovieContext';
import type { FormattedMovie } from '@/types/movie';
import { motion } from 'framer-motion';
import { SearchResultsGrid } from './SearchResultsGrid';
import { SectionTitle } from '@/components/section';
import { Button, ChevronLeftIcon } from '@/components/ui';
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
  }, [fetchTrending, trendingMovies.length]);

  const [isAtBottom, setIsAtBottom] = useState(false); // Menambahkan state untuk deteksi scroll

  const [isNearBottom, setIsNearBottom] = useState(false); // NEW

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      setIsNearBottom(scrollY + innerHeight >= scrollHeight - 100); // 100px sebelum bawah
      setIsAtBottom(scrollY + innerHeight >= scrollHeight - 10); // benar-benar di bawah
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Restore scroll position

  // Check if user is at the bottom of the page
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200; // 200px before bottom
      setIsAtBottom(nearBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

  return (
    <section className='pt-[70px] md:pt-[110px] px-xl max-w-[1160px] mx-auto'>
      {!query || searchResults.length === 0 ? (
        <SectionTitle title='Search' />
      ) : null}
      <div>
        {!query ? (
          <div className='text-center text-white text-lg py-16'>
            <EmptyContent
              title='No Search Query'
              description='Please enter a keyword to search movies.'
              imageSrc='/images/not-found.svg'
            />
          </div>
        ) : searchResults.length === 0 ? (
          <div className='text-center text-white text-lg py-16'>
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

      {/* Scroll Button, hanya muncul kalau ada hasil */}
      {searchResults.length > 0 && (
        <>
          <Button
            variant={'secondary'}
            onClick={isAtBottom ? scrollToTop : scrollToBottom}
            className={`fixed right-4 2xl:right-auto 2xl:left-1/2 2xl:translate-x-[calc(590px-100%)] p-3 text-white rounded-full shadow-lg !w-[44px] flex items-center justify-center z-50 transition-all duration-300 ${
              isNearBottom ? 'bottom-24' : 'bottom-4'
            }`}
            aria-label={isAtBottom ? 'Scroll to top' : 'Scroll to bottom'}
          >
            {isAtBottom ? (
              <ChevronLeftIcon className='rotate-90' />
            ) : (
              <ChevronLeftIcon className='rotate-270' />
            )}
          </Button>

          {/* Elemen Target Scroll */}
          <div ref={bottomRef} />
        </>
      )}
    </section>
  );
};

export default SearchPage;
