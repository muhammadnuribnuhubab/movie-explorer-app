'use client';

import { useMemo, useEffect, useRef, useState, Suspense } from 'react';
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

  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const [query, setQuery] = useState<string>('');

  const rawQuery = useSearchParams().get('q');

  // Set query when search params change
  useEffect(() => {
    if (rawQuery) {
      setQuery(rawQuery.trim().toLowerCase());
    } else {
      setQuery('');
    }
  }, [rawQuery]);

  useEffect(() => {
    if (trendingMovies.length === 0) {
      fetchTrending();
    }
  }, [fetchTrending, trendingMovies.length]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      setIsNearBottom(scrollY + innerHeight >= scrollHeight - 100);
      setIsAtBottom(scrollY + innerHeight >= scrollHeight - 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const movies: FormattedMovie[] = useMemo(() => {
    const uniqueMap = new Map<string, FormattedMovie>();

    trendingMovies.forEach((movie) => {
      uniqueMap.set(movie.id, movie);
    });

    newReleases.forEach((movie) => {
      if (!uniqueMap.has(movie.id)) {
        uniqueMap.set(movie.id, movie);
      }
    });

    return Array.from(uniqueMap.values()).sort((a, b) => {
      const aIndex = a.trendingIndex ?? Infinity;
      const bIndex = b.trendingIndex ?? Infinity;
      return aIndex - bIndex;
    });
  }, [trendingMovies, newReleases]);

  const searchResults = useMemo(() => {
    return query
      ? movies.filter((m) => m.title.toLowerCase().includes(query))
      : [];
  }, [query, movies]);

  useEffect(() => {
    if (!query) {
      router.push('/search'); // Reset to the search page without query
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

          <div ref={bottomRef} />
        </>
      )}
    </section>
  );
};

const SearchPageWithSuspense = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <SearchPage />
  </Suspense>
);

export default SearchPageWithSuspense;
