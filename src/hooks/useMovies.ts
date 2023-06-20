import React, { useEffect } from 'react';
import { RecommendMovieProps, MovieDetailProps, MovieVideoProps } from '../types/Types';

const useMovies = (id: number) => {
  const [movieData, setMovieData] = React.useState<{
    movieDetail: MovieDetailProps | null;
    movieRecommend: RecommendMovieProps | null;
    trailerUrl: MovieVideoProps | null;
  }>({
    movieDetail: null,
    movieRecommend: null,
    trailerUrl: null,
  });

  const APIKEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {

          const detailUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=ja`;
          const recommendUrl = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${APIKEY}&language=ja&page=1`;
          const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${APIKEY}&language=ja`;

          // 3つの異なるAPIエンドポイントに対して非同期なHTTPリクエストを行う
          const [detailRes, recommendRes, videoRes] = await Promise.all([
            fetch(detailUrl),
            fetch(recommendUrl),
            fetch(videoUrl),
          ]);
          // レスポンスデータを格納
          const [detailData, recommendData, videoData] = await Promise.all([
            detailRes.json(),
            recommendRes.json(),
            videoRes.json(),
          ]);
          // レスポンスから取得したデータをステートに設定
          setMovieData({
            movieDetail: detailData,
            movieRecommend: recommendData,
            trailerUrl: videoData,
          });
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
