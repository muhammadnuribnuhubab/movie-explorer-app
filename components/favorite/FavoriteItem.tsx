import { Button } from '../ui/Button';
import { PlayIcon, HeartInlineIcon } from '../ui/Icons';
import { Rating } from '../ui/Rating';
import Image from 'next/image';

type FavoriteItemProps = {
  onRemove?: () => void;
};

export const FavoriteItem = ({ onRemove }: FavoriteItemProps) => {
  return (
    <div className='md:max-w-[1160px] space-y-3xl'>
      <div className='flex justify-between gap-[126px] items-center md:items-start'>
        <div className='flex justify-between items-center md:items-start gap-2xl md:gap-3xl'>
          {/* Kolom 1: Poster */}
          <div className='w-[104px] h-[156px] md:w-[182px] md:h-[270px] rounded-md md:rounded-xl overflow-hidden bg-amber-600 flex-shrink-0'>
            <Image
              src='/poster.jpg'
              alt='Captain America: Brave New World'
              width={182}
              height={270}
              className='w-full h-full object-cover'
            />
          </div>

          <div className='flex flex-col justify-start text-left w-full md:max-w-[1772px]'>
            <div className='flex flex-col gap-xs md:gap-lg'>
              <h2 className='font-bold text-[16px] md:text-[24px] text-neutral-25'>
                Captain America: Brave New World
              </h2>
              <Rating
                rating={7.9}
                className='font-medium !md:text-[16px] !text-neutral-25'
              />
              <p className='font-normal text-[14px] md:text-[16px] text-neutral-400 line-clamp-2'>
                After meeting with newly elected U.S. President Thaddeus Ross,
                Sam finds himself in the middle of an international incident.
                This description is too long and will be cut if it exceeds the
                image height.
              </p>
            </div>

            <div className='hidden md:flex justify-between items-center gap-xl mt-3xl'>
              <Button className='w-auto px-[29px]' size={'lg'}>
                Watch Trailer <PlayIcon size={24} />
              </Button>
            </div>
          </div>
        </div>

        <div className='hidden md:flex justify-center items-start w-[44px] h-[44px] text-right'>
          <Button
            variant='secondary'
            className='!w-[44px] !h-[44px]'
            onClick={onRemove}
          >
            <HeartInlineIcon size={16} className='text-[#E41D02]' />
          </Button>
        </div>
      </div>

      <div className='flex justify-between items-center gap-xl md:hidden'>
        <Button className='w-full'>
          Watch Trailer <PlayIcon size={18} />
        </Button>
        <Button
          variant='secondary'
          className='!w-[44px] !h-[44px]'
          onClick={onRemove}
        >
          <HeartInlineIcon size={16} className='text-[#E41D02]' />
        </Button>
      </div>
    </div>
  );
};
