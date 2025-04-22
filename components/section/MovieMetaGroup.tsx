import { useMediaQuery } from '@/hooks/useMediaQuery';
import { MovieMeta } from './MovieMeta';
import { HappyFaceIcon, StarInlineIcon, VideoIcon } from '../ui';

export const MovieMetaGroup = () => {
  const isMdUp = useMediaQuery('(min-width: 768px)');
  const iconSize = isMdUp ? 32 : 24;

  const metaData = [
    {
      icon: <StarInlineIcon size={iconSize} />,
      label: 'Rating',
      value: 6.2,
      className: 'text-[#E4A802]',
    },
    {
      icon: <VideoIcon size={iconSize} />,
      label: 'Genre',
      value: 'Action',
    },
    {
      icon: <HappyFaceIcon size={iconSize} />,
      label: 'Age Limit',
      value: 13,
    },
  ];

  return (
    <div className='hidden md:flex gap-4'>
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
