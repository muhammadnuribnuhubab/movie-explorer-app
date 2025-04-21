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
    <div className='relative -z-10 inset-0 flex justify-center'>
      <div className='relative w-full aspect-[393/392] max-w-[1440px] md:aspect-[16/9]'>
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
