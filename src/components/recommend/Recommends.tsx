import { RecommendMovieProps } from '@/types/Types'
import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import RecommendModal from './RecommendModal'
import { TwitterIcon, TwitterShareButton } from 'react-share'

type RecommendMoviesProps = {
  movieRecommend: RecommendMovieProps[]
  movieListShare: string | null
  id: number
}
const Recommends:NextPage<RecommendMoviesProps> = ({ movieRecommend, movieListShare, id }) => {
  return (
    <div>
      {movieRecommend?.length == 0 ? (
        <div>
          <p className="text-center text-black">
              おすすめはありませんでした
          </p>
          <Link href={`/search`}>
            <button className="flex items-center justify-center  px-10 py-4 text-base font-medium text-center text-neutral-600 transition duration-500 ease-in-out transform bg-white mx-auto rounded-xl my-2">
                選び直す
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <div className="text-4xl font-bold text-center">
              Recommended movies
          </div>
          <div className="text-center mt-5">
              <TwitterShareButton
                  title={`${movieListShare}\n${`https://movie-wizard.vercel.app/`}`}
                  hashtags={["MovieWizard", "おすすめ映画"]}
                  url={`https://movie-wizard.vercel.app/movie/${id}`}
              >
                  <TwitterIcon
                      className="text-white font-bold rounded-full"
                      size={"32px"}
                  />
              </TwitterShareButton>
          </div>
          <div className="flex flex-wrap justify-center mt-5">
            {movieRecommend.map((movie) => (
              <RecommendModal
                key={movie.id}
                id={movie.id}
                title={movie.title}
                poster_path={movie.poster_path}
                overview={movie.overview}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Recommends
