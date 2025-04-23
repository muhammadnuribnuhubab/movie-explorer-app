'use client';

import { useEffect, useState } from 'react';
import { HeroBanner, NewRelease, TrendingNow } from '@/components/section';
import {
  fetchTrendingMovies,
  fetchNewReleases,
  fetchMovieVideos,
} from '@/lib/api/tmdb';
import type { Movie, FormattedMovie } from '@/types/movie';

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
  return item ? JSON.parse(item) as T : null;
}

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState<FormattedMovie[]>([]);
  const [newReleases, setNewReleases] = useState<FormattedMovie[]>([]);
  const [topMovie, setTopMovie] = useState<Movie | null>(null);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);
  const [newReleasesPage, setNewReleasesPage] = useState(1);

  // Ambil dari sessionStorage saat mount
  useEffect(() => {
    const savedPage = loadFromSession<number>(STORAGE_KEYS.newReleasesPage);
    const savedData = loadFromSession<FormattedMovie[]>(STORAGE_KEYS.newReleasesData);

    if (savedPage) setNewReleasesPage(savedPage);
    if (savedData) setNewReleases(savedData);
  }, []);

  // Ambil trending + topMovie hanya 1x
  useEffect(() => {
    const getTrending = async () => {
      try {
        const trendingData = await fetchTrendingMovies(1);
        setTopMovie(trendingData[0]);

        const formatted = trendingData.map((movie, index) => ({
          id: movie.id.toString(),
          title: movie.title,
          imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          rating: Number(movie.vote_average),
          trendingIndex: index + 1,
        }));

        setTrendingMovies(formatted);

        if (trendingData[0]) {
          const videos = await fetchMovieVideos(trendingData[0].id);
          const trailer = videos.find(
            (video) => video.type === 'Trailer' && video.site === 'YouTube'
          ) || videos.find((video) => video.site === 'YouTube');

          setTrailerUrl(trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null);
        }
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    };

    getTrending();
  }, []);

  // Fetch new release saat page berubah
  useEffect(() => {
    const fetchNewRelease = async () => {
      try {
        const data = await fetchNewReleases(newReleasesPage);
        const formatted = data.map((movie, index) => ({
          id: movie.id.toString(),
          title: movie.title,
          imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          rating: Number(movie.vote_average),
          trendingIndex: index + 1,
        }));

        setNewReleases((prev) => {
          const unique = [...prev, ...formatted].filter(
            (item, index, arr) =>
              arr.findIndex((m) => m.id === item.id) === index
          );
          saveToSession(STORAGE_KEYS.newReleasesData, unique);
          return unique;
        });

        saveToSession(STORAGE_KEYS.newReleasesPage, newReleasesPage);
      } catch (error) {
        console.error('Error fetching new releases:', error);
      }
    };

    if (newReleasesPage > 1 || newReleases.length === 0) {
      fetchNewRelease();
    }
  }, [newReleasesPage]);

  const handleLoadMore = () => {
    setNewReleasesPage((prev) => prev + 1);
  };

  return (
    <main className="mx-auto">
      {topMovie && <HeroBanner movie={topMovie} trailerUrl={trailerUrl} />}
      <TrendingNow movies={trendingMovies} title="Trending Now" />
      <NewRelease
        movies={newReleases}
        title="New Release"
        onLoadMore={handleLoadMore}
      />
    </main>
  );
}
