import axios from 'axios';

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;

if (!ACCESS_TOKEN) {
  throw new Error('TMDB Access Token is missing!');
}

const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchTrendingMovies = async () => {
  const res = await axios.get(`${BASE_URL}/trending/movie/week`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
      accept: 'application/json',
    },
  });
  return res.data.results;
};

// Modifikasi untuk menambahkan parameter `page` pada request
export const fetchNewReleases = async (page: number) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`, // Menggunakan ACCESS_TOKEN yang sama
        accept: 'application/json',
      },
      params: {
        page, // Menambahkan parameter page untuk mengambil halaman berikutnya
      },
    });

    console.log('API Response:', response.data); // Debugging API response
    return response.data.results; // Mengembalikan array film baru yang sedang tayang
  } catch (error) {
    console.error('Error fetching new releases:', error);
    return [];
  }
};
