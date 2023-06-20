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
      <div className='w-8/12  mx-auto font-mono'>
        <div className='mt-24'>
          <div className='text-4xl font-bold text-center'>Recommended movies</div>
          <div className='flex flex-wrap justify-center mt-10'>
            {movieRecommend && movieRecommend.results.map((movie) => (
              <div key={movie.id}>
                <div>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    width={100}
                    height={100}
                  />
                </div>
              </div>
            ))}
          </div>
          {movieDetail &&
            <div className='mx-auto'>
              <div className='text-4xl font-bold text-center my-10'>

                {movieDetail.original_title}
              </div>
              {movieDetail.title}
              {movieDetail.poster_path &&
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`}
                  alt={movieDetail.title}
                  width={200}
                  height={200}
                />
              }
              <div className='flex'>
                {movieDetail.genres.map((genre) => (
                  <div key={genre.id}>{genre.name}</div>
                ))}
              </div>
              <div>{movieDetail.tagline}</div>
              <div>{movieDetail.overview}</div>
            </div>
          }
          {trailerUrl && (
            <div>
              <iframe
                src={`https://www.youtube.com/embed/${trailerUrl.results[0].key}`}
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
