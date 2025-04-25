'use client';

import { useMemo, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FavoriteItem } from '@/components/section';
import { EmptyContent } from '@/components/section/EmptyContent';
import { useMovieContext } from '@/contexts/MovieContext';
import { useFavorites } from '@/contexts/FavoriteContext';
import type { FormattedMovie } from '@/types/movie';
import { Toast } from '@/components/ui';
import { motion } from 'framer-motion'; // Import motion from framer-motion

const SearchPage = () => {
  const { newReleases, trendingMovies, movieDetails, fetchMovieDetail } =
    useMovieContext();
  const { favoriteMovies, addFavorite, removeFavorite } = useFavorites();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();
  const rawQuery = searchParams.get('q');
  const query = (rawQuery ?? '').trim().toLowerCase();

  const movies: FormattedMovie[] = useMemo(() => {
    const combined = [...trendingMovies, ...newReleases];
    const uniqueMap = new Map<string, FormattedMovie>();
    combined.forEach((movie) => {
      if (!uniqueMap.has(movie.id)) {
        uniqueMap.set(movie.id, movie);
      }
    });
    return Array.from(uniqueMap.values());
  }, [trendingMovies, newReleases]);

  const searchResults = useMemo(() => {
    return query
      ? movies.filter((m) => m.title.toLowerCase().includes(query))
      : [];
  }, [query, movies]);

  useEffect(() => {
    if (!query) {
      router.push('/search');
    }
  }, [query, router]);

  useEffect(() => {
    searchResults.forEach((movie) => {
      if (!movieDetails[movie.id]) {
        fetchMovieDetail(movie.id);
      }
    });
  }, [searchResults]);

  const isFavorite = (id: string) =>
    favoriteMovies.some((fav) => fav.id === id);

  const handleToggleFavorite = (
    movie: FormattedMovie,
    detail?: { description?: string; trailerUrl?: string }
  ) => {
    const fullMovie = {
      id: movie.id,
      title: movie.title,
      rating: movie.rating,
      description: detail?.description || movie.description,
      posterUrl: movie.posterUrl,
      trailerUrl: detail?.trailerUrl || '',
    };

    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
      setToastMessage('Removed from favorites');
    } else {
      addFavorite(fullMovie);
      setToastMessage('Added to favorites');
    }

    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <section className='relative pt-[70px] md:pt-[110px] px-xl max-w-[1160px] mx-auto'>
      <div className='mt-4'>
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
            className='space-y-4xl'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {searchResults.map((movie, index) => {
              const detail = movieDetails[movie.id];

              return (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                  <FavoriteItem
                    id={movie.id}
                    title={movie.title}
                    rating={movie.rating}
                    description={detail?.description || movie.description}
                    posterUrl={movie.imageUrl}
                    trailerUrl={detail?.trailerUrl || ''}
                    isFavorite={isFavorite(movie.id)}
                    onToggleFavorite={() => handleToggleFavorite(movie, detail)}
                  />
                  {index !== searchResults.length - 1 && (
                    <hr className='mt-8 md:mt-12 border-neutral-800' />
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>

      {toastMessage && <Toast message={toastMessage} type='success' />}
    </section>
  );
};

export default SearchPage;
