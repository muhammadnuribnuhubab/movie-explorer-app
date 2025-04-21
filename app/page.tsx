import { HeroBanner, NewRelease, TrendingNow } from '@/components/section';

const moviesData = [
  {
    id: '1',
    title: 'The Gorge - Movie 1',
    imageUrl: '/images/movie1.jpg',
    rating: 4.5,
    trendingIndex: 1,
  },
  {
    id: '2',
    title: 'The Gorge - Movie 2',
    imageUrl: '/images/movie2.jpg',
    rating: 4.7,
    trendingIndex: 2,
  },
  {
    id: '3',
    title: 'The Gorge - Movie 3',
    imageUrl: '/images/movie3.jpg',
    rating: 4.3,
    trendingIndex: 3,
  },
  {
    id: '4',
    title: 'The Gorge - Movie 4',
    imageUrl: '/images/movie4.jpg',
    rating: 4.8,
    trendingIndex: 4,
  },
  {
    id: '5',
    title: 'The Gorge - Movie 1',
    imageUrl: '/images/movie1.jpg',
    rating: 4.5,
    trendingIndex: 1,
  },
  {
    id: '6',
    title: 'The Gorge - Movie 2',
    imageUrl: '/images/movie2.jpg',
    rating: 4.7,
    trendingIndex: 2,
  },
  {
    id: '7',
    title: 'The Gorge - Movie 3',
    imageUrl: '/images/movie3.jpg',
    rating: 4.3,
    trendingIndex: 3,
  },
  {
    id: '8',
    title: 'The Gorge - Movie 4',
    imageUrl: '/images/movie4.jpg',
    rating: 4.8,
    trendingIndex: 4,
  },
  {
    id: '9',
    title: 'The Gorge - Movie 1',
    imageUrl: '/images/movie1.jpg',
    rating: 4.5,
    trendingIndex: 1,
  },
  {
    id: '10',
    title: 'The Gorge - Movie 2',
    imageUrl: '/images/movie2.jpg',
    rating: 4.7,
    trendingIndex: 2,
  },
  {
    id: '11',
    title: 'The Gorge - Movie 3',
    imageUrl: '/images/movie3.jpg',
    rating: 4.3,
    trendingIndex: 3,
  },
  {
    id: '12',
    title: 'The Gorge - Movie 4',
    imageUrl: '/images/movie4.jpg',
    rating: 4.8,
    trendingIndex: 4,
  },
  {
    id: '13',
    title: 'The Gorge - Movie 3',
    imageUrl: '/images/movie3.jpg',
    rating: 4.3,
    trendingIndex: 3,
  },
  {
    id: '14',
    title: 'The Gorge - Movie 4',
    imageUrl: '/images/movie4.jpg',
    rating: 4.8,
    trendingIndex: 4,
  },
  {
    id: '15',
    title: 'The Gorge - Movie 4',
    imageUrl: '/images/movie4.jpg',
    rating: 4.8,
    trendingIndex: 4,
  },
  {
    id: '16',
    title: 'The Gorge - Movie 2',
    imageUrl: '/images/movie2.jpg',
    rating: 4.7,
    trendingIndex: 2,
  },
  {
    id: '17',
    title: 'The Gorge - Movie 3',
    imageUrl: '/images/movie3.jpg',
    rating: 4.3,
    trendingIndex: 3,
  },
  {
    id: '18',
    title: 'The Gorge - Movie 4',
    imageUrl: '/images/movie4.jpg',
    rating: 4.8,
    trendingIndex: 4,
  },
  {
    id: '19',
    title: 'The Gorge - Movie 1',
    imageUrl: '/images/movie1.jpg',
    rating: 4.5,
    trendingIndex: 1,
  },
  {
    id: '20',
    title: 'The Gorge - Movie 2',
    imageUrl: '/images/movie2.jpg',
    rating: 4.7,
    trendingIndex: 2,
  },
  {
    id: '21',
    title: 'The Gorge - Movie 3',
    imageUrl: '/images/movie3.jpg',
    rating: 4.3,
    trendingIndex: 3,
  },
  {
    id: '22',
    title: 'The Gorge - Movie 4',
    imageUrl: '/images/movie4.jpg',
    rating: 4.8,
    trendingIndex: 4,
  },
  {
    id: '23',
    title: 'The Gorge - Movie 3',
    imageUrl: '/images/movie3.jpg',
    rating: 4.3,
    trendingIndex: 3,
  },
  {
    id: '24',
    title: 'The Gorge - Movie 4',
    imageUrl: '/images/movie4.jpg',
    rating: 4.8,
    trendingIndex: 4,
  },
  {
    id: '25',
    title: 'The Gorge - Movie 4',
    imageUrl: '/images/movie4.jpg',
    rating: 4.8,
    trendingIndex: 4,
  },
  {
    id: '26',
    title: 'The Gorge - Movie 2',
    imageUrl: '/images/movie2.jpg',
    rating: 4.7,
    trendingIndex: 2,
  },
  {
    id: '27',
    title: 'The Gorge - Movie 3',
    imageUrl: '/images/movie3.jpg',
    rating: 4.3,
    trendingIndex: 3,
  },
  {
    id: '28',
    title: 'The Gorge - Movie 4',
    imageUrl: '/images/movie4.jpg',
    rating: 4.8,
    trendingIndex: 4,
  },
  {
    id: '29',
    title: 'The Gorge - Movie 1',
    imageUrl: '/images/movie1.jpg',
    rating: 4.5,
    trendingIndex: 1,
  },
  {
    id: '30',
    title: 'The Gorge - Movie 2',
    imageUrl: '/images/movie2.jpg',
    rating: 4.7,
    trendingIndex: 2,
  },
  {
    id: '31',
    title: 'The Gorge - Movie 3',
    imageUrl: '/images/movie3.jpg',
    rating: 4.3,
    trendingIndex: 3,
  },
  {
    id: '32',
    title: 'The Gorge - Movie 4',
    imageUrl: '/images/movie4.jpg',
    rating: 4.8,
    trendingIndex: 4,
  },
  {
    id: '33',
    title: 'The Gorge - Movie 3',
    imageUrl: '/images/movie3.jpg',
    rating: 4.3,
    trendingIndex: 3,
  },
  {
    id: '34',
    title: 'The Gorge - Movie 4',
    imageUrl: '/images/movie4.jpg',
    rating: 4.8,
    trendingIndex: 4,
  },
  {
    id: '35',
    title: 'The Gorge - Movie 4',
    imageUrl: '/images/movie4.jpg',
    rating: 4.8,
    trendingIndex: 4,
  },
];

export default function HomeLayout() {
  return (
    <main className='mx-auto'>
      <HeroBanner />

      <TrendingNow
        movies={moviesData}
        title='Trending Now'
        className='md:mt-[50px]'
      />
      <NewRelease
        movies={moviesData}
        title='New Release'
        className='mt-10 md:mt-[84px]'
      />
    </main>
  );
}
