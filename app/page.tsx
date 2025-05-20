import { ExploreMore } from '@/components/section/ExploreMore';
import { HeroBanner } from '@/components/section/HeroBanner';
import { TrendingNow } from '@/components/section/TrendingNow';
import { fetchMovieVideos } from '@/lib/api/movieDetail';
import { fetchTrendingMovies } from '@/lib/api/trending';
import type { Movie, Video } from '@/types/movie';

export default async function HomePage() {
  // 1. Fetch trending untuk banner
  const rawTrending: Movie[] = await fetchTrendingMovies();
  const topMovie = rawTrending[0];

  // 2. Fetch trailer untuk topMovie
  const vids: Video[] = await fetchMovieVideos(topMovie.id);
  const trailer =
    vids.find((v: Video) => v.type === 'Trailer' && v.site === 'YouTube') ??
    vids.find((v: Video) => v.site === 'YouTube');

  const trailerUrl = trailer
    ? `https://www.youtube.com/watch?v=${trailer.key}`
    : null;

  return (
    <main className='mx-auto min-h-[85vh]'>
      {/* HeroBanner di-render server-side */}
      <HeroBanner movie={topMovie} trailerUrl={trailerUrl} />

      {/* Client Components akan fetch data masing-masing */}
      <TrendingNow title='Trending Now' />

      <ExploreMore title='Explore More' />
    </main>
  );
}
