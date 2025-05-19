'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface HeroBackgroundProps {
  src?: string;
  alt?: string;
  onLoadingComplete?: () => void;
}

export const MovieBackground = ({
  src = '',
  alt = 'Hero Background',
  onLoadingComplete,
}: HeroBackgroundProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleComplete = () => {
    setIsLoaded(true);
    onLoadingComplete?.();
  };

  return (
    <motion.div
      className='relative -z-10 inset-0 flex justify-center'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
    >
      <div className='relative w-full  aspect-[393/392] md:aspect-[16/9]'>
        {/* Skeleton Loading */}
        {!isLoaded && (
          <div className='absolute inset-0 bg-neutral-800 animate-pulse rounded-md' />
        )}

        {/* Background Image */}
        <Image
          src={src}
          alt={alt}
          fill
          priority
          onLoadingComplete={handleComplete}
          className={`object-cover object-top transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          unoptimized
        />

        {/* Overlay Gradient */}
        <motion.div
          className='absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black'
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
};
