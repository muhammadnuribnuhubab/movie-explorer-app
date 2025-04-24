// context/FavoriteContext.tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type Movie = {
  id: string;
  title: string;
  rating: number;
  description: string;
  posterUrl: string; // tambahkan posterUrl
  trailerUrl?: string; // tambahkan trailerUrl
};

type FavoriteContextType = {
  favoriteMovies: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: string) => void;
};

const FavoriteContext = createContext<FavoriteContextType | undefined>(
  undefined
);

export const useFavorites = () => {
  const ctx = useContext(FavoriteContext);
  if (!ctx)
    throw new Error('useFavorites must be used within FavoriteProvider');
  return ctx;
};

export const FavoriteProvider = ({ children }: { children: ReactNode }) => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  // contexts/FavoriteContext.tsx
  const addFavorite = (movie: Movie) => {
    console.log('Adding movie:', movie.id);
    setFavoriteMovies((prev) => {
      console.log('Previous state:', prev);
      return prev.some((m) => m.id === movie.id) ? prev : [...prev, movie];
    });
  };

  const removeFavorite = (id: string) => {
    console.log('Removing movie:', id);
    setFavoriteMovies((prev) =>
      prev.filter((m) => {
        console.log('Checking:', m.id, 'vs', id);
        return m.id !== id;
      })
    );
  };

  return (
    <FavoriteContext.Provider
      value={{ favoriteMovies, addFavorite, removeFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};
