import axios from 'axios';
import { BASE_URL, headers } from './utils';

export const fetchMovieDetail = async (id: string) => {
  try {
    const res = await axios.get(`${BASE_URL}/movie/${id}`, {
      headers,
      params: {
        append_to_response: 'videos,credits',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

export const fetchMovieVideos = async (movieId: number) => {
  try {
    const res = await axios.get(`${BASE_URL}/movie/${movieId}/videos`, {
      headers,
    });
    return res.data.results;
  } catch (error) {
    console.error('Error fetching movie videos:', error);
    return [];
  }
};
