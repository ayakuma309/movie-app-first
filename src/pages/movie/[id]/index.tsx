import { NextPage, GetServerSideProps } from 'next';
import React from 'react';
import { RecommendProps } from '@/types/Types';
import useMovies from '@/hooks/useMovies';
import Image from 'next/image';
import Layout from '@/components/common/Layout';


const RecommendMovie: NextPage<RecommendProps> = ({ id }: RecommendProps) => {
  const { movieDetail, movieRecommend } = useMovies(id);
  const { results } = movieRecommend;

  return (
    <Layout title="おすすめの映画">
      <div className='w-8/12  mx-auto font-mono'>
        <div className='mt-24'>
          {movieDetail &&
            <div className='mx-auto'>
              <div className='text-4xl font-bold text-center'>{movieDetail.title}</div>
              <Image
                src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`}
                alt={movieDetail.title}
                width={200}
                height={200}
              />
              <div className='flex'>
                {movieDetail.genres.map((genre) => (
                  <div key={genre.id}>{genre.name}</div>
                ))}
              </div>
              <div>{movieDetail.tagline}</div>
              <div>{movieDetail.overview}</div>
            </div>
          }
        </div>
        <div className='flex flex-wrap justify-center mt-24'>
          {results && results.map((movie) => (
            <div key={movie.id}>
              <Image
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                width={100}
                height={100}
              />
            </div>
          ))}
        </div>
      </div>
    </Layout>
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
