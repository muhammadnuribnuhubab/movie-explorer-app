import Image from 'next/image';

export const CardCast = () => {
  return (
    <div className='flex items-center gap-lg'>
      <div className='w-[55px] md:w-[69px] h-[84px] md:h-[104px] radius-lg overflow-hidden bg-amber-600'>
        <Image
          src='/'
          alt='Anthony Mackie'
          width={69}
          height={104}
          className='w-full h-full object-cover'
        />
      </div>

      <div className='text-left'>
        <h3 className='font-semibold text-neutral-25 leading-[20px] text-[14px] md:text-[16px] mb-lg'>
          Anthony Mackie
        </h3>
        <p className='font-normal text-neutral-400 leading-[20px] text-[14px] md:text-[16px]'>
          Sam Wilson / Captain America
        </p>
      </div>
    </div>
  );
};
