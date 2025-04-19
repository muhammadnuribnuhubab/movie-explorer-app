'use client';

import { useState } from 'react';
import { MenuIcon, SearchIcon, CloseIcon } from '../ui/Icons';
import { Logo } from './Logo';
import { Search } from '../search/Search';

export const Header = () => {
  const [showNav, setShowNav] = useState(false);

  return (
    <div className='w-full'>
      <div className='flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-2xl px-xl max-w-[1160px] md:mx-auto py-[18px] md:py-[22px]'>
        <div className='flex justify-between items-center w-full md:w-auto'>
          <div className='flex items-center gap-8xl'>
            <Logo />

            <ul className='hidden md:flex justify-between items-center gap-7xl font-normal text-white'>
              <li>Home</li>
              <li>Favorites</li>
            </ul>
          </div>
          <div className='flex md:hidden items-center gap-3xl'>
            <SearchIcon size={24} className='text-white cursor-pointer' />
            <MenuIcon
              size={24}
              className='text-white cursor-pointer'
              onClick={() => setShowNav(true)}
            />
          </div>
        </div>

        <div className='hidden md:block'>
          <Search size='large' />
        </div>
      </div>

      {showNav && (
        <div className='fixed inset-0 bg-black bg-opacity-90 z-50 px-xl py-[18px] text-white'>
          <div className='flex justify-between'>
            <Logo />
            <button onClick={() => setShowNav(false)} className='text-white'>
              <CloseIcon size={28} />
            </button>
          </div>
          <nav className='mt-4xl ml-md text-xl gap-4xl font-normal flex flex-col items-start body-text-md'>
            <a href='#' onClick={() => setShowNav(false)}>
              Home
            </a>
            <a href='#' onClick={() => setShowNav(false)}>
              Favorites
            </a>
          </nav>
        </div>
      )}
    </div>
  );
};
