// src/features/shared/widgets/ScrollButton.tsx

import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon } from '../ui/Icons';
import { Button } from '../ui/Button';

export const ScrollButton: React.FC = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isNearBottom, setIsNearBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const innerHeight = window.innerHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      setIsNearBottom(scrollY + innerHeight >= scrollHeight - 100);
      setIsAtBottom(scrollY + innerHeight >= scrollHeight - 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Button
      onClick={isAtBottom ? scrollToTop : scrollToBottom}
      className={`fixed right-4 2xl:right-auto 2xl:left-1/2 2xl:translate-x-[calc(590px-100%)] p-3 !size-16 rounded-full shadow-lg flex items-center justify-center z-50 transition-all duration-300 ${
        isNearBottom ? 'bottom-6 md:bottom-24' : 'bottom-6 md:bottom-10'
      }`}
      aria-label={isAtBottom ? 'Scroll to top' : 'Scroll to bottom'}
    >
      {isAtBottom ? (
        <ChevronLeftIcon className='rotate-90' />
      ) : (
        <ChevronLeftIcon className='rotate-270' />
      )}
    </Button>
  );
};