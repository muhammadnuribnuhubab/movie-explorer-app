'use client';

import { useState } from 'react';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import {
  Button,
  HeartInlineIcon,
  HeartOutlineIcon,
  PlayIcon,
} from '../ui';
import { Toast } from '../ui/Toast';

interface MovieActionsProps {
  hasTrailer: boolean;
}

export const MovieActions: React.FC<MovieActionsProps> = ({
  hasTrailer = true,
}) => {
  const isMdUp = useMediaQuery('(min-width: 768px)');
  const [isFavorite, setIsFavorite] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const toggleFavorite = () => {
    const newFavorite = !isFavorite;
    setIsFavorite(newFavorite);
    setShowToast(true);
    setToastMessage(
      newFavorite
        ? 'Success Add to Favorites'
        : 'Success Remove from Favorites'
    );

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <>
      {hasTrailer && (
        <Button className='w-full md:!w-[220px] md:!h-[52px] md:!text-base gap-2'>
          Watch Trailer
          <PlayIcon size={isMdUp ? 24 : 18} />
        </Button>
      )}

      <Button
        onClick={toggleFavorite}
        variant='secondary'
        className='!w-[44px] !h-[44px] md:!w-[52px] md:!h-[52px]'
      >
        {isFavorite ? (
          <HeartInlineIcon size={24} className='text-[#961200]' />
        ) : (
          <HeartOutlineIcon size={24} />
        )}
      </Button>

      {showToast && (
        <Toast message={toastMessage} type='success' />
      )}
    </>
  );
};
