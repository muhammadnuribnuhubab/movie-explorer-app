interface SectionTitleProps {
  title: string;
}

export const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <h2 className='font-bold text-2xl text-neutral-25 md:text-4xl'>{title}</h2>
  );
};
