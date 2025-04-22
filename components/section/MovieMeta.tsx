interface MovieMetaProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  className?: string;
}

export const MovieMeta = ({
  icon,
  label,
  value,
  className = '',
}: MovieMetaProps) => {
  return (
    <div className='w-full max-w-[276px] rounded-2xl border border-neutral-800 bg-black p-4 md:p-5 text-center text-neutral-25 flex flex-col items-center justify-center gap-2'>
      <div className={className}>{icon}</div>
      <div className='flex flex-col'>
        <span className='text-xs md:text-base font-normal text-neutral-300'>
          {label}
        </span>
        <span className='text-lg md:text-xl font-semibold text-neutral-25'>
          {value}
        </span>
      </div>
    </div>
  );
};
