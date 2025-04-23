import { CardCast } from '../card';
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
}

export const CastAndCrew = ({ cast, crew, count = 10 }: Props) => {
  const people = [...cast, ...crew].slice(0, count);
  return (
    <div className='flex flex-col gap-4 md:gap-6'>
      <SectionTitle title='Cast & Crew' />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {people.map((p) => (
          <CardCast
            key={`${'cast' in p ? 'cast-' : 'crew-'}${p.id}`}
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
