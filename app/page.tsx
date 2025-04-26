'use client';

import { useEffect, useState, useRef } from 'react';
import { HeroBanner, NewRelease, TrendingNow } from '@/components/section';
import {
  fetchTrendingMovies,
  fetchNewReleases,
  fetchMovieVideos,
} from '@/lib/api/tmdb';
import type { Movie, FormattedMovie } from '@/types/movie';
import { AnimatePresence, motion } from 'framer-motion';
import { Button, ChevronLeftIcon } from '@/components/ui';

const STORAGE_KEYS = {
  newReleasesPage: 'newReleasesPage',
  newReleasesData: 'newReleasesData',
  scrollYHome: 'scrollYHome', // Tambahan key untuk scroll
};

function saveToSession(key: string, value: unknown) {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}

function loadFromSession<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  const item = sessionStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
}

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState<FormattedMovie[]>([]);
  const [newReleases, setNewReleases] = useState<FormattedMovie[]>([]);
  const [topMovie, setTopMovie] = useState<Movie | null>(null);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [newReleasesPage, setNewReleasesPage] = useState(1);
  const [isFetchingNewReleases, setIsFetchingNewReleases] = useState(false);
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

  // Restore scroll position
  useEffect(() => {
    const savedScrollY = sessionStorage.getItem(STORAGE_KEYS.scrollYHome);
    if (savedScrollY) {
      window.scrollTo({ top: Number(savedScrollY), behavior: 'instant' });
    }

    const saveScroll = () => {
      sessionStorage.setItem(
        STORAGE_KEYS.scrollYHome,
        window.scrollY.toString()
      );
    };

    window.addEventListener('beforeunload', saveScroll);
    return () => window.removeEventListener('beforeunload', saveScroll);
  }, []);

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

  // Load halaman & data new release dari session
  useEffect(() => {
    const savedPage = loadFromSession<number>(STORAGE_KEYS.newReleasesPage);
    if (savedPage) setNewReleasesPage(savedPage);

    const savedData = loadFromSession<FormattedMovie[]>(
      STORAGE_KEYS.newReleasesData
    );
    if (savedData) setNewReleases(savedData);
  }, []);

  useEffect(() => {
    const getTrending = async () => {
      try {
        const raw = await fetchTrendingMovies();
        setTopMovie(raw[0]);

        const formatted: FormattedMovie[] = raw.map((m: Movie, i: number) => ({
          id: m.id.toString(),
          title: m.title,
          imageUrl: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
          rating: Number(m.vote_average).toFixed(2),
          trendingIndex: i + 1,
          description: m.overview,
        }));
        setTrendingMovies(formatted);

        const vids = await fetchMovieVideos(raw[0].id);
        const trailer =
          vids.find(
            (v: { type: string; site: string; key: string }) =>
              v.type === 'Trailer' && v.site === 'YouTube'
          ) ??
          vids.find((v: { site: string; key: string }) => v.site === 'YouTube');

        setTrailerUrl(
          trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null
        );
      } catch (e) {
        console.error('Error fetching trending movies:', e);
      }
    };
    getTrending();
  }, []);

  useEffect(() => {
    const getNew = async () => {
      setIsFetchingNewReleases(true);
      try {
        const fetched: FormattedMovie[] = await fetchNewReleases(
          newReleasesPage
        );
        setNewReleases((prev) => {
          const all = [...prev, ...fetched];
          const unique = all.filter(
            (m, idx, arr) => arr.findIndex((x) => x.id === m.id) === idx
          );
          saveToSession(STORAGE_KEYS.newReleasesData, unique);
          return unique;
        });
        saveToSession(STORAGE_KEYS.newReleasesPage, newReleasesPage);
      } catch (e) {
        console.error('Error fetching new releases:', e);
      } finally {
        setIsFetchingNewReleases(false);
      }
    };

    if (newReleasesPage > 1 || newReleases.length === 0) {
      getNew();
    }
  }, [newReleasesPage, newReleases.length]);

  const handleLoadMore = () => {
    setNewReleasesPage((p) => p + 1);
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className='mx-auto'>
      <AnimatePresence>
        {topMovie && (
          <motion.div
            key='hero'
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <HeroBanner movie={topMovie} trailerUrl={trailerUrl} />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <TrendingNow movies={trendingMovies} title='Trending Now' />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <NewRelease
          title='New Releases'
          movies={newReleases}
          onLoadMore={handleLoadMore}
          isLoading={isFetchingNewReleases}
        />
      </motion.div>

      {/* Tombol Scroll ke Bawah atau Kembali ke Atas */}
      <Button variant={'secondary'}
        onClick={isAtBottom ? scrollToTop : scrollToBottom}
        className={`fixed right-4 2xl:right-auto 2xl:left-1/2 2xl:translate-x-[calc(590px-100%)] p-3 text-white rounded-full shadow-lg !w-[44px] flex items-center justify-center z-50 transition-all duration-300 ${
          isNearBottom ? 'bottom-24' : 'bottom-4'
        }`}
        aria-label={isAtBottom ? 'Scroll to top' : 'Scroll to bottom'}
      >
        {isAtBottom ? (<ChevronLeftIcon className="rotate-90" />) : (<ChevronLeftIcon className="rotate-270" />)}
      </Button>

      {/* Elemen Target Scroll */}
      <div ref={bottomRef} />
    </main>
  );
}
