import { NextPage, GetServerSideProps } from 'next';
import React, { useEffect } from 'react';
import { RecommendProps } from '@/types/Types';


const RecommendMovie: NextPage<RecommendProps> = ({ id }: RecommendProps) => {

  const [movieDetail, setMovieDetail] = React.useState({});
  const [movieRecommend, setMovieRecommend] = React.useState({});
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
        if(id){
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
  console.log(movieRecommend);
  return (
    <div>{id}</div>
  );
};


export default RecommendMovie;

export const getServerSideProps: GetServerSideProps<RecommendProps> = async (context) => {
  const { id } = context.query; // クエリパラメータから'id'を取得

  // 'id'をnumberに変換する
  const parsedId = Number(id);

  // 'parsedId'を使用してRecommendPropsを作成
  const props: RecommendProps = { id: parsedId };

  return {
    props,
  };
};
