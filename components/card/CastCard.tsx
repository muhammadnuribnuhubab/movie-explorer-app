import Image from 'next/image';

interface CardCastProps {
  name: string;
  role: string;
  imageUrl?: string;
}

export const CardCast = ({ name, role, imageUrl }: CardCastProps) => {
  const placeholder = '/images/default-profile.png';

  return (
    <div className='flex items-center gap-4 md:gap-6'>
      <div className='w-[55px] md:w-[69px] h-[84px] md:h-[104px] rounded-lg overflow-hidden bg-primary-300'>
        <div className='relative w-[55px] md:w-[69px] h-[84px] md:h-[104px] rounded-lg overflow-hidden bg-primary-300'>
          <Image
            src={imageUrl ?? placeholder}
            alt={name}
            fill
            sizes='(min-width: 768px) 69px, 55px'
            className='object-cover'
          />
        </div>
      </div>

      <div className='text-left'>
        <h3 className='font-semibold text-neutral-25 text-[14px] md:text-[16px] leading-[20px] mb-1'>
          {name}
        </h3>
        <p className='font-normal text-neutral-400 text-[14px] md:text-[16px] leading-[20px]'>
          {role}
        </p>
      </div>
    </div>
  );
};
