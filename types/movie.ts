export interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
}

export interface FormattedMovie {
  id: string;
  title: string;
  imageUrl: string;
  rating: number;
  trendingIndex?: number; // opsional karena NewRelease gak pakai ini
}
