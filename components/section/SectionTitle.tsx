interface SectionTitleProps {
  title: string;
  className?: string;
}

export const SectionTitle = ({ title, className = '' }: SectionTitleProps) => {
  return (
    <h2 className={`text-neutral-25 font-bold text-xl md:text-3xl ${className}`}>{title}</h2>
  );
};
