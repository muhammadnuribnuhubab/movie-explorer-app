'use client';

import { useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { Toast } from '../ui/Toast';
import { useFavorites } from '@/contexts/FavoriteContext';
import { Button } from '../ui/Button';
import { PlayIcon, HeartInlineIcon, HeartOutlineIcon } from '../ui/Icons';

interface MovieActionsProps {
  trailerUrl?: string;
  movieId: string;
  movieTitle: string;
  movieRating: number;
  movieDescription: string;
  posterUrl: string; // terima posterUrl juga
  className?: string;
}

export const MovieActions: React.FC<MovieActionsProps> = ({
  trailerUrl,
  movieId,
  movieTitle,
  movieRating,
  movieDescription,
  posterUrl,
}) => {
  const isMdUp = useMediaQuery('(min-width: 768px)');
  const { favoriteMovies, addFavorite, removeFavorite } = useFavorites();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const isFavorite = favoriteMovies.some((m) => m.id === movieId);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(movieId);
      setToastMessage('Removed from Favorites');
    } else {
      addFavorite({
        id: movieId,
        title: movieTitle,
        rating: movieRating,
        description: movieDescription,
        posterUrl,
        trailerUrl,
      });
      setToastMessage('Added to Favorites');
    }
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleWatchTrailer = () => {
    if (trailerUrl) window.open(trailerUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className='flex gap-4 md:gap-6'>
      {trailerUrl && (
        <Button
          onClick={handleWatchTrailer}
          className='w-full md:!w-[220px] !gap-2'
        >
          Watch Trailer <PlayIcon size={isMdUp ? 24 : 18} />
        </Button>
      )}

      <Button
        onClick={handleFavoriteToggle}
        variant='secondary'
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        className='!w-[44px] !h-[44px] md:!w-[52px] md:!h-[52px]'
      >
        {isFavorite ? (
          <HeartInlineIcon size={24} className='text-[#961200]' />
        ) : (
          <HeartOutlineIcon size={24} />
        )}
      </Button>

      {showToast && <Toast message={toastMessage} type='success' />}
    </div>
  );
};
