'use client';

import { useEffect, useState, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { EmptyContent } from '@/components/section/EmptyContent';
import type { FormattedMovie } from '@/types/movie';
import { motion } from 'framer-motion';
import { SearchResultsGrid } from './SearchResultsGrid';
import { ScrollButton } from '@/components/ui/ScrollButton';
import { SectionTitle } from '@/components/section/SectionTitle';
import { fetchExploreMore } from '@/lib/api/exploreMore';
import { fetchTrendingMovies } from '@/lib/api/trending';
import ClientGuard from '@/components/ClientGuard';

const MAX_BATCH_PAGES = 5;

const SearchPage = () => {
  const [trendingMovies, setTrendingMovies] = useState<FormattedMovie[]>([]);
  const [newReleases, setNewReleases] = useState<FormattedMovie[]>([]);
  const [searchPage, setSearchPage] = useState(1);
  const [loadingReleases, setLoadingReleases] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);

  const rawQuery = useSearchParams().get('q') ?? '';
  const [query, setQuery] = useState(rawQuery.trim().toLowerCase());

  useEffect(() => {
    setQuery(rawQuery.trim().toLowerCase());
  }, [rawQuery]);

  useEffect(() => {
    fetchTrendingMovies()
      .then((raw: unknown[]) => {
        const fmt: FormattedMovie[] = raw.map((m: unknown, i: number) => {
          const movie = m as {
            id: number;
            title: string;
            poster_path: string;
            vote_average: number;
            overview: string;
          };
          return {
            id: movie.id.toString(),
            title: movie.title,
            imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            rating: movie.vote_average.toFixed(1),
            description: movie.overview,
            trendingIndex: i + 1,
          };
        });
        setTrendingMovies(fmt);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    setLoadingReleases(true);
    fetchExploreMore(1, MAX_BATCH_PAGES)
      .then((batch: FormattedMovie[]) => setNewReleases(batch))
      .catch(console.error)
      .finally(() => setLoadingReleases(false));
  }, []);

  const allMovies = useMemo<FormattedMovie[]>(() => {
    const map = new Map<string, FormattedMovie>();
    trendingMovies.forEach((m) => map.set(m.id, m));
    newReleases.forEach((m) => {
      if (!map.has(m.id)) map.set(m.id, m);
    });
    return Array.from(map.values()).sort((a, b) => {
      const ai = a.trendingIndex ?? Infinity;
      const bi = b.trendingIndex ?? Infinity;
      return ai - bi;
    });
  }, [trendingMovies, newReleases]);

  const searchResults = useMemo(() => {
    return query
      ? allMovies.filter((m) => m.title.toLowerCase().includes(query))
      : [];
  }, [query, allMovies]);

  useEffect(() => {
    if (!query) return;
    if (searchResults.length === 0 && !loadingReleases) {
      setLoadingReleases(true);
      const nextStart = 1 + MAX_BATCH_PAGES * searchPage;
      fetchExploreMore(nextStart, MAX_BATCH_PAGES)
        .then((batch: FormattedMovie[]) =>
          setNewReleases((prev) => {
            const map = new Map(prev.map((m) => [m.id, m]));
            batch.forEach((m) => map.set(m.id, m));
            return Array.from(map.values());
          })
        )
        .catch(console.error)
        .finally(() => setLoadingReleases(false));
      setSearchPage((p) => p + 1);
    }
  }, [query, searchResults.length, loadingReleases, searchPage]);

  useEffect(() => {
    if (!query && !newReleases.length) return;
    if (isNearBottom && !loadingReleases) {
      setLoadingReleases(true);
      const nextStart = 1 + MAX_BATCH_PAGES * searchPage;
      fetchExploreMore(nextStart, MAX_BATCH_PAGES)
        .then((batch: FormattedMovie[]) =>
          setNewReleases((prev) => {
            const map = new Map(prev.map((m) => [m.id, m]));
            batch.forEach((m) => map.set(m.id, m));
            return Array.from(map.values());
          })
        )
        .catch(console.error)
        .finally(() => setLoadingReleases(false));
      setSearchPage((p) => p + 1);
    }
  }, [isNearBottom, loadingReleases, query, newReleases.length, searchPage]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY,
        h = window.innerHeight,
        sh = document.documentElement.scrollHeight;
      setIsNearBottom(y + h >= sh - 100);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section className='pt-[70px] md:pt-[110px] px-xl max-w-[1160px] mx-auto'>
      {(!query || searchResults.length === 0) && (
        <SectionTitle title='Search' />
      )}

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
          transition={{ duration: 0.6 }}
        >
          <SearchResultsGrid
            title={`Search results for: ${query}`}
            movies={searchResults}
          />
        </motion.div>
      )}

      {searchResults.length > 0 && <ScrollButton />}
    </section>
  );
};

const SearchPageWithSuspense = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isInternal = sessionStorage.getItem('fromInternalNavigation') === 'true';
      const rawQuery = new URLSearchParams(window.location.search).get('q') ?? '';
      const isQueryFromUrl = rawQuery.trim() !== '';

      if (isQueryFromUrl && !isInternal) {
        sessionStorage.setItem('fromInternalNavigation', 'false');
      }
    }
  }, []);

  return (
    <Suspense
      fallback={<div className='text-center py-16 text-white'>Loading...</div>}
    >
      <ClientGuard>
        <SearchPage />
      </ClientGuard>
    </Suspense>
  );
};



export default SearchPageWithSuspense;
