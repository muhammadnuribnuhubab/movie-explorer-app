'use client';

import { useEffect, useState } from 'react';
import { HeroBanner, NewRelease, TrendingNow } from '@/components/section';
import { fetchTrendingMovies, fetchNewReleases } from '@/lib/api/tmdb';
import type { Movie } from '@/types/movie';
import { FormattedMovie } from '@/types/movie';

export default function HomeLayout() {
  const [trendingMovies, setTrendingMovies] = useState<FormattedMovie[]>([]);
  const [newReleases, setNewReleases] = useState<FormattedMovie[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      // Ambil Trending Movies
      const trendingData: Movie[] = await fetchTrendingMovies();
      const formattedTrendingMovies: FormattedMovie[] = trendingData.map((movie, index) => ({
        id: movie.id.toString(),
        title: movie.title,
        imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        rating: Number(movie.vote_average),
        trendingIndex: index + 1,
      }));
      setTrendingMovies(formattedTrendingMovies);

      // Ambil New Releases
      const newReleasesData: Movie[] = await fetchNewReleases(3); // Pastikan API untuk New Releases tersedia
      const formattedNewReleases: FormattedMovie[] = newReleasesData.map((movie, index) => ({
        id: movie.id.toString(),
        title: movie.title,
        imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        rating: Number(movie.vote_average),
        trendingIndex: index + 1,
      }));
      setNewReleases(formattedNewReleases);
    };

    getMovies();
  }, []);

  return (
    <main className='mx-auto'>
      <HeroBanner />
      <TrendingNow movies={trendingMovies} title='Trending Now' />
      <NewRelease movies={newReleases} title='New Release' /> {/* Menggunakan newReleases */}
    </main>
  );
}
