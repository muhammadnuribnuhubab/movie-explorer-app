'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import type { FormattedMovie } from '@/types/movie';
import {
  fetchTrendingMovies as tmdbFetchTrendingMovies,
  fetchMovieDetail as tmdbFetchMovieDetail,
} from '@/lib/api/tmdb';

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

interface MovieContextType {
  trendingMovies: FormattedMovie[];
  newReleases: FormattedMovie[];
  movieDetails: { [id: string]: FormattedMovie };
  newReleasesPage: number;
  fetchTrending: () => Promise<void>;
  fetchNewReleases: (page?: number) => Promise<void>;
  fetchMovieDetail: (id: string) => Promise<void>;
  handleLoadMore: () => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

// Ini type hasil raw fetch dari TMDB (bukan FormattedMovie)
interface RawMovie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  videos?: {
    results: { key: string; type: string }[];
  };
}

export const MovieProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [trendingMovies, setTrendingMovies] = useState<FormattedMovie[]>([]);
  const [newReleases, setNewReleases] = useState<FormattedMovie[]>([]);
  const [movieDetails, setMovieDetails] = useState<{
    [id: string]: FormattedMovie;
  }>({});
  const [newReleasesPage, setNewReleasesPage] = useState<number>(1);

  useEffect(() => {
    const savedPage = loadFromSession<number>(STORAGE_KEYS.newReleasesPage);
    const savedData = loadFromSession<FormattedMovie[]>(
      STORAGE_KEYS.newReleasesData
    );

    if (savedPage) setNewReleasesPage(savedPage);
    if (savedData) setNewReleases(savedData);
  }, []);

  const fetchTrending = async (): Promise<void> => {
    const raw = await tmdbFetchTrendingMovies() as RawMovie[];
    const formatted = raw.map((m: RawMovie, idx: number) => ({
      id: m.id.toString(),
      title: m.title,
      imageUrl: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
      rating: m.vote_average,
      description: m.overview,
      trailerUrl: '',
      trendingIndex: idx + 1,
    }));
    setTrendingMovies(formatted);
  };

  const fetchNewReleases = async (page = 1): Promise<void> => {
    console.log(`Fetching new releases for page: ${page}`);

    const raw = await tmdbFetchTrendingMovies(); // jangan ada as RawMovie[]


    const filtered = raw.filter((m: RawMovie) => m.poster_path && m.vote_average);
    console.log('Filtered data:', filtered);

    const formatted = filtered.map((m: RawMovie, idx: number) => ({
      id: m.id.toString(),
      title: m.title,
      imageUrl: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
      rating: m.vote_average,
      description: m.overview,
      trailerUrl: '',
      trendingIndex: idx + 1,
    }));
    console.log('Formatted data:', formatted);

    setNewReleases((prev) => {
      const all = [...prev, ...formatted];
      const unique = all.filter(
        (m, idx, arr) => arr.findIndex((x) => x.id === m.id) === idx
      );
      saveToSession(STORAGE_KEYS.newReleasesData, unique);
      return unique;
    });

    setNewReleasesPage(page);
    saveToSession(STORAGE_KEYS.newReleasesPage, page);
  };

  const fetchMovieDetail = async (id: string): Promise<void> => {
    const data = await tmdbFetchMovieDetail(id) as RawMovie | null;
    if (data) {
      const trailer = data.videos?.results.find((v) => v.type === 'Trailer') || data.videos?.results[0];
      const formatted: FormattedMovie = {
        id: data.id.toString(),
        title: data.title,
        imageUrl: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        rating: data.vote_average,
        description: data.overview,
        trailerUrl: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : '',
      };
      setMovieDetails((prev) => ({ ...prev, [id]: formatted }));
    }
  };

  const handleLoadMore = () => {
    setNewReleasesPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (newReleasesPage > 1 || newReleases.length === 0) {
      fetchNewReleases(newReleasesPage);
    }
  }, [newReleasesPage, newReleases.length]);

  return (
    <MovieContext.Provider
      value={{
        trendingMovies,
        newReleases,
        movieDetails,
        newReleasesPage,
        fetchTrending,
        fetchNewReleases,
        fetchMovieDetail,
        handleLoadMore,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = (): MovieContextType => {
  const context = useContext(MovieContext);
  if (!context)
    throw new Error('useMovieContext must be used within MovieProvider');
  return context;
};
