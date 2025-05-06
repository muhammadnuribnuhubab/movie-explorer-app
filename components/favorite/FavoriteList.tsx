'use client';

import { FavoriteItem } from '../favorite/FavoriteItem';
import { EmptyContent } from '../section/EmptyContent';
import { Button } from '../ui/Button';
import Link from 'next/link';
import { SectionTitle } from '../section/SectionTitle';
import { Toast } from '../ui/Toast';
import { useFavorites } from '@/contexts/FavoriteContext';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation'; // ← pakai useRouter dari app router

export const FavoriteList = () => {
  const { favoriteMovies, removeFavorite } = useFavorites();
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const router = useRouter(); // ← init router

  const isFavorite = (id: string) =>
    favoriteMovies.some((fav) => fav.id === id);

  const handleRemove = (id: string) => {
    removeFavorite(id);
    setToastMessage('Removed from favorites');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleWatch = (url?: string) => {
    if (url) window.open(url, '_blank', 'noopener');
  };

  // ← navigasi ke detail dengan flag internal
  const handleClick = (id: string) => {
    sessionStorage.setItem('fromInternalNavigation', 'true');
    router.push(`/detail/${id}`);
  };

  return (
    <section className='pt-[70px] md:pt-[110px] px-xl max-w-[1160px] mx-auto'>
      <SectionTitle title='Favorites' className='mb-6 md:mb-8' />

      {favoriteMovies.length === 0 ? (
        <div className='text-center text-white py-16'>
          <EmptyContent
            title='Data Empty'
            description="You don't have a favorite movie yet"
            imageSrc='/images/empty-content.svg'
          />
          <Link href='/'>
            <Button className='mt-6 !h-[52px] !w-[300px]'>
              Explore Movies
            </Button>
          </Link>
        </div>
      ) : (
        <motion.div
          className='flex flex-col gap-8'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {favoriteMovies.map((movie) => (
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
                description={movie.description}
                posterUrl={movie.posterUrl}
                trailerUrl={movie.trailerUrl}
                onWatch={() => handleWatch(movie.trailerUrl)}
                onRemove={() => handleRemove(movie.id)}
                isFavorite={isFavorite(movie.id)}
                onToggleFavorite={() => {}}
                onClick={() => handleClick(movie.id)} // ← tambahkan prop onClick
              />
            </motion.div>
          ))}
        </motion.div>
      )}

      {toastMessage && <Toast message={toastMessage} type='success' />}
    </section>
  );
};
