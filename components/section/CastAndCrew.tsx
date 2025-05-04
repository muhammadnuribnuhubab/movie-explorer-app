import { CardCast } from '../card/CastCard';
import { SectionTitle } from './SectionTitle';

interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path?: string;
}
interface Crew {
  id: number;
  name: string;
  job: string;
  profile_path?: string;
}
interface Props {
  cast: Cast[];
  crew: Crew[];
  count?: number;
  isLoading?: boolean;
}

export const CastAndCrew = ({
  cast,
  crew,
  count = 10,
  isLoading = false,
}: Props) => {
  const people = [...cast, ...crew].slice(0, count);

  return (
    <div className='flex flex-col gap-4 md:gap-6'>
      <SectionTitle title='Cast & Crew' />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {isLoading
          ? Array.from({ length: count }).map((_, i) => (
              <div
                key={`skeleton-${i}`}
                className='flex gap-4 animate-pulse p-4 bg-neutral-800 rounded-lg'
              >
                <div className='w-16 h-16 rounded-full bg-neutral-700' />
                <div className='flex flex-col justify-center gap-2 flex-1'>
                  <div className='w-3/4 h-4 bg-neutral-700 rounded' />
                  <div className='w-1/2 h-3 bg-neutral-600 rounded' />
                </div>
              </div>
            ))
          : people.map((p) => (
              <CardCast
                key={`${'character' in p ? 'cast-' : 'crew-'}${p.id}`}
                name={p.name}
                role={'character' in p ? p.character : p.job}
                imageUrl={
                  p.profile_path
                    ? `https://image.tmdb.org/t/p/w185${p.profile_path}`
                    : '/images/default-profile.png'
                }
              />
            ))}
      </div>
    </div>
  );
};
