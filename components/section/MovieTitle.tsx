type MovieTitleProps = {
  title?: string;
};

export const MovieTitle = ({
  title = 'Captain America: Brave New World',
}: MovieTitleProps) => {
  return (
    <h1 className='text-neutral-25 mb-1 font-bold text-xl md:text-5xl lg:text-[40px] md:mb-4'>
      {title}
    </h1>
  );
};
