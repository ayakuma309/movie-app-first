import { NextPage, GetServerSideProps } from 'next';
import React from 'react';
import { RecommendProps } from '@/types/Types';
import useMovies from '@/hooks/useMovies';
import Image from 'next/image';
import Layout from '@/components/common/Layout';


const RecommendMovie: NextPage<RecommendProps> = ({ id }: RecommendProps) => {
  const { movieDetail, movieRecommend, trailerUrl } = useMovies(id);

  return (
    <Layout title="Recommended movies">
      <div className='w-9/12  mx-auto font-mono'>
        <div className='mt-24'>
          <div className='text-4xl font-bold text-center'>Recommended movies</div>
          <div className='flex flex-wrap justify-center mt-10'>
            {movieRecommend && movieRecommend.results.map((movie) => (
              <div key={movie.id}>
                <div className='glass_card glass_recommend_card'>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    width={100}
                    height={100}
                    className='mx-auto'
                  />
                  <div className='text-gray-600 font-bold mt-2'>{movie.title}</div>
                </div>
              </div>
            ))}
          </div>
          {movieDetail &&
            <div className='glass_card my-24'>
              <div className='my-10'>
                <div className='text-4xl font-bold text-center'>{movieDetail.original_title}<br/>
                  <span className='text-gray-600 text-xl'>{movieDetail.title}</span>
                </div>
              </div>
              {movieDetail.poster_path &&
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`}
                  alt={movieDetail.title}
                  width={200}
                  height={200}
                  className='mx-auto'
                />
              }
              <div className='flex'>
                {movieDetail.genres.map((genre) => (
                  <div key={genre.id} className='movie_tag'>{genre.name}</div>
                ))}
              </div>
              <div className='my-5'>{movieDetail.overview}</div>
              <div className='text-2xl font-bold text-center text-gray-600'>「{movieDetail.tagline}」</div>
            </div>
          }
          {trailerUrl?.results[0]?.key && (
            <div>
              <iframe
                src={`https://www.youtube.com/embed/${trailerUrl.results[0]?.key}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
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
