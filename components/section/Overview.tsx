import { SectionTitle } from './SectionTitle';

interface OverviewProps {
  description: string;
}

export const Overview = ({ description }: OverviewProps) => {
  return (
    <div className='flex flex-col gap-4 md:gap-6'>
      <SectionTitle title='Overview' />
      <p className='text-neutral-400 font-normal text-sm md:text-base'>
        {description}
      </p>
    </div>
  );
};
