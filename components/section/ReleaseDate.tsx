import { CalendarIcon } from '../ui';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export const ReleaseDate = () => {
  const isMdUp = useMediaQuery('(min-width: 768px)');

  return (
    <div className='flex items-center gap-1 md:gap-2 text-white text-sm md:text-base'>
      <CalendarIcon size={isMdUp ? 24 : 20} />
      <span>12 Februari 2025</span>
    </div>
  );
};
