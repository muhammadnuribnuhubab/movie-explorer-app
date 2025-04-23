'use client';

import { MovieDetail } from '@/components/section';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchMovieDetail } from '@/lib/api/tmdb';

type MovieDetailProps = {
  title: string;
  releaseDate: string;
  overview: string;
  posterUrl: string;
  backdropUrl: string;
  rating?: number;
  genres?: string[];
  age?: number;
  trailerUrl?: string;
  cast: { id: number; name: string; character: string; profile_path?: string }[];
  crew: { id: number; name: string; job: string; profile_path?: string }[];
};

const MovieDetailPage = () => {
  const { id } = useParams()!;
  const [movie, setMovie] = useState<MovieDetailProps | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const data = await fetchMovieDetail(id);
        setMovie({
          title: data.title,
          releaseDate: data.release_date,
          overview: data.overview,
          posterUrl: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
          backdropUrl: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
          rating: data.vote_average,
          genres: data.genres.map((g: any) => g.name),
          age: data.adult ? 18 : 13,
          trailerUrl: data.videos.results.find((v: any) => v.type === 'Trailer')?.key
            ? `https://www.youtube.com/watch?v=${
                data.videos.results.find((v: any) => v.type === 'Trailer')!.key
              }`
            : undefined,
          cast: data.credits.cast.slice(0, 10).map((c: any) => ({
            id: c.cast_id,
            name: c.name,
            character: c.character,
            profile_path: c.profile_path,
          })),
          crew: data.credits.crew
            .filter((c: any) => ['Director','Producer','Writer'].includes(c.job))
            .map((c: any) => ({
              id: c.id,
              name: c.name,
              job: c.job,
              profile_path: c.profile_path,
            })),
        });
      } catch (err: any) {
        console.error(err);
        setError('Gagal mengambil detail film.');
      }
    })();
  }, [id]);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!movie) return <div>Loading...</div>;

  return <MovieDetail {...movie} />;
};

export default MovieDetailPage;
