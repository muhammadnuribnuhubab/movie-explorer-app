import React, { useMemo } from 'react';

export type IconProps = React.SVGProps<SVGSVGElement> & {
  /** both width and height; defaults to 24 */
  size?: number | string;
};

export const CalendarIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M8 2V5'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeMiterlimit='10'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M16 2V5'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeMiterlimit='10'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M3.5 9.09009H20.5'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeMiterlimit='10'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeMiterlimit='10'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M15.6947 13.7H15.7037'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M15.6947 16.7H15.7037'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M11.9955 13.7H12.0045'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M11.9955 16.7H12.0045'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M8.29431 13.7H8.30329'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
    <path
      d='M8.29431 16.7H8.30329'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export const SearchIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M21 21L17 17M19 11C19 13.1217 18.1571 15.1566 16.6569 16.6569C15.1566 18.1571 13.1217 19 11 19C8.87827 19 6.84344 18.1571 5.34315 16.6569C3.84285 15.1566 3 13.1217 3 11C3 8.87827 3.84285 6.84344 5.34315 5.34315C6.84344 3.84285 8.87827 3 11 3C13.1217 3 15.1566 3.84285 16.6569 5.34315C18.1571 6.84344 19 8.87827 19 11Z'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeMiterlimit='10'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export const HappyFaceIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM8.5 6.38C9.53 6.38 10.38 7.22 10.38 8.26C10.38 9.3 9.54 10.14 8.5 10.14C7.46 10.14 6.62 9.28 6.62 8.25C6.62 7.22 7.47 6.38 8.5 6.38ZM12 19.08C9.31 19.08 7.12 16.89 7.12 14.2C7.12 13.5 7.69 12.92 8.39 12.92H15.59C16.29 12.92 16.86 13.49 16.86 14.2C16.88 16.89 14.69 19.08 12 19.08ZM15.5 10.12C14.47 10.12 13.62 9.28 13.62 8.24C13.62 7.2 14.46 6.36 15.5 6.36C16.54 6.36 17.38 7.2 17.38 8.24C17.38 9.28 16.53 10.12 15.5 10.12Z'
      fill='currentColor'
    />
  </svg>
);

export const CloseIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M18 6L6 18M6 6L18 18'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export const StarOutlineIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M13.73 3.51014L15.49 7.03014C15.73 7.52014 16.37 7.99014 16.91 8.08014L20.1 8.61014C22.14 8.95014 22.62 10.4301 21.15 11.8901L18.67 14.3701C18.25 14.7901 18.02 15.6001 18.15 16.1801L18.86 19.2501C19.42 21.6801 18.13 22.6201 15.98 21.3501L12.99 19.5801C12.45 19.2601 11.56 19.2601 11.01 19.5801L8.02003 21.3501C5.88003 22.6201 4.58003 21.6701 5.14003 19.2501L5.85003 16.1801C5.98003 15.6001 5.75003 14.7901 5.33003 14.3701L2.85003 11.8901C1.39003 10.4301 1.86003 8.95014 3.90003 8.61014L7.09003 8.08014C7.62003 7.99014 8.26003 7.52014 8.50003 7.03014L10.26 3.51014C11.22 1.60014 12.78 1.60014 13.73 3.51014Z'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export const StarInlineIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M10.9718 2.70846C11.4382 1.93348 12.5618 1.93348 13.0282 2.70847L15.3586 6.58087C15.5262 6.85928 15.7995 7.05784 16.116 7.13116L20.5191 8.15091C21.4002 8.35499 21.7474 9.42356 21.1545 10.1066L18.1918 13.5196C17.9788 13.765 17.8744 14.0863 17.9025 14.41L18.2932 18.9127C18.3714 19.8138 17.4625 20.4742 16.6296 20.1214L12.4681 18.3583C12.1689 18.2316 11.8311 18.2316 11.5319 18.3583L7.37038 20.1214C6.53754 20.4742 5.62856 19.8138 5.70677 18.9127L6.09754 14.41C6.12563 14.0863 6.02124 13.765 5.80823 13.5196L2.8455 10.1066C2.25257 9.42356 2.59977 8.35499 3.48095 8.15091L7.88397 7.13116C8.20053 7.05784 8.47383 6.85928 8.64138 6.58087L10.9718 2.70846Z'
      fill='currentColor'
      stroke='currentColor'
      strokeWidth='1.5'
    />
  </svg>
);

export const VideoIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M21.15 6.17C20.74 5.95 19.88 5.72 18.71 6.54L17.24 7.58C17.13 4.47 15.78 3.25 12.5 3.25H6.5C3.08 3.25 1.75 4.58 1.75 8V16C1.75 18.3 3 20.75 6.5 20.75H12.5C15.78 20.75 17.13 19.53 17.24 16.42L18.71 17.46C19.33 17.9 19.87 18.04 20.3 18.04C20.67 18.04 20.96 17.93 21.15 17.83C21.56 17.62 22.25 17.05 22.25 15.62V8.38C22.25 6.95 21.56 6.38 21.15 6.17ZM11 11.38C9.97 11.38 9.12 10.54 9.12 9.5C9.12 8.46 9.97 7.62 11 7.62C12.03 7.62 12.88 8.46 12.88 9.5C12.88 10.54 12.03 11.38 11 11.38Z'
      fill='currentColor'
    />
  </svg>
);

export const ChevronUpIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M17 14L12 9L7 14'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export const CheckIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <mask
      id='mask0_22419_4066'
      style={{ maskType: 'luminance' }}
      maskUnits='userSpaceOnUse'
      x='1'
      y='1'
      width='22'
      height='22'
    >
      <path
        d='M12 22C13.3135 22.0016 14.6143 21.7437 15.8278 21.2411C17.0412 20.7384 18.1434 20.0009 19.071 19.071C20.0009 18.1434 20.7384 17.0412 21.2411 15.8278C21.7437 14.6143 22.0016 13.3135 22 12C22.0016 10.6866 21.7437 9.38572 21.2411 8.17225C20.7384 6.95878 20.0009 5.85659 19.071 4.92901C18.1434 3.99909 17.0412 3.26162 15.8278 2.75897C14.6143 2.25631 13.3135 1.99839 12 2.00001C10.6866 1.99839 9.38572 2.25631 8.17225 2.75897C6.95878 3.26162 5.85659 3.99909 4.92901 4.92901C3.99909 5.85659 3.26162 6.95878 2.75897 8.17225C2.25631 9.38572 1.99839 10.6866 2.00001 12C1.99839 13.3135 2.25631 14.6143 2.75897 15.8278C3.26162 17.0412 3.99909 18.1434 4.92901 19.071C5.85659 20.0009 6.95878 20.7384 8.17225 21.2411C9.38572 21.7437 10.6866 22.0016 12 22Z'
        fill='white'
        stroke='white'
        strokeWidth='2'
        strokeLinejoin='round'
      />
      <path
        d='M8 12L11 15L17 9'
        stroke='black'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </mask>
    <g mask='url(#mask0_22419_4066)'>
      <path d='M0 0H24V24H0V0Z' fill='currentColor' />
    </g>
  </svg>
);

export const PlayIcon = ({ size = 24, ...props }: IconProps) => {
  const uniqueId = useMemo(
    () => 'mask-' + Math.random().toString(36).substr(2, 9),
    []
  );

  return (
    <svg
      {...props}
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <mask
        id={uniqueId}
        style={{ maskType: 'luminance' }}
        maskUnits='userSpaceOnUse'
        x='1'
        y='1'
        width='22'
        height='22'
      >
        <path
          d='M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z'
          fill='white'
          stroke='white'
          strokeWidth='2'
          strokeLinejoin='round'
        />
        <path
          d='M10 12.0001V8.53613L13 10.2681L16 12.0001L13 13.7321L10 15.4641V12.0001Z'
          fill='black'
          stroke='black'
          strokeWidth='2'
          strokeLinejoin='round'
        />
      </mask>
      <g mask={`url(#${uniqueId})`}>
        <path d='M0 0H24V24H0V0Z' fill='currentColor' />
      </g>
    </svg>
  );
};

export const MenuIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M21 7.75H3C2.59 7.75 2.25 7.41 2.25 7C2.25 6.59 2.59 6.25 3 6.25H21C21.41 6.25 21.75 6.59 21.75 7C21.75 7.41 21.41 7.75 21 7.75Z'
      fill='currentColor'
    />
    <path
      d='M21 12.75H3C2.59 12.75 2.25 12.41 2.25 12C2.25 11.59 2.59 11.25 3 11.25H21C21.41 11.25 21.75 11.59 21.75 12C21.75 12.41 21.41 12.75 21 12.75Z'
      fill='currentColor'
    />
    <path
      d='M21 17.75H3C2.59 17.75 2.25 17.41 2.25 17C2.25 16.59 2.59 16.25 3 16.25H21C21.41 16.25 21.75 16.59 21.75 17C21.75 17.41 21.41 17.75 21 17.75Z'
      fill='currentColor'
    />
  </svg>
);

export const HeartOutlineIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M12.62 20.8101C12.28 20.9301 11.72 20.9301 11.38 20.8101C8.48 19.8201 2 15.6901 2 8.6901C2 5.6001 4.49 3.1001 7.56 3.1001C9.38 3.1001 10.99 3.9801 12 5.3401C13.01 3.9801 14.63 3.1001 16.44 3.1001C19.51 3.1001 22 5.6001 22 8.6901C22 15.6901 15.52 19.8201 12.62 20.8101Z'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export const ArrowLeftIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M9.56994 18.8201C9.37994 18.8201 9.18994 18.7501 9.03994 18.6001L2.96994 12.5301C2.67994 12.2401 2.67994 11.7601 2.96994 11.4701L9.03994 5.40012C9.32994 5.11012 9.80994 5.11012 10.0999 5.40012C10.3899 5.69012 10.3899 6.17012 10.0999 6.46012L4.55994 12.0001L10.0999 17.5401C10.3899 17.8301 10.3899 18.3101 10.0999 18.6001C9.95994 18.7501 9.75994 18.8201 9.56994 18.8201Z'
      fill='currentColor'
    />
    <path
      d='M20.5 12.75H3.67004C3.26004 12.75 2.92004 12.41 2.92004 12C2.92004 11.59 3.26004 11.25 3.67004 11.25H20.5C20.91 11.25 21.25 11.59 21.25 12C21.25 12.41 20.91 12.75 20.5 12.75Z'
      fill='currentColor'
    />
  </svg>
);

export const RoundedCloseIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <mask
      id='mask0_22419_3266'
      style={{ maskType: 'luminance' }}
      maskUnits='userSpaceOnUse'
      x='1'
      y='1'
      width='22'
      height='22'
    >
      <path
        d='M12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22Z'
        fill='white'
        stroke='white'
        strokeWidth='2'
        strokeLinejoin='round'
      />
      <path
        d='M14.8285 9.17139L9.17151 14.8284M9.17151 9.17139L14.8285 14.8284'
        stroke='black'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </mask>
    <g mask='url(#mask0_22419_3266)'>
      <rect width={size} height={size} fill='currentColor' />
    </g>
  </svg>
);

export const HeartInlineIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M16.44 3.1001C14.63 3.1001 13.01 3.9801 12 5.3301C10.99 3.9801 9.37 3.1001 7.56 3.1001C4.49 3.1001 2 5.6001 2 8.6901C2 9.8801 2.19 10.9801 2.52 12.0001C4.1 17.0001 8.97 19.9901 11.38 20.8101C11.72 20.9301 12.28 20.9301 12.62 20.8101C15.03 19.9901 19.9 17.0001 21.48 12.0001C21.81 10.9801 22 9.8801 22 8.6901C22 5.6001 19.51 3.1001 16.44 3.1001Z'
      fill='currentColor'
    />
  </svg>
);

export const ChevronLeftIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox='0 0 28 28'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M16.3333 8.16683L10.5 14.0002L16.3333 19.8335'
      stroke='currentColor'
      strokeWidth='2.33333'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export const ChevronRightIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox='0 0 28 28'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M11.6667 19.8332L17.5 13.9998L11.6667 8.1665'
      stroke='currentColor'
      strokeWidth='2.33333'
      strokeLinecap='round'
      strokeLinejoin='round'
    />
  </svg>
);

export const GitHubIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    {...props}
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4' />
    <path d='M9 18c-4.51 2-5-2-7-2' />
  </svg>
);

export const LinkedInIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    {...props}
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z' />
    <rect width='4' height='12' x='2' y='9' />
    <circle cx='4' cy='4' r='2' />
  </svg>
);

export const InstagramIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    {...props}
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <rect width='20' height='20' x='2' y='2' rx='5' ry='5' />
    <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
    <line x1='17.5' x2='17.51' y1='6.5' y2='6.5' />
  </svg>
);

export const EmailIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    {...props}
    width={size}
    height={size}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
  >
    <path d='m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7' />
    <rect x='2' y='4' width='20' height='16' rx='2' />
  </svg>
);

export const WhatsAppIcon = ({ size = 24, ...props }: IconProps) => (
  <svg
    {...props}
    width={size}
    height={size}
    viewBox='0 0 48 48'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M0 48L3.374 35.674C1.292 32.066 0.198 27.976 0.2 23.782C0.206 10.67 10.876 0 23.986 0C30.348 0.002 36.32 2.48 40.812 6.976C45.302 11.472 47.774 17.448 47.772 23.804C47.766 36.918 37.096 47.588 23.986 47.588C20.006 47.586 16.084 46.588 12.61 44.692L0 48ZM13.194 40.386C16.546 42.376 19.746 43.568 23.978 43.57C34.874 43.57 43.75 34.702 43.756 23.8C43.76 12.876 34.926 4.02 23.994 4.016C13.09 4.016 4.22 12.884 4.216 23.784C4.214 28.234 5.518 31.566 7.708 35.052L5.71 42.348L13.194 40.386ZM35.968 29.458C35.82 29.21 35.424 29.062 34.828 28.764C34.234 28.466 31.312 27.028 30.766 26.83C30.222 26.632 29.826 26.532 29.428 27.128C29.032 27.722 27.892 29.062 27.546 29.458C27.2 29.854 26.852 29.904 26.258 29.606C25.664 29.308 23.748 28.682 21.478 26.656C19.712 25.08 18.518 23.134 18.172 22.538C17.826 21.944 18.136 21.622 18.432 21.326C18.7 21.06 19.026 20.632 19.324 20.284C19.626 19.94 19.724 19.692 19.924 19.294C20.122 18.898 20.024 18.55 19.874 18.252C19.724 17.956 18.536 15.03 18.042 13.84C17.558 12.682 17.068 12.838 16.704 12.82L15.564 12.8C15.168 12.8 14.524 12.948 13.98 13.544C13.436 14.14 11.9 15.576 11.9 18.502C11.9 21.428 14.03 24.254 14.326 24.65C14.624 25.046 18.516 31.05 24.478 33.624C25.896 34.236 27.004 34.602 27.866 34.876C29.29 35.328 30.586 35.264 31.61 35.112C32.752 34.942 35.126 33.674 35.622 32.286C36.118 30.896 36.118 29.706 35.968 29.458Z'
      fill='currentColor'
    />
  </svg>
);
