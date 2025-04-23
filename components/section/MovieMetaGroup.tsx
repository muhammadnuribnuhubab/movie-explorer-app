import { useMediaQuery } from '@/hooks/useMediaQuery';
import { MovieMeta } from './MovieMeta';
import { HappyFaceIcon, StarInlineIcon, VideoIcon } from '../ui';

type MovieMetaGroupProps = {
  rating?: number;
  genres?: string[];
  age?: number;
};

export const MovieMetaGroup = ({ rating, genres, age }: MovieMetaGroupProps) => {
  const isMdUp = useMediaQuery('(min-width: 768px)');
  const iconSize = isMdUp ? 32 : 24;

  const metaData = [
    {
      icon: <StarInlineIcon size={iconSize} />,
      label: 'Rating',
      value: rating ?? 'N/A',  // Menampilkan rating jika ada, jika tidak ada tampilkan 'N/A'
      className: 'text-[#E4A802]',
    },
    {
      icon: <VideoIcon size={iconSize} />,
      label: 'Genre',
      value: genres?.join(', ') ?? 'Unknown',  // Gabungkan genre menjadi string jika ada
    },
    {
      icon: <HappyFaceIcon size={iconSize} />,
      label: 'Age Limit',
      value: age ? `${age}+` : 'N/A',  // Menampilkan batas usia jika ada, jika tidak ada tampilkan 'N/A'
    },
  ];

  return (
    <div className='w-full flex gap-4'>
      {metaData.map((item, index) => (
        <MovieMeta
          key={index}
          icon={item.icon}
          label={item.label}
          value={item.value}
          className={item.className}
        />
      ))}
    </div>
  );
};
