import Image from 'next/image';

interface EmptyContentProps {
  title?: string;
  description?: string;
  imageSrc?: string;
}

export const EmptyContent = ({
  title = '',
  description = '',
  imageSrc = '/images/empty-content.svg',
}: EmptyContentProps) => {
  return (
    <div className='flex flex-col gap-3 items-center text-center'>
      <div className='relative w-[200px] h-[200px]'>
        <Image
          src={imageSrc}
          alt='Empty state'
          fill
          className='object-contain'
          unoptimized
        />
      </div>
      <div className='flex flex-col gap-2'>
        <h3 className='font-semibold text-base md:text-lg text-white'>
          {title}
        </h3>
        <span className='font-normal text-sm md:text-base text-neutral-400'>
          {description}
        </span>
      </div>
    </div>
  );
};
