import { motion } from 'framer-motion';
import Image from 'next/image';

interface HeroBackgroundProps {
  src?: string;
  alt?: string;
}

export const MovieBackground = ({
  src = '',
  alt = 'Hero Background',
}: HeroBackgroundProps) => {
  return (
    <motion.div
      className='relative -z-10 inset-0 flex justify-center'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
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
    </motion.div>
  );
};
