//Layout.tsx
export interface CommonTypeProps {
  children: React.ReactNode;
  title: string;
}

//search.tsx
export interface MovieInfo {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}


//MovieItem.tsx
export interface MovieItemProps {
  movies: MovieInfo[];
}


export interface RecommendProps {
  id: number;
}

export interface RecommendMovie {
  results: {
    id: number;
    original_title: string;
    overview: string;
    poster_path: string;
    title: string;
  }[];
}

export interface  MovieDetailProps {
  id: number;
  overview: string;
  poster_path: string;
  title: string;
  genres: [{
    id: number;
    name: string;
  }];
  tagline: string;
}
