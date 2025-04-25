import { FormattedMovie, TMDBMovie } from '@/types/movie';
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
// Ambil daftar film yang baru tayang, tanpa batasan paging
export const fetchNewReleases = async (): Promise<FormattedMovie[]> => {
  const allMovies: FormattedMovie[] = [];
  let currentPage = 1;
  let hasMoreData = true;

  while (hasMoreData) {
    try {
      const response = await axios.get<{ results: TMDBMovie[] }>(
        `${BASE_URL}/movie/now_playing`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            accept: 'application/json',
          },
          params: { page: currentPage },
        }
      );

      const validMovies = response.data.results.filter((m) => m.poster_path);

      const mappedMovies: FormattedMovie[] = validMovies.map((m) => ({
        id: m.id.toString(),
        title: m.title,
        imageUrl: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
        rating: Number(m.vote_average).toFixed(2),
        description: m.overview,
      }));

      allMovies.push(...mappedMovies);

      hasMoreData = currentPage < response.data.total_pages;
      currentPage++;
    } catch (error) {
      console.error('Error fetching new releases:', error);
      hasMoreData = false;
    }
  }

  console.log(allMovies)

  return allMovies;
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
