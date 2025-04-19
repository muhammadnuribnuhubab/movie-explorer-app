import React from 'react';

type LogoProps = {
  className?: string;
};

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={`flex items-center cursor-pointer ${className ?? ''}`}>
      <svg
        width='130'
        height='40'
        viewBox='0 0 130 40'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='hidden md:block h-8 w-auto'
      >
        <path
          d='M33.3333 10.0001H24.0233L27.8449 6.17844L25.4883 3.82178L19.9999 9.31011L14.5116 3.82178L12.1549 6.17844L15.9766 10.0001H6.66659C4.82825 10.0001 3.33325 11.4951 3.33325 13.3334V31.6668C3.33325 33.5051 4.82825 35.0001 6.66659 35.0001H33.3333C35.1716 35.0001 36.6666 33.5051 36.6666 31.6668V13.3334C36.6666 11.4951 35.1716 10.0001 33.3333 10.0001Z'
          fill='#FDFDFD'
        />
        <path
          d='M70.8844 10.1458V30H66.9022V17.0862L61.5831 30H58.568L53.2204 17.0862V30H49.2382V10.1458H53.7609L60.0755 24.9084L66.3902 10.1458H70.8844ZM80.6811 30.256C79.164 30.256 77.7987 29.9241 76.5851 29.2604C75.3715 28.5778 74.4138 27.6201 73.7122 26.3876C73.0295 25.155 72.6882 23.7327 72.6882 22.1209C72.6882 20.509 73.039 19.0868 73.7406 17.8542C74.4612 16.6216 75.4378 15.6735 76.6704 15.0098C77.903 14.3271 79.2778 13.9858 80.7949 13.9858C82.3119 13.9858 83.6867 14.3271 84.9193 15.0098C86.1519 15.6735 87.119 16.6216 87.8206 17.8542C88.5412 19.0868 88.9015 20.509 88.9015 22.1209C88.9015 23.7327 88.5318 25.155 87.7922 26.3876C87.0716 27.6201 86.0855 28.5778 84.834 29.2604C83.6014 29.9241 82.2171 30.256 80.6811 30.256ZM80.6811 26.7858C81.4017 26.7858 82.0749 26.6151 82.7006 26.2738C83.3454 25.9135 83.8574 25.3825 84.2366 24.6809C84.6159 23.9793 84.8055 23.1259 84.8055 22.1209C84.8055 20.6228 84.4073 19.4756 83.6109 18.6791C82.8334 17.8637 81.8758 17.456 80.738 17.456C79.6002 17.456 78.6426 17.8637 77.8651 18.6791C77.1066 19.4756 76.7273 20.6228 76.7273 22.1209C76.7273 23.619 77.0971 24.7757 77.8366 25.5911C78.5952 26.3876 79.5433 26.7858 80.6811 26.7858ZM97.2555 26.3307L101.238 14.2418H105.476L99.6449 30H94.8093L89.0066 14.2418H93.2733L97.2555 26.3307ZM108.594 12.3644C107.893 12.3644 107.305 12.1464 106.831 11.7102C106.376 11.2551 106.148 10.6957 106.148 10.032C106.148 9.3683 106.376 8.81837 106.831 8.38222C107.305 7.92711 107.893 7.69955 108.594 7.69955C109.296 7.69955 109.874 7.92711 110.33 8.38222C110.804 8.81837 111.041 9.3683 111.041 10.032C111.041 10.6957 110.804 11.2551 110.33 11.7102C109.874 12.1464 109.296 12.3644 108.594 12.3644ZM110.557 14.2418V30H106.575V14.2418H110.557ZM128.003 21.7796C128.003 22.3484 127.965 22.8604 127.889 23.3156H116.369C116.464 24.4533 116.862 25.3446 117.564 25.9893C118.265 26.6341 119.128 26.9564 120.152 26.9564C121.631 26.9564 122.684 26.3212 123.309 25.0507H127.604C127.149 26.5677 126.277 27.8193 124.988 28.8053C123.698 29.7724 122.115 30.256 120.237 30.256C118.72 30.256 117.355 29.9241 116.141 29.2604C114.947 28.5778 114.008 27.6201 113.325 26.3876C112.662 25.155 112.33 23.7327 112.33 22.1209C112.33 20.4901 112.662 19.0584 113.325 17.8258C113.989 16.5932 114.918 15.645 116.113 14.9813C117.308 14.3176 118.682 13.9858 120.237 13.9858C121.735 13.9858 123.072 14.3081 124.248 14.9529C125.443 15.5976 126.362 16.5173 127.007 17.712C127.671 18.8877 128.003 20.2436 128.003 21.7796ZM123.878 20.6418C123.859 19.6178 123.489 18.8024 122.769 18.1956C122.048 17.5698 121.166 17.2569 120.124 17.2569C119.137 17.2569 118.303 17.5603 117.62 18.1671C116.957 18.755 116.549 19.5799 116.397 20.6418H123.878Z'
          fill='#FDFDFD'
        />
      </svg>

      <svg
        width='92'
        height='28'
        viewBox='0 0 92 28'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='block md:hidden h-7 w-auto'
      >
        <path
          d='M23.3333 7.00013H16.8163L19.4914 4.32496L17.8418 2.67529L13.9999 6.51713L10.1581 2.67529L8.50842 4.32496L11.1836 7.00013H4.66659C3.37975 7.00013 2.33325 8.04663 2.33325 9.33346V22.1668C2.33325 23.4536 3.37975 24.5001 4.66659 24.5001H23.3333C24.6201 24.5001 25.6666 23.4536 25.6666 22.1668V9.33346C25.6666 8.04663 24.6201 7.00013 23.3333 7.00013Z'
          fill='#FDFDFD'
        />
        <path
          d='M48.9413 6.60204V20.5H46.1538V11.4604L42.4304 20.5H40.3198L36.5765 11.4604V20.5H33.789V6.60204H36.9548L41.3751 16.9359L45.7954 6.60204H48.9413ZM55.799 20.6792C54.7371 20.6792 53.7813 20.4469 52.9318 19.9823C52.0823 19.5044 51.4119 18.8341 50.9208 17.9713C50.4429 17.1085 50.204 16.1129 50.204 14.9846C50.204 13.8563 50.4495 12.8608 50.9407 11.998C51.4451 11.1351 52.1287 10.4714 52.9915 10.0068C53.8543 9.52898 54.8167 9.29004 55.8786 9.29004C56.9406 9.29004 57.9029 9.52898 58.7658 10.0068C59.6286 10.4714 60.3056 11.1351 60.7967 11.998C61.3011 12.8608 61.5533 13.8563 61.5533 14.9846C61.5533 16.1129 61.2945 17.1085 60.7768 17.9713C60.2724 18.8341 59.5821 19.5044 58.706 19.9823C57.8432 20.4469 56.8742 20.6792 55.799 20.6792ZM55.799 18.25C56.3034 18.25 56.7746 18.1306 57.2127 17.8916C57.664 17.6394 58.0224 17.2678 58.2879 16.7766C58.5534 16.2855 58.6861 15.6881 58.6861 14.9846C58.6861 13.936 58.4074 13.1329 57.8498 12.5754C57.3056 12.0046 56.6353 11.7192 55.8388 11.7192C55.0424 11.7192 54.372 12.0046 53.8278 12.5754C53.2968 13.1329 53.0314 13.936 53.0314 14.9846C53.0314 16.0333 53.2902 16.843 53.8079 17.4138C54.3389 17.9713 55.0026 18.25 55.799 18.25ZM67.4011 17.9315L70.1887 9.46924H73.1554L69.0736 20.5H65.6888L61.6269 9.46924H64.6136L67.4011 17.9315ZM75.3383 8.15511C74.8472 8.15511 74.4357 8.00246 74.1038 7.69715C73.7853 7.37858 73.626 6.98699 73.626 6.5224C73.626 6.0578 73.7853 5.67286 74.1038 5.36755C74.4357 5.04897 74.8472 4.88969 75.3383 4.88969C75.8295 4.88969 76.2343 5.04897 76.5529 5.36755C76.8848 5.67286 77.0507 6.0578 77.0507 6.5224C77.0507 6.98699 76.8848 7.37858 76.5529 7.69715C76.2343 8.00246 75.8295 8.15511 75.3383 8.15511ZM76.7122 9.46924V20.5H73.9246V9.46924H76.7122ZM88.9241 14.7457C88.9241 15.1439 88.8975 15.5023 88.8445 15.8209H80.7805C80.8468 16.6173 81.1256 17.2412 81.6167 17.6925C82.1079 18.1439 82.7118 18.3695 83.4286 18.3695C84.464 18.3695 85.2007 17.9248 85.6388 17.0355H88.6453C88.3268 18.0974 87.7162 18.9735 86.8135 19.6637C85.9109 20.3407 84.8025 20.6792 83.4884 20.6792C82.4264 20.6792 81.4707 20.4469 80.6212 19.9823C79.7849 19.5044 79.1278 18.8341 78.65 17.9713C78.1854 17.1085 77.9531 16.1129 77.9531 14.9846C77.9531 13.8431 78.1854 12.8409 78.65 11.978C79.1146 11.1152 79.765 10.4515 80.6013 9.98693C81.4375 9.52234 82.3999 9.29004 83.4884 9.29004C84.537 9.29004 85.4728 9.5157 86.2958 9.96702C87.1321 10.4183 87.7759 11.0621 88.2272 11.8984C88.6918 12.7214 88.9241 13.6705 88.9241 14.7457ZM86.037 13.9492C86.0237 13.2324 85.7649 12.6617 85.2605 12.2369C84.756 11.7988 84.1388 11.5798 83.4087 11.5798C82.7185 11.5798 82.1344 11.7922 81.6565 12.217C81.1919 12.6285 80.9066 13.2059 80.8004 13.9492H86.037Z'
          fill='#FDFDFD'
        />
      </svg>
    </div>
  );
};
