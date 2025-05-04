export const BASE_URL = 'https://api.themoviedb.org/3';

export const headers = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
  accept: 'application/json',
};

if (!process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN) {
  throw new Error('TMDB Access Token is missing!');
}
