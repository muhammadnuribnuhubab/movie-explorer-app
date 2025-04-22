import Image from 'next/image';

interface EmptyContentProps {
  title?: string;
  description?: string;
}

export const EmptyContent = ({
  title = '',
  description = '',
}: EmptyContentProps) => {
  return (
    <div className='flex flex-col gap-3 items-center text-center'>
      <div className='relative w-[200px] h-[200px]'>
        <Image
          src='/images/empty-content.svg'
          alt='Empty favorites'
          fill
          className='object-contain'
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
