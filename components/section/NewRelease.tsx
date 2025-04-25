'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // ✅ Tambahkan ini
import { MovieCard } from '../card';
import { SectionTitle } from './SectionTitle';
import { Button } from '../ui';
import type { FormattedMovie } from '@/types/movie';

type NewReleasesProps = {
  title: string;
  className?: string;
  movies: FormattedMovie[];
  onLoadMore: () => void; // Menambahkan props untuk load more
};

export const NewRelease = ({
  title,
  className = '',
  movies,
  onLoadMore,
}: NewReleasesProps) => {
  const [visibleCount, setVisibleCount] = useState(8); // Jumlah film yang akan ditampilkan
  const [windowWidth, setWindowWidth] = useState<number>(0); // Ukuran jendela
  const isAllVisible = visibleCount >= movies.length; // Cek jika semua film sudah ditampilkan
  const router = useRouter(); // ✅ Router untuk navigasi

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth); // Menyesuaikan ukuran jendela
    };

    handleResize();
    window.addEventListener('resize', handleResize); // Menambahkan event listener resize

    return () => {
      window.removeEventListener('resize', handleResize); // Menghapus event listener resize saat komponen dibersihkan
    };
  }, []);

  useEffect(() => {
    if (windowWidth >= 768) {
      setVisibleCount(15); // Untuk layar besar, tampilkan 15 film
    } else {
      setVisibleCount(8); // Untuk layar kecil, tampilkan 8 film
    }
  }, [windowWidth]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + (windowWidth >= 768 ? 60 : 30)); // Tambahkan lebih banyak film tergantung pada ukuran layar
    onLoadMore(); // Memanggil fungsi load more untuk memuat lebih banyak data
  };
 

  // console.log(movies)
  return (
    <section className={`mx-auto mt-12 max-w-[1180px] px-[18px] ${className}`}>
      <SectionTitle title={title} />

      <div className='relative mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
        {movies.slice(0, visibleCount).map((movie) => (
          <div
            key={movie.id} // Use movie.id as the unique key
            className='cursor-pointer'
            onClick={() => router.push(`/detail/${movie.id}`)}
          >
            <MovieCard
              imageUrl={movie.imageUrl}
              title={movie.title}
              rating={movie.rating}
            />
          </div>
        ))}

        {!isAllVisible && (
          <div className='absolute bottom-0 left-0 right-0 h-150 bg-gradient-to-t from-black to-transparent md:h-160' />
        )}
      </div>

      {!isAllVisible && (
        <div className='mt-6 flex justify-center'>
          {windowWidth < 768 ? (
            <Button
              onClick={handleLoadMore} // Panggil handleLoadMore saat tombol diklik
              variant='secondary'
              className='!w-[200px] md:hidden'
            >
              Load More
            </Button>
          ) : (
            <Button
              onClick={handleLoadMore} // Panggil handleLoadMore saat tombol diklik
              variant='secondary'
              size='lg'
              className='hidden md:inline-flex'
            >
              Load More
            </Button>
          )}
        </div>
      )}
    </section>
  );
};
