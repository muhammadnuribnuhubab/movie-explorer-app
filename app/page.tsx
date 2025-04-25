'use client';

import { useEffect, useState } from 'react';
import { HeroBanner, NewRelease, TrendingNow } from '@/components/section';
import {
  fetchTrendingMovies,
  fetchNewReleases,
  fetchMovieVideos,
} from '@/lib/api/tmdb';
import type { Movie, FormattedMovie } from '@/types/movie';
import { AnimatePresence, motion } from 'framer-motion';

const STORAGE_KEYS = {
  newReleasesPage: 'newReleasesPage',
  newReleasesData: 'newReleasesData',
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

  // restore page & data
  useEffect(() => {
    const savedPage = loadFromSession<number>(STORAGE_KEYS.newReleasesPage);
    const savedData = loadFromSession<FormattedMovie[]>(
      STORAGE_KEYS.newReleasesData
    );
    if (savedPage) setNewReleasesPage(savedPage);
    if (savedData) setNewReleases(savedData);
  }, []);

  // fetch trending sekali
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

        // ambil trailer untuk topMovie
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

  // fetch new releases tiap page change
  useEffect(() => {
    const getNew = async () => {
      try {
        // **fetchNewReleases** sudah mengembalikan FormattedMovie[]
        const fetched: FormattedMovie[] = await fetchNewReleases(
          newReleasesPage
        );

        setNewReleases((prev) => {
          // gabung + dedupe by id
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
      }
    };

    // jalankan sekali: kalau page >1 atau belum ada data
    if (newReleasesPage > 1 || newReleases.length === 0) {
      getNew();
    }
  }, [newReleasesPage, newReleases.length]);

  const handleLoadMore = () => {
    setNewReleasesPage((p) => p + 1);
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
          movies={newReleases}
          title='New Release'
          onLoadMore={handleLoadMore}
        />
      </motion.div>
    </main>
  );
}
