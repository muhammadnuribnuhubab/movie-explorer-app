import Link from 'next/link';
import React from 'react';

type LogoProps = {
  onClick?: () => void;
};

export const Logo: React.FC<LogoProps> = ({ onClick }) => {
  return (
    <Link href={'/'} onClick={onClick}>
      <span className='text-xl md:text-3xl font-bold underline text-neutral-25 hover:text-red-500 hover:scale-105 transition-all duration-300 ease-in-out inline-block'>
        findcinéma
      </span>
    </Link>
  );
};
