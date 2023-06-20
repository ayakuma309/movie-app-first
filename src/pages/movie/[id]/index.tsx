import { NextPage, GetServerSideProps } from 'next';
import React from 'react';
import { RecommendProps } from '@/types/Types';
import useMovies from '@/hooks/useMovies';


const RecommendMovie: NextPage<RecommendProps> = ({ id }: RecommendProps) => {
  const { movieDetail, movieRecommend } = useMovies(id);
  const { results } = movieRecommend;
  console.log(movieRecommend.results);
  return (
    <div>
      {results && results.map((movie) => (
        <div key={movie.id}>
          <div>{movie.title}</div>
          <div>{movie.poster_path}</div>
          <div>{movie.overview}</div>
        </div>
      ))}
    </div>
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
