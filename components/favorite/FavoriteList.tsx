'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SectionTitle } from '../section';
import { Button } from '../ui';
import { FavoriteItem } from './FavoriteItem';
import { EmptyContent } from '../section/EmptyContent';
import { Toast } from '../ui/Toast'; // tambahkan ini

export const FavoriteList = () => {
  const [favorites, setFavorites] = useState<number[]>([1, 2, 3, 4, 5]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleRemoveFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((favId) => favId !== id));
    setToastMessage('Success remove from favorite');

    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  return (
    <section className='relative pt-[70px] md:pt-[110px] px-xl max-w-[1160px] mx-auto'>
      <div className='flex flex-col gap-8 md:gap-12'>
        <SectionTitle title='Favorites' />

        {favorites.length === 0 ? (
          <div className='text-center justify-center items-center text-white text-lg md:text-xl py-16 flex flex-col mx-auto'>
            <div className='flex flex-col items-center justify-center gap-6'>
              <EmptyContent
                title='Data Empty'
                description="You don't have a favorite movie yet"
              />
              <Link href={'/'}>
                <Button className='!h-[44px] md:!h-[52px] !w-[200px] md:!w-[300px] !text-base md:!text-lg'>
                  Explore Movie
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-8 md:gap-12'>
            {favorites.map((id, index) => (
              <div key={id} className='flex flex-col gap-8 md:gap-12'>
                <FavoriteItem onRemove={() => handleRemoveFavorite(id)} />
                {index !== favorites.length - 1 && (
                  <hr className='text-neutral-800' />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Toast muncul jika ada pesan */}
      {toastMessage && <Toast message={toastMessage} type='success' />}
    </section>
  );
};
