import { notFound } from 'next/navigation';
import { MovieDetail } from '@/components/section/MovieDetail';
import { fetchMovieDetail } from '@/lib/api/movieDetail';
import type { MovieDetailProps, MovieApiResponse } from '@/types/movie';
import ClientGuard from '@/components/ClientGuard';

export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Validasi ID: hanya angka dan panjang maksimal (opsional)
  if (!/^\d+$/.test(id)) {
    return notFound();
  }

  let data: MovieApiResponse;
  try {
    data = await fetchMovieDetail(id);

    // Jika response tidak mengandung judul (artinya data tidak valid)
    if (!data?.title) {
      return notFound();
    }
  } catch (err) {
    console.error(`Failed to fetch movie detail for id ${id}:`, err);
    return notFound();
  }

  const trailerItem =
    data.videos.results.find((v) => v.type === 'Trailer') ??
    data.videos.results[0];

  const movieDetailProps: MovieDetailProps = {
    id: data.id.toString(),
    title: data.title,
    releaseDate: data.release_date,
    overview: data.overview,
    posterUrl: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
    backdropUrl: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
    rating: Number(data.vote_average.toFixed(1)),
    genres: data.genres.map((g) => g.name),
    age: data.adult ? 18 : 13,
    trailerUrl: trailerItem
      ? `https://www.youtube.com/watch?v=${trailerItem.key}`
      : undefined,
    cast: data.credits.cast.slice(0, 10).map((c) => ({
      id: c.cast_id,
      name: c.name,
      character: c.character,
      profile_path: c.profile_path,
    })),
    crew: data.credits.crew
      .filter((c) => ['Director', 'Producer', 'Writer'].includes(c.job))
      .map((c) => ({
        id: c.id,
        name: c.name,
        job: c.job,
        profile_path: c.profile_path,
      })),
  };

  return (
    <ClientGuard>
      <MovieDetail {...movieDetailProps} />
    </ClientGuard>
  );
}
