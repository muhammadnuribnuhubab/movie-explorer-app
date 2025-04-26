'use client';

import React, { useState, forwardRef } from 'react';
import { useRouter } from 'next/navigation';
import { RoundedCloseIcon, SearchIcon } from '../ui/Icons';

type SearchProps = {
  size: 'large' | 'small';
  className?: string;
  onSearch?: (value: string) => void;
  iconWidth?: string;
};

const Search = forwardRef<HTMLInputElement, SearchProps>(
  ({ size, onSearch, className = '', iconWidth = '24px' }, ref) => {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setQuery(value);
      onSearch?.(value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        router.push(`/search?q=${encodeURIComponent(query)}`);
      }
    };

    const clearSearch = () => {
      setQuery('');
      onSearch?.('');
      router.push('/search');
    };

    const isLarge = size === 'large';

    const inputClass = [
      'w-full',
      isLarge
        ? 'h-[56px] rounded-2xl body-text-md leading-[56px]'
        : 'h-[44px] rounded-xl body-text-sm leading-[44px]',
      'pl-5xl pr-5xl',
      'border border-neutral-800',
      'font-normal',
      query ? 'text-neutral-25' : 'text-neutral-700',
      'placeholder:text-neutral-700',
      'focus:outline-none',
      'transition-colors duration-150',
      'bg-[#0A0D1299]',
      'backdrop-blur-[40px]',
    ].join(' ');

    const iconSizeClass = isLarge ? 'size-6' : 'size-5';
    const iconPositionClass = 'absolute top-1/2 -translate-y-1/2';

    return (
      <div className={`relative flex items-center ${className}`}>
        <SearchIcon
          className={`left-lg ${iconPositionClass} ${iconSizeClass} text-neutral-700 pointer-events-none z-20`}
          style={{ width: iconWidth, height: iconWidth }}
        />

        <input
          ref={ref} // ✅ Pakai ref dari forwardRef
          type='text'
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder='Search Movie'
          className={inputClass}
        />

        {query && (
          <button
            type='button'
            onClick={clearSearch}
            className={`right-lg ${iconPositionClass}`}
          >
            <RoundedCloseIcon className={`${iconSizeClass} text-neutral-700`} />
          </button>
        )}
      </div>
    );
  }
);

Search.displayName = 'Search';

export { Search };
