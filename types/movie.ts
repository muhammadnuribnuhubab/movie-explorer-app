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
  rating: string;
  trendingIndex?: number; // opsional karena NewRelease gak pakai ini
  description?: string; // opsional karena NewRelease gak pakai ini
  trailerUrl?: string; // opsional karena NewRelease gak pakai ini
}

export interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  overview: string;
  // Tambahkan properti lain kalau perlu
}

export interface TMDBExploreMoreResponse {
  results: TMDBMovie[];
  total_pages: number;
}

export interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}


export type Genre = {
  id: number;
  name: string;
};

export type VideoType = {
  id: string;
  key: string;
  type: string;
};

export type CastMember = {
  cast_id: number;
  name: string;
  character: string;
  profile_path?: string;
};

export type CrewMember = {
  id: number;
  name: string;
  job: string;
  profile_path?: string;
};

export type MovieApiResponse = {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  genres: Genre[];
  adult: boolean;
  videos: {
    results: Video[];
  };
  credits: {
    cast: CastMember[];
    crew: CrewMember[];
  };
};

export type MovieDetailProps = {
  id: string;
  title: string;
  releaseDate: string;
  overview: string;
  posterUrl: string;
  backdropUrl: string;
  rating: number;
  genres: string[];
  age: number;
  trailerUrl?: string;
  cast: { id: number; name: string; character: string; profile_path?: string }[];
  crew: { id: number; name: string; job: string; profile_path?: string }[];
};