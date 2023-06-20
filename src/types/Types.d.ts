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

export interface RecommendMovieProps {
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
  original_title: string;
  genres: [{
    id: number;
    name: string;
  }];
  tagline: string;
}

export interface MovieVideoProps{
  results: {
    id: number;
    key: string;
    name: string;
  }[];
}
