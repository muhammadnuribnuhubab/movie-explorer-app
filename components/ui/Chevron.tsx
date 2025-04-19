// components/ui/chevron-element.tsx
import { Button } from './Button';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

interface ChevronButtonProps {
  onClick?: () => void;
}

const chevronButtonClass = '!w-[56px] !h-[56px]';

export function ChevronLeft({ onClick }: ChevronButtonProps) {
  return (
    <Button
      variant='secondary'
      onClick={onClick}
      className={chevronButtonClass}
    >
      <ChevronLeftIcon />
    </Button>
  );
}

export function ChevronRight({ onClick }: ChevronButtonProps) {
  return (
    <Button
      variant='secondary'
      onClick={onClick}
      className={chevronButtonClass}
    >
      <ChevronRightIcon />
    </Button>
  );
}
