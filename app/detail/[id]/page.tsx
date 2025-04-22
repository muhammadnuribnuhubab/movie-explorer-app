'use client';

import { MovieDetail } from '@/components/section';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type MovieDetailProps = {
  title: string;
  releaseDate: string;
  overview: string;
  posterUrl: string;
  rating?: number;
  genres?: string[];
  trailerUrl?: string;
};

const MovieDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [movie, setMovie] = useState<MovieDetailProps | null>(null);

  useEffect(() => {
    if (id) {
      const fetchMovie = async () => {
        const response = await fetch(
          `https://api.example.com/movies/${id}`
        );
        const data = await response.json();
        setMovie(data);
      };

      fetchMovie();
    }
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return <MovieDetail {...movie} />;
};

export default MovieDetailPage;
