// src/features/shared/layout/Footer.tsx

import React from 'react';
import {
  EmailIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from '../ui/Icons';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className='max-w-[1160px] mx-auto w-full bg-black py-6 mt-10 md:mt-20 px-xl'>
      <div className=' mx-auto flex flex-col md:flex-row justify-center md:justify-between items-center gap-2'>
        <div className='flex gap-2 md:gap-4'>
          <Link
            href='https://github.com/nuribnuu'
            target='_blank'
            rel='noopener noreferrer'
            className='p-2 bg-neutral-25 rounded-md hover:bg-neutral-300 transition'
          >
            <GitHubIcon className='size-5 text-neutral-700' />
          </Link>
          <Link
            href='https://www.linkedin.com/in/muhammadnuribnuhubab/'
            target='_blank'
            rel='noopener noreferrer'
            className='p-2 bg-neutral-25 rounded-md hover:bg-neutral-300 transition'
          >
            <LinkedInIcon className='size-5 text-neutral-700' />
          </Link>
          <Link
            href='https://instagram.com/nuribnuu'
            target='_blank'
            rel='noopener noreferrer'
            className='p-2 bg-neutral-25 rounded-md hover:bg-neutral-300 transition'
          >
            <InstagramIcon className='size-5 text-neutral-700' />
          </Link>

          <Link
            href='https://wa.me/6285866473926'
            target='_blank'
            rel='noopener noreferrer'
            className='p-2 bg-neutral-25 rounded-md hover:bg-neutral-300 transition'
          >
            <WhatsAppIcon className='size-5 text-neutral-700' />
          </Link>
          <Link
            href='mailto:nuribnuu@gmail.com'
            target='_blank'
            rel='noopener noreferrer'
            className='p-2 bg-neutral-25 rounded-md hover:bg-neutral-300 transition'
          >
            <EmailIcon className='size-5 text-neutral-700' />
          </Link>
        </div>

        <small className='font-normal text-sm md:text-base text-neutral-25 text-center'>
          © {new Date().getFullYear()} findcinéma. All rights reserved.
        </small>
      </div>
    </footer>
  );
};
