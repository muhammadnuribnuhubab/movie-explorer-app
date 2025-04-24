'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import type { FormattedMovie } from '@/types/movie';
import {
  fetchTrendingMovies as tmdbFetchTrendingMovies,
  fetchNewReleases as tmdbFetchNewReleases,
  fetchMovieDetail as tmdbFetchMovieDetail,
} from '@/lib/api/tmdb';

// Extend FormattedMovie to include description and trailerUrl
interface MovieContextType {
  trendingMovies: FormattedMovie[];
  newReleases: FormattedMovie[];
  movieDetails: { [id: string]: FormattedMovie };
  fetchTrending: () => Promise<void>;
  fetchNewReleases: (page?: number) => Promise<void>;
  fetchMovieDetail: (id: string) => Promise<void>;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [trendingMovies, setTrendingMovies] = useState<FormattedMovie[]>([]);
  const [newReleases, setNewReleases] = useState<FormattedMovie[]>([]);
  const [movieDetails, setMovieDetails] = useState<{ [id: string]: FormattedMovie }>({});

  const fetchTrending = async (): Promise<void> => {
    const raw = await tmdbFetchTrendingMovies();
    const formatted = raw.map((m, idx) => ({
      id: m.id.toString(),
      title: m.title,
      imageUrl: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
      rating: m.vote_average,
      description: m.overview,
      trailerUrl: '', // default empty, fill when detail fetched
      trendingIndex: idx + 1,
    }));
    setTrendingMovies(formatted);
  };

  const fetchNewReleases = async (page = 1): Promise<void> => {
    const raw = await tmdbFetchNewReleases(page);
    const formatted = raw.map((m, idx) => ({
      id: m.id.toString(),
      title: m.title,
      imageUrl: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
      rating: m.vote_average,
      description: m.overview,
      trailerUrl: '',
      trendingIndex: idx + 1,
    }));
    setNewReleases(prev => [...prev, ...formatted]);
  };

  const fetchMovieDetail = async (id: string): Promise<void> => {
    const data = await tmdbFetchMovieDetail(id);
    if (data) {
      const trailer = data.videos?.results.find((v: any) => v.type === 'Trailer')
        || data.videos?.results[0];
      const formatted: FormattedMovie = {
        id: data.id.toString(),
        title: data.title,
        imageUrl: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
        rating: data.vote_average,
        description: data.overview,
        trailerUrl: trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : '',
      };
      setMovieDetails(prev => ({ ...prev, [id]: formatted }));
    }
  };

  useEffect(() => {
    fetchTrending();
    fetchNewReleases();
  }, []);

  return (
    <MovieContext.Provider
      value={{
        trendingMovies,
        newReleases,
        movieDetails,
        fetchTrending,
        fetchNewReleases,
        fetchMovieDetail,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = (): MovieContextType => {
  const context = useContext(MovieContext);
  if (!context) throw new Error('useMovieContext must be used within MovieProvider');
  return context;
};