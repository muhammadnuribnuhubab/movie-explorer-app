import { StarInlineIcon } from './Icons'; // Pastikan import ini sesuai dengan lokasi Icon kamu

interface RatingProps {
  rating: number | string;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({ rating, className }) => {
  return (
    <div className={`flex items-center gap-xs mt-1`}>
      <StarInlineIcon size={16} fill='#E4A802' color='#E4A802' />
      <span className={`text-[14px] md:text-[18px] text-neutral-400 ${className}`}>
        {rating}/10
      </span>
    </div>
  );
};
