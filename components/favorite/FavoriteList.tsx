'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SectionTitle } from '../section';
import { Button } from '../ui';
import { FavoriteItem } from './FavoriteItem';
import { EmptyContent } from '../section/EmptyContent';
import { Toast } from '../ui/Toast';

const movieData = [
  {
    id: 1,
    title: 'Captain America: Brave New World',
    rating: 7.9,
    description:
      'After meeting with newly elected U.S. President Thaddeus Ross, Sam finds himself in the middle of an international incident.',
  },
  {
    id: 2,
    title: 'Batman Begins',
    rating: 8.3,
    description:
      'After the murder of his parents, billionaire playboy Bruce Wayne begins his journey to become Batman.',
  },
  {
    id: 3,
    title: 'Spider-Man: No Way Home',
    rating: 8.0,
    description:
      'With Spider-Man’s identity now revealed, Peter asks Doctor Strange for help, leading to unintended consequences.',
  },
  {
    id: 4,
    title: 'Iron Man 3',
    rating: 7.5,
    description:
      'Tony Stark faces a new threat, the Mandarin, and must confront his own insecurities while protecting those he loves.',
  },
  {
    id: 5,
    title: 'Thor: Ragnarok',
    rating: 7.9,
    description:
      'Thor must escape the gladiator arena and save Asgard from the destruction caused by his sister, Hela.',
  },
];

export const FavoriteList = () => {
  const [favorites, setFavorites] = useState<number[]>([1, 2, 3, 4, 5]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleRemoveFavorite = (id: number) => {
    setFavorites((prev) => prev.filter((favId) => favId !== id));
    setToastMessage('Successfully removed from favorites');

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
                imageSrc='/images/empty-content.svg'
              />
              <Link href={'/'}>
                <Button className='!h-[44px] md:!h-[52px] !w-[200px] md:!w-[300px] !text-base md:!text-lg'>
                  Explore Movies
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className='flex flex-col gap-8 md:gap-12'>
            {favorites.map((id, index) => {
              const movie = movieData.find((movie) => movie.id === id);
              return movie ? (
                <div key={id} className='flex flex-col gap-8 md:gap-12'>
                  <FavoriteItem
                    title={movie.title}
                    rating={movie.rating}
                    description={movie.description}
                    onRemove={() => handleRemoveFavorite(id)}
                  />
                  {index !== favorites.length - 1 && (
                    <hr className='text-neutral-800' />
                  )}
                </div>
              ) : null;
            })}
          </div>
        )}
      </div>

      {toastMessage && <Toast message={toastMessage} type='success' />}
    </section>
  );
};
