import { NextPage, GetServerSideProps } from 'next';
import React from 'react';
import { RecommendProps } from '@/types/Types';
import useMovies from '@/hooks/useMovies';
import Image from 'next/image';
import Layout from '@/components/common/Layout';
import RecommendModal from '@/components/recommend/RecommendModal';
import ShareButton from 'react-share/lib/ShareButton';
import { TwitterIcon, TwitterShareButton } from 'react-share';


const RecommendMovie: NextPage<RecommendProps> = ({ id }: RecommendProps) => {
  const { movieDetail, movieRecommend, trailerUrl } = useMovies(id);

  const movieListShare = React.useMemo(() => {
    if (!movieRecommend || !movieDetail) return null;
    // 上位5件のおすすめ映画タイトル
    const recommendedMovieTitles = movieRecommend.slice(0, 5).map((movie) => movie.title).join('\n');
    return `${movieDetail.title}\n${recommendedMovieTitles}\n`;
  }, [movieDetail, movieRecommend]);


  return (
    <Layout title="Recommended movies">
      <div className='w-9/12  mx-auto font-mono'>
        <div className='mt-24'>
          <div className='text-4xl font-bold text-center'>Recommended movies</div>
          <div className='text-center mt-5'>
            <TwitterShareButton
              title={`${movieListShare}`}
              hashtags={["MovieWizard", "おすすめ映画"]}
              url={`https://movie-wizard.vercel.app/movie/${id}`}
            >
              <TwitterIcon className="text-white font-bold rounded-full" size={"32px"}/>
            </TwitterShareButton>
          </div>
          <div className='flex flex-wrap justify-center mt-5'>
            {movieRecommend && movieRecommend.map((movie) => (
              <RecommendModal
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                overview={movie.overview}
              />
            ))}
          </div>
          <div className='glass_card my-24'>
            {movieDetail &&
              <div>
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
                <div className='flex justify-center mt-5'>
                  {movieDetail.genres.map((genre) => (
                    <div key={genre.id} className='movie_tag'>{genre.name}</div>
                  ))}
                </div>
                <div className='my-5'>{movieDetail.overview}</div>
                <div className='text-2xl font-bold text-center text-gray-600 mb-5'>{movieDetail.tagline}</div>
              </div>
            }
            {trailerUrl?.results[0]?.key && (
              <div className="mx-auto">
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
