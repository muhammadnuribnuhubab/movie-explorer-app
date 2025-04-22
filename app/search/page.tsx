'use client';

import { FavoriteItem } from '@/components/section';
import { EmptyContent } from '@/components/section/EmptyContent';
import { useSearchParams, useRouter } from 'next/navigation';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const router = useRouter();

  if (!query) {
    router.push('/');
    return null;
  }

  const handleSearch = (query: string) => {
    const results = [
      {
        title: 'Captain America: Brave New World',
        rating: 7.9,
        description:
          'After meeting with newly elected U.S. President Thaddeus Ross...',
      },
      {
        title: 'Batman Begins',
        rating: 8.3,
        description:
          'After the murder of his parents, billionaire playboy Bruce Wayne...',
      },
      {
        title: 'Spider-Man: No Way Home',
        rating: 8.0,
        description:
          'With Spider-Man’s identity now revealed, Peter asks Doctor Strange for help...',
      },
    ].filter((movie) =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );

    return results;
  };

  const searchResults = handleSearch(query);

  return (
    <section className='relative pt-[70px] md:pt-[110px] px-xl max-w-[1160px] mx-auto'>
      <h2 className='text-xl font-bold'>
        Search Results for &quot;{query}&quot;
      </h2>
      <div className='mt-4'>
        {searchResults.length === 0 ? (
          <div className='text-center justify-center items-center text-white text-lg md:text-xl py-16 flex flex-col mx-auto'>
            <div className='flex flex-col items-center justify-center gap-6'>
              <EmptyContent
                title='Data Not Found'
                description="Try other keywords"
                imageSrc='/images/not-found.svg'
              />
            </div>
          </div>
        ) : (
          <div className='space-y-4'>
            {searchResults.map((result, index) => (
              <FavoriteItem
                key={index}
                title={result.title}
                rating={result.rating}
                description={result.description}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchPage;
