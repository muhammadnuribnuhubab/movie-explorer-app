'use client';

import React, { useState } from 'react';
import { RoundedCloseIcon, SearchIcon } from '../ui/Icons';

type SearchProps = {
  size: 'large' | 'small';
};

export const Search: React.FC<SearchProps> = ({ size }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const isLarge = size === 'large';

  const inputClass = [
    'w-[243px]',
    isLarge
      ? 'h-[56px] rounded-2xl body-text-md leading-[56px]'
      : 'h-[44px] rounded-xl body-text-sm leading-[44px]',
    'pl-5xl pr-5xl',
    'border border-neutral-800',
    'bg-[#0A0D1299]',
    'backdrop-blur-[40px]',
    'font-normal',
    query ? 'text-neutral-25' : 'text-neutral-700',
    'placeholder:text-neutral-700',
    'focus:outline-none',
    'transition-colors duration-150',
  ].join(' ');

  const iconSizeClass = isLarge ? 'size-6' : 'size-5';
  const iconPositionClass = 'absolute top-1/2 -translate-y-1/2';

  return (
    <div className='relative flex items-center'>
      <SearchIcon
        className={`left-lg ${iconPositionClass} ${iconSizeClass} text-neutral-700 pointer-events-none z-1`}
      />

      <input
        type='text'
        value={query}
        onChange={handleChange}
        placeholder='Search Movie'
        className={inputClass}
      />

      {query && (
        <button
          type='button'
          onClick={() => setQuery('')}
          className={`right-lg ${iconPositionClass}`}
        >
          <RoundedCloseIcon className={`${iconSizeClass} text-neutral-700`} />
        </button>
      )}
    </div>
  );
};
