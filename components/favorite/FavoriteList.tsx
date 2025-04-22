import Image from 'next/image';
import { Button } from '../ui/Button';
import { PlayIcon, HeartInlineIcon } from '../ui/Icons';
import { Rating } from '../ui/Rating';

export const FavoriteList = () => {
  return (
    <div className='space-y-3xl md:max-w-[1160px]'>
      <div className='flex items-center md:items-start justify-between gap-[126px]'>
        <div className='flex items-center md:items-start justify-between gap-2xl md:gap-3xl'>
          <div className='flex-shrink-0 w-[104px] h-[156px] md:w-[182px] md:h-[270px] rounded-md md:rounded-xl overflow-hidden bg-amber-600'>
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
              <h2 className='text-[16px] md:text-[24px] font-bold text-neutral-25'>
                Captain America: Brave New World
              </h2>

              <Rating
                rating={7.9}
                className='font-medium !text-neutral-25 !md:text-[16px]'
              />

              <p className='text-[14px] md:text-[16px] font-normal text-neutral-400 line-clamp-2'>
                After meeting with newly elected U.S. President Thaddeus Ross,
                Sam finds himself in the middle of an international incident.
                This description is too long and will be cut if it exceeds the
                image height.
              </p>
            </div>

            <div className='hidden md:flex items-center justify-between gap-xl mt-3xl'>
              <Button className='w-auto px-[29px]' size='lg'>
                Watch Trailer <PlayIcon size={24} />
              </Button>
            </div>
          </div>
        </div>

        <div className='hidden md:flex items-start justify-center w-[44px] h-[44px] bg-neutral-700 text-right'>
          <Button variant='secondary' className='!w-[44px] !h-[44px]'>
            <HeartInlineIcon size={16} className='text-[#E41D02]' />
          </Button>
        </div>
      </div>

      <div className='flex md:hidden items-center justify-between gap-xl'>
        <Button className='w-full'>
          Watch Trailer <PlayIcon size={18} />
        </Button>

        <Button variant='secondary' className='!w-[44px] !h-[44px]'>
          <HeartInlineIcon size={16} className='text-[#E41D02]' />
        </Button>
      </div>
    </div>
  );
};
