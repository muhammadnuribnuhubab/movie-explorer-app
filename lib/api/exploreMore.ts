import axios from 'axios';
import { FormattedMovie, TMDBExploreMoreResponse } from '@/types/movie';
import { BASE_URL, headers } from './utils';

const MAX_PAGES_PER_BATCH = 3; // Jumlah halaman yang di-fetch per batch
const MAX_TOTAL_PAGES = 50; // Jumlah total halaman yang ingin dibatasi (misal, 10 halaman)

// Fungsi untuk mengambil data Explore More dalam batch
export const fetchExploreMore = async (
  startPage = 1,
  maxPages = MAX_PAGES_PER_BATCH
): Promise<FormattedMovie[]> => {
  const allMovies: FormattedMovie[] = [];
  let currentPage = startPage;
  let pagesFetched = 0;
  let hasMoreData = true;

  while (hasMoreData && pagesFetched < maxPages) {
    try {
      const response = await axios.get<TMDBExploreMoreResponse>(
        `${BASE_URL}/movie/now_playing`,
        {
          headers,
          params: { page: currentPage },
        }
      );

      // Filter hanya film yang memiliki poster
      const validMovies = response.data.results.filter((m) => m.poster_path);

      // Map film menjadi format yang diinginkan
      const mappedMovies: FormattedMovie[] = validMovies.map((m) => ({
        id: m.id.toString(),
        title: m.title,
        imageUrl: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
        rating: m.vote_average.toFixed(1),
        description: m.overview,
      }));

      // Menambahkan film yang valid ke daftar allMovies
      allMovies.push(...mappedMovies);

      currentPage++; // Pindah ke halaman berikutnya
      pagesFetched++; // Menambahkan hitungan halaman yang diambil
      hasMoreData =
        currentPage <= response.data.total_pages &&
        currentPage <= MAX_TOTAL_PAGES; // Memeriksa apakah masih ada data lagi untuk diambil
    } catch (error) {
      console.error('Error fetching explore more movies:', error);
      hasMoreData = false; // Berhenti jika ada error
    }
  }

  return allMovies; // Mengembalikan semua film yang sudah diambil
};

// Fungsi untuk memuat lebih banyak data dari halaman yang ada
export const loadMoreMovies = async (
  currentPage: number,
  allMovies: FormattedMovie[],
  maxPages: number = MAX_PAGES_PER_BATCH
) => {
  const newMovies = await fetchExploreMore(currentPage, maxPages);
  return [...allMovies, ...newMovies]; // Menggabungkan data lama dan data baru
};
