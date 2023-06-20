import React, { useEffect } from 'react'
import { RecommendMovieProps, MovieDetailProps, MovieVideoProps } from '../types/Types';
const useMovies = (id: number) => {
  const [movieRecommend, setMovieRecommend] = React.useState<RecommendMovieProps | null>(null);

  const [movieDetail, setMovieDetail] = React.useState<MovieDetailProps>({
    id: 0,
    overview: '',
    poster_path: '',
    title: '',
    original_title: '',
    genres: [
      {
        id: 0,
        name: '',
      }
    ],
    tagline: '',
  });
  const [trailerUrl, setTrailerUrl] = React.useState<MovieVideoProps | null>(null);
  // const [movieImages, setMovieImages] = React.useState([]);
  const APIKEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

  //firebaseのデータ取得後にmovie.idを使いdetailのAPIで取得
  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        if(id){
          const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=ja`;
          const res = await fetch(url);
          const data = await res.json();
          setMovieDetail(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieDetail();
  }, [id]);

  useEffect(() => {
    const fetchMovieRecommend = async () => {
      try {
        if (id) {
          const url = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${APIKEY}&language=ja&page=1`;
          const res = await fetch(url);
          const data = await res.json();
          setMovieRecommend(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieRecommend();
  }, [id]);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        if(id){
          const url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${APIKEY}&language=ja`;
          const res = await fetch(url);
          const trailerUrl = await res.json();
          setTrailerUrl(trailerUrl);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchMovieDetail();
  }, [id]);

  return {
    movieDetail,
    movieRecommend,
    trailerUrl
  }
}

export default useMovies
