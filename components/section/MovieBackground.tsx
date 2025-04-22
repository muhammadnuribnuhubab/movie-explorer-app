import Image from 'next/image';

interface HeroBackgroundProps {
  src?: string;
  alt?: string;
}

export const MovieBackground = ({
  src = '/images/hero-banner.svg',
  alt = 'Hero Background',
}: HeroBackgroundProps) => {
  return (
    <div className='relative -z-10 inset-0 flex justify-center'>
      <div className='relative w-full max-w-[1440px] aspect-[393/392] md:aspect-[16/9]'>
        <Image
          src={src}
          alt={alt}
          fill
          priority
          className='object-cover object-top'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black/90' />
      </div>
    </div>
  );
};
