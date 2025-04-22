import { CardCast } from '../card';
import { SectionTitle } from './SectionTitle';

interface CastAndCrewProps {
  count?: number;
}

export const CastAndCrew = ({ count = 4 }: CastAndCrewProps) => {
  return (
    <div className='flex flex-col gap-4 md:gap-6'>
      <SectionTitle title='Cast & Crew' />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {Array.from({ length: count }).map((_, index) => (
          <CardCast key={index} />
        ))}
      </div>
    </div>
  );
};
