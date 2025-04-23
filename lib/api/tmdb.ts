import { FormattedMovie } from '@/types/movie';
import axios from 'axios';

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;
if (!ACCESS_TOKEN) {
  throw new Error('TMDB Access Token is missing!');
}

const BASE_URL = 'https://api.themoviedb.org/3';

// Ambil daftar trending minggu ini
export const fetchTrendingMovies = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/trending/movie/week`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        accept: 'application/json',
      },
    });
    return res.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};

// Ambil daftar film yang baru tayang, dengan paging
export const fetchNewReleases = async (
  page: number
): Promise<FormattedMovie[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        accept: 'application/json',
      },
      params: { page },
    });

    const formatted = response.data.results.map(
      (movie: any, index: number) => ({
        id: movie.id.toString(),
        title: movie.title,
        imageUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        rating: Number(movie.vote_average),
        trendingIndex: index + 1,
      })
    );

    return formatted;
  } catch (error) {
    console.error('Error fetching new releases:', error);
    return [];
  }
};

// Fungsi untuk load lebih banyak film
export const loadMoreNewReleases = async (
  currentPage: number,
  allMovies: FormattedMovie[]
) => {
  const newMovies = await fetchNewReleases(currentPage);
  return [...allMovies, ...newMovies]; // Gabungkan data lama dengan data baru
};

// Ambil detail satu film, termasuk data basic + videos (trailer)
export const fetchMovieDetail = async (id: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/movie/${id}`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        accept: 'application/json',
      },
      params: {
        append_to_response: 'videos,credits', // <-- tambahkan credits di sini
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

// Ambil video (trailer) dari film tertentu
export const fetchMovieVideos = async (movieId: number) => {
  try {
    const res = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
        accept: 'application/json',
      },
    });
    return res.data.results;
  } catch (error) {
    console.error('Error fetching movie videos:', error);
    return [];
  }
};
