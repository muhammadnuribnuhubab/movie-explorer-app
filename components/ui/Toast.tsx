import { CheckIcon } from './Icons';

export const Toast: React.FC = () => {
  return (
    <div className='flex items-center justify-center w-[285px] gap-lg px-3xl py-lg rounded-2xl bg-[#00000040] font-semibold body-text-md text-white'>
      <CheckIcon />
      Success Add to Favorites
    </div>
  );
};
