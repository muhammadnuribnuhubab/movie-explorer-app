// components/favorite/FavoriteItem.tsx

import { Button } from '../ui/Button';
import { PlayIcon, HeartInlineIcon, HeartOutlineIcon } from '../ui/Icons';
import { Rating } from '../ui/Rating';
import Image from 'next/image';

// Tambahkan onClick ke interface props
export type FavoriteItemProps = {
  id: string;
  posterUrl: string;
  title: string;
  rating: number;
  description: string;
  trailerUrl?: string;
  onRemove?: () => void;
  onWatch?: () => void;
  onClick?: () => void; // ← Ditambahkan optional onClick
  isFavorite: boolean;
  onToggleFavorite: () => void;
};

export const FavoriteItem = ({
  title,
  rating,
  description,
  posterUrl,
  trailerUrl,
  onRemove,
  onWatch,
  isFavorite,
  onToggleFavorite,
  onClick, // ← Terima prop onClick
}: FavoriteItemProps) => {
  return (
    <div onClick={onClick} className='cursor-pointer md:max-w-[1160px]'>
      <div className='flex justify-between gap-[126px] items-center md:items-start'>
        <div className='flex justify-between items-center md:items-start gap-3xl'>
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

          <div className='flex flex-col justify-start text-left w-full md:max-w-[1772px]'>
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

            <div className='hidden md:flex justify-between items-center gap-xl mt-3xl'>
              {trailerUrl && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    onWatch?.();
                  }}
                  className='w-auto px-[29px]'
                >
                  Watch Trailer <PlayIcon size={24} />
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className='hidden md:flex items-start'>
          <Button
            variant='secondary'
            className='!w-[44px] !h-[44px]'
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
          >
            {isFavorite ? (
              <HeartInlineIcon
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite();
                }}
                size={16}
                className='text-[#E41D02]'
              />
            ) : (
              <HeartOutlineIcon
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite();
                }}
                size={16}
                className='text-neutral-400'
              />
            )}
          </Button>
        </div>
      </div>

      <div className='flex justify-between items-center gap-xl md:hidden mt-8'>
        {trailerUrl && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onWatch?.();
            }}
            className='w-full'
          >
            Watch Trailer <PlayIcon size={24} />
          </Button>
        )}
        <Button
          variant='secondary'
          className='!w-[44px] !h-[44px]'
          onClick={(e) => {
            e.stopPropagation();
            onRemove?.();
          }}
        >
          {isFavorite ? (
            <HeartInlineIcon
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite();
              }}
              size={16}
              className='text-[#E41D02]'
            />
          ) : (
            <HeartOutlineIcon
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite();
              }}
              size={16}
              className='text-neutral-400'
            />
          )}
        </Button>
      </div>
    </div>
  );
};
