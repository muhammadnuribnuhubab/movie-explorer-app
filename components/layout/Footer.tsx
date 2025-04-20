import { Logo } from './Logo';

export const Footer = () => {
  return (
    <footer className='w-full bg-black'>
      <div className='flex flex-col md:flex-row justify-start md:justify-between items-start md:items-center gap-8 px-6 py-8 md:py-12 max-w-[1160px] md:mx-auto'>
        <Logo />
        <p className='text-xs md:text-md font-normal text-left text-neutral-600'>
          Copyright ©2025 Movie Explorer
        </p>
      </div>
    </footer>
  );
};
