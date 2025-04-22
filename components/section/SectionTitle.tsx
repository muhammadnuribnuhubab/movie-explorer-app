interface SectionTitleProps {
  title: string;
}

export const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <h2 className='text-neutral-25 font-bold text-xl md:text-3xl'>{title}</h2>
  );
};
