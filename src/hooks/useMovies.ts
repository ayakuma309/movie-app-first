import React, { useEffect } from 'react';
import { RecommendMovieProps, MovieDetailProps, MovieVideoProps } from '../types/Types';

const useMovies = (id: number) => {
  const [movieData, setMovieData] = React.useState<{
    movieDetail: MovieDetailProps | null;
    movieRecommend: RecommendMovieProps[] | null;
    trailerUrl: MovieVideoProps | null;
  }>({
    movieDetail: null,
    movieRecommend: null,
    trailerUrl: null,
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          // APIエンドポイントのURLを変更
          const apiUrl = `/api/movie/${id}`;
          const response = await fetch(apiUrl);
          const data = await response.json();
          setMovieData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  return movieData;
};

export default useMovies;
