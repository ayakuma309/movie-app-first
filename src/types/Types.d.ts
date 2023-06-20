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
    genre_ids: number[];
    id: number;
    original_title: string;
    overview: string;
    poster_path: string;
    title: string;
  }[];
}


