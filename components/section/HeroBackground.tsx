import Image from 'next/image';

interface HeroBackgroundProps {
  src?: string;
  alt?: string;
}

export const HeroBackground = ({
  src = '/images/hero-banner.svg',
  alt = 'Hero Background',
}: HeroBackgroundProps) => {
  return (
    <div className='relative inset-0 -z-10 flex justify-center'>
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
