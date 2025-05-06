'use client';

import React, { useState, useEffect, useRef, forwardRef } from 'react';
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
    const lastQuery = useRef('');
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
    };

    const handleSearch = () => {
      const trimmedQuery = query.trim();
      if (trimmedQuery) {
        sessionStorage.setItem('searchQuery', trimmedQuery);
        sessionStorage.setItem('allowSearchAccess', 'true');
        sessionStorage.setItem('fromInternalNavigation', 'true');
        onSearch?.(trimmedQuery);
        router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
        lastQuery.current = trimmedQuery;
      }
    };

    const clearSearch = () => {
      setQuery('');
      lastQuery.current = '';
      onSearch?.('');
      sessionStorage.setItem('searchQuery', '');
      sessionStorage.setItem('allowSearchAccess', 'true');
      sessionStorage.setItem('fromInternalNavigation', 'true');
      router.push('/search');
    };

    useEffect(() => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }

      debounceTimer.current = setTimeout(() => {
        const trimmed = query.trim();
        if (trimmed && trimmed !== lastQuery.current) {
          sessionStorage.setItem('allowSearchAccess', 'true');
          sessionStorage.setItem('fromInternalNavigation', 'true');
          router.push(`/search?q=${encodeURIComponent(trimmed)}`);
          lastQuery.current = trimmed;
        }

        if (!trimmed && lastQuery.current) {
          router.push('/search');
          lastQuery.current = '';
        }
      }, 500); // delay 500ms

      return () => {
        if (debounceTimer.current) {
          clearTimeout(debounceTimer.current);
        }
      };
    }, [query, router]);

    const isLarge = size === 'large';

    const inputClass = [
      'w-full',
      isLarge
        ? 'h-[56px] rounded-2xl body-text-md leading-[56px]'
        : 'h-[44px] rounded-xl body-text-sm leading-[44px]',
      'pl-5xl pr-5xl',
      'border border-neutral-800',
      'font-normal',
      'text-neutral-25',
      'placeholder:text-neutral-25',
      'focus:outline-none',
      'transition-colors duration-150',
      'bg-[#0A0D1299]',
      'backdrop-blur-[40px]',
    ].join(' ');

    const iconSizeClass = isLarge ? 'size-6' : 'size-5';
    const iconPositionClass = 'absolute top-1/2 -translate-y-1/2';

    return (
      <div className={`relative flex items-center ${className}`}>
        <button
          type='button'
          onClick={handleSearch}
          className={`left-lg ${iconPositionClass} z-20`}
        >
          <SearchIcon
            className={`${iconSizeClass} text-neutral-25`}
            style={{ width: iconWidth, height: iconWidth }}
          />
        </button>
        <input
          ref={ref}
          type='text'
          value={query}
          onChange={handleChange}
          placeholder='Search Movie'
          className={inputClass}
        />
        {query && (
          <button
            type='button'
            onClick={clearSearch}
            className={`right-lg ${iconPositionClass}`}
          >
            <RoundedCloseIcon className={`${iconSizeClass} text-neutral-25`} />
          </button>
        )}
      </div>
    );
  }
);

Search.displayName = 'Search';

export { Search };
