import { useMediaQuery } from '@/hooks/useMediaQuery';
import { CalendarIcon } from '../ui/Icons';

type ReleaseDateProps = {
  date: string; // menerima tanggal dalam format string
};

export const ReleaseDate = ({ date }: ReleaseDateProps) => {
  const isMdUp = useMediaQuery('(min-width: 768px)');

  // Mengubah string tanggal ke format yang lebih mudah dibaca
  const formattedDate = new Date(date).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className='flex items-center gap-1 md:gap-2 text-white text-sm md:text-base'>
      <CalendarIcon size={isMdUp ? 24 : 20} />
      <span>{formattedDate}</span>
    </div>
  );
};
