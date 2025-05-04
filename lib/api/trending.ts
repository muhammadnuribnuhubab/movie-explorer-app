import axios from 'axios';
import { BASE_URL, headers } from './utils';

export const fetchTrendingMovies = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/trending/movie/week`, {
      headers,
    });

    // Lihat semua data mentah
    console.log('Raw data:', res.data);

    // Jika hanya ingin lihat data.result bisa pakai ini juga
    // console.log('Results:', res.data.results);

    return res.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    return [];
  }
};
