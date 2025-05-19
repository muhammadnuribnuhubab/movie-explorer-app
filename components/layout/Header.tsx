'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from '../search';
import { SearchIcon, MenuIcon, ArrowLeftIcon, CloseIcon } from '../ui/Icons';

export const Header = () => {
  const [state, setState] = useState({
    showNav: false,
    isScrolled: false,
    isSearchActive: false,
    windowWidth: 0,
  });

  const router = useRouter();
  const pathname = usePathname();

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (state.showNav) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

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
        if (newWindowWidth >= 768 && prevState.isSearchActive) {
          return {
            ...prevState,
            isSearchActive: false,
            windowWidth: newWindowWidth,
          };
        }
        return { ...prevState, windowWidth: newWindowWidth };
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [state.isSearchActive]);

  const { showNav, isScrolled, isSearchActive, windowWidth } = state;

  const handleSearch = (value: string) => {
    router.push(`/search?q=${value}`);
  };

  const handleSearchIconClick = () => {
    if (windowWidth < 768) {
      setState((prevState) => ({ ...prevState, isSearchActive: true }));
    }
  };

  useEffect(() => {
    if (isSearchActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchActive]);

  const getNavLinkClass = (path: string) =>
    pathname === path ? 'text-red-500' : 'text-white';

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 60, damping: 20 }}
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
            <div className='flex items-baseline 3xl md:gap-5xl lg:gap-8xl'>
              <Logo />
              <nav className='hidden md:flex justify-between items-center gap-3xl lg:gap-7xl font-semibold text-xl'>
                <Link
                  href='/'
                  className={`${getNavLinkClass(
                    '/'
                  )} hover:text-red-500 transition-colors duration-200 ease-in-out`}
                >
                  Home
                </Link>
                <Link
                  href='/favorites'
                  onClick={() =>
                    sessionStorage.setItem('fromInternalNavigation', 'true')
                  }
                  className={`${getNavLinkClass(
                    '/favorites'
                  )} hover:text-red-500 transition-colors duration-200 ease-in-out`}
                >
                  Favorites
                </Link>
              </nav>
            </div>
            <div className='flex md:hidden items-center gap-3xl'>
              <SearchIcon
                size={24}
                className='text-white cursor-pointer'
                onClick={handleSearchIconClick}
              />
              <MenuIcon
                size={24}
                className='text-white cursor-pointer'
                onClick={() => setState({ ...state, showNav: true })}
              />
            </div>
          </div>
        )}

        <AnimatePresence>
          {isSearchActive && windowWidth < 768 && (
            <motion.div
              key='search-bar'
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.3 }}
              className='flex items-center w-full gap-4 z-30 relative md:hidden pt-0'
            >
              <button
                className='text-white cursor-pointer'
                onClick={() =>
                  setState((prev) => ({ ...prev, isSearchActive: false }))
                }
              >
                <ArrowLeftIcon size={24} />
              </button>
              <Search
                size='small'
                onSearch={handleSearch}
                className='!w-full'
                ref={inputRef}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className='hidden md:block'>
          <Search size='large' onSearch={handleSearch} />
        </div>
      </div>

      <AnimatePresence>
        {showNav && (
          <motion.div
            key='mobile-nav'
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 70, damping: 15 }}
            className='fixed inset-0 bg-black bg-opacity-90 z-[1000] px-xl py-[16px] text-white md:hidden'
          >
            <div className='flex justify-between items-center'>
              <Logo onClick={() => setState({ ...state, showNav: false })} />
              <button
                onClick={() => setState({ ...state, showNav: false })}
                className='text-white'
              >
                <CloseIcon size={28} />
              </button>
            </div>
            <nav className='mt-4xl ml-md text-xl gap-4xl font-normal flex flex-col items-start body-text-md'>
              <Link
                href='/'
                className={`${getNavLinkClass(
                  '/'
                )} hover:text-red-500 transition-colors duration-200 ease-in-out`}
                onClick={() => setState({ ...state, showNav: false })}
              >
                Home
              </Link>
              <Link
                href='/favorites'
                onClick={() => {
                  sessionStorage.setItem('fromInternalNavigation', 'true');
                  setState((prev) => ({ ...prev, showNav: false }));
                }}
                className={`${getNavLinkClass(
                  '/favorites'
                )} hover:text-red-500`}
              >
                Favorites
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
