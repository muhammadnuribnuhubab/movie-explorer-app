// components/favorite/FavoriteItem.tsx

import Link from 'next/link';
import { Button } from '../ui/Button';
import { PlayIcon, HeartInlineIcon, HeartOutlineIcon } from '../ui/Icons';
import { Rating } from '../ui/Rating';
import Image from 'next/image';

type FavoriteItemProps = {
  id: string;
  posterUrl: string;
  title: string;
  rating: number;
  description: string;
  trailerUrl?: string;
  onRemove?: () => void;
  onWatch?: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

export const FavoriteItem = ({
  id,
  title,
  rating,
  description,
  posterUrl,
  trailerUrl,
  onRemove,
  onWatch,
  isFavorite,
  onToggleFavorite,
}: FavoriteItemProps) => {
  return (
    <div className='md:max-w-[1160px] '>
      <div className='flex justify-between gap-[126px] items-center md:items-start'>
        <div className='flex justify-between items-center md:items-start gap-3xl'>
          {/* Kolom 1: Poster */}
          <Link href={`/detail/${id}`}>
            <div className='w-[104px] h-[156px] md:w-[182px] md:h-[270px] rounded-md md:rounded-xl overflow-hidden bg-primary-300 flex-shrink-0'>
              <Image
                src={posterUrl || '/images/placeholder.png'}
                alt={title}
                width={182}
                height={270}
                className='w-full h-full object-cover'
                unoptimized
              />
            </div>
          </Link>

          <Link href={`/detail/${id}`}>
            <div className='flex flex-col justify-start text-left w-full md:max-w-[1772px]'>
              <div className='flex flex-col gap-xs md:gap-lg'>
                <h2 className='font-bold text-[16px] md:text-[24px] text-neutral-25'>
                  {title}
                </h2>
                <Rating
                  rating={rating}
                  className='font-medium !md:text-[16px] !text-neutral-25'
                />
                <p className='font-normal text-[14px] md:text-[16px] text-neutral-400 line-clamp-2'>
                  {description}
                </p>
              </div>

              <div className='hidden md:flex justify-between items-center gap-xl mt-3xl'>
                {trailerUrl && (
                  <Button onClick={onWatch} className='w-auto px-[29px]'>
                    Watch Trailer <PlayIcon size={24} />
                  </Button>
                )}
              </div>
            </div>
          </Link>
        </div>

        <div className='hidden md:flex justify-center items-start w-[44px] h-[44px] text-right'>
          <Button
            variant='secondary'
            className='!w-[44px] !h-[44px]'
            onClick={onRemove}
          >
            {isFavorite ? (
              <HeartInlineIcon onClick={onToggleFavorite} size={16} className='text-[#E41D02]' />
            ) : (
              <HeartOutlineIcon onClick={onToggleFavorite} size={16} className='text-neutral-400' />
            )}
          </Button>
        </div>
      </div>

      <div className='flex justify-between items-center gap-xl md:hidden mt-8'>
        {trailerUrl && (
          <Button onClick={onWatch} className='w-full'>
            Watch Trailer <PlayIcon size={24} />
          </Button>
        )}
        <Button
          variant='secondary'
          className='!w-[44px] !h-[44px]'
          onClick={onRemove}
        >
          {isFavorite ? (
            <HeartInlineIcon onClick={onToggleFavorite} size={16} className='text-[#E41D02]' />
          ) : (
            <HeartOutlineIcon onClick={onToggleFavorite} size={16} className='text-neutral-400' />
          )}
        </Button>
      </div>
    </div>
  );
};
