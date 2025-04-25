'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { ArrowLeftIcon, CloseIcon, MenuIcon, SearchIcon } from '../ui';
import { Search } from '../search';
import { useRouter } from 'next/navigation';

export const Header = () => {
  const [state, setState] = useState({
    showNav: false,
    isScrolled: false,
    isSearchActive: false,
    windowWidth: 0,
  });

  const [query, setQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (state.showNav) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    // Clean up saat komponen unmount (opsional, tapi bagus)
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [state.showNav]);

  useEffect(() => {
    const handleScroll = () => {
      setState((prevState) => ({
        ...prevState,
        isScrolled: window.scrollY > 0,
      }));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const newWindowWidth = window.innerWidth;
      setState((prevState) => {
        if (newWindowWidth >= 578 && prevState.isSearchActive) {
          return { ...prevState, isSearchActive: false };
        }
        return { ...prevState, windowWidth: newWindowWidth };
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [state.isSearchActive]);

  const { showNav, isScrolled, isSearchActive } = state;

  const handleSearch = (value: string) => {
    setQuery(value);
    router.push(`/search?q=${value}`);
  };

  return (
    <header
      className={`w-full fixed top-0 left-0 z-30 transition-colors duration-300 ${
        showNav
          ? 'bg-black'
          : isScrolled
          ? 'bg-[#0A0D1299] backdrop-blur-[40px]'
          : ''
      }`}
    >
      <div className='flex flex-col md:flex-row justify-between items-center gap-2xl px-xl max-w-[1160px] md:mx-auto py-[18px] md:py-[22px]'>
        {!isSearchActive && (
          <div className='flex justify-between items-center w-full md:w-auto'>
            <div className='flex items-center 3xl md:gap-5xl lg:gap-8xl'>
              <Logo />
              <nav
                className='hidden md:flex justify-between items-center gap-3xl lg:gap-7xl font-normal text-white'
                role='navigation'
                aria-label='Main navigation'
              >
                <Link href='/'>Home</Link>
                <Link href='/favorites'>Favorites</Link>
              </nav>
            </div>

            <div className='flex md:hidden items-center gap-3xl'>
              <SearchIcon
                size={24}
                className='text-white cursor-pointer'
                onClick={() => setState({ ...state, isSearchActive: true })}
              />
              <MenuIcon
                size={24}
                className='text-white cursor-pointer'
                onClick={() => setState({ ...state, showNav: true })}
              />
            </div>
          </div>
        )}

        {isSearchActive && (
          <div className='flex items-center w-full gap-4 z-30 relative md:hidden pt-0'>
            <button
              className='text-white cursor-pointer'
              onClick={() => setState({ ...state, isSearchActive: false })}
            >
              <ArrowLeftIcon size={24} />
            </button>
            <Search size='small' onSearch={handleSearch} className='!w-full' />
          </div>
        )}

        <div className='hidden md:block'>
          <Search size='large' onSearch={handleSearch} />
        </div>
      </div>

      {showNav && (
        <div className='fixed inset-0 bg-black bg-opacity-90 z-50 px-xl py-[16px] text-white md:hidden'>
          <div className='flex justify-between items-center'>
            <Logo onClick={() => setState({ ...state, showNav: false })} />
            <button
              onClick={() => setState({ ...state, showNav: false })}
              className='text-white'
            >
              <CloseIcon size={28} />
            </button>
          </div>
          <nav
            className='mt-4xl ml-md text-xl gap-4xl font-normal flex flex-col items-start body-text-md'
            role='navigation'
            aria-label='Mobile navigation'
          >
            <Link
              href='/'
              onClick={() => setState({ ...state, showNav: false })}
            >
              Home
            </Link>
            <Link
              href='/favorites'
              onClick={() => setState({ ...state, showNav: false })}
            >
              Favorites
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};
