import Image from 'next/image';
import { Rating } from '../ui/Rating';

type MovieCardProps = {
  imageUrl: string;
  title: string;
  rating: number;
  trendingIndex?: number;
};

export const MovieCard = ({
  imageUrl,
  title,
  rating,
  trendingIndex,
}: MovieCardProps) => {
  return (
    <div className='w-[173px] md:w-[216px]'>
      <div className='relative w-[173px] h-[266px] md:w-[216px] md:h-[321px] overflow-hidden rounded-md md:rounded-xl'>
        {typeof trendingIndex === 'number' && (
          <div className='absolute top-[8px] md:top-[12px] left-[8px] md:left-[12px] w-[32px] md:w-[48px] h-[32px] md:h-[48px] p-[4.57px] md:p-[6.86px] rounded-full flex items-center justify-center backdrop-blur-[22.85714340209961px] bg-[#0A0D1299]'>
            <span className='font-semibold text-[12px] md:text-[14px] leading-[16px] md:leading-[20px] text-neutral-25'>
              {trendingIndex}
            </span>
          </div>
        )}

        <Image
          src={imageUrl}
          alt={title}
          width={216}
          height={321}
          className='w-full h-full object-cover bg-amber-800'
        />
      </div>

      <div className='mt-2 text-left'>
        <h3 className='font-semibold body-text-md md:body-text-lg leading-[24px] text-neutral-25'>
          {title}
        </h3>

        <Rating rating={rating} />
      </div>
    </div>
  );
};
