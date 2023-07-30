import { MovieDetailProps } from '@/types/Types'
import { NextPage } from 'next'
import React from 'react'

type MovieDetailsProps = {
  movieDetail: MovieDetailProps
}
const MovieDetail:NextPage<MovieDetailsProps> = ({movieDetail}) => {
  return (
    <div>
      <div className="my-10">
        <div className="text-4xl font-bold text-center">
            {movieDetail.original_title}
            <br />
            <span className="text-gray-600 text-xl">
                {movieDetail.title}
            </span>
        </div>
      </div>
      {movieDetail.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500/${movieDetail.poster_path}`}
          alt={movieDetail.title}
          width={200}
          height={200}
          className="mx-auto"
        />
      )}
      <div className="flex justify-center mt-5">
        {movieDetail.genres.map((genre) => (
          <div
              key={genre.id}
              className="movie_tag"
          >
              {genre.name}
          </div>
        ))}
      </div>
      <div className="my-5">
        {movieDetail.overview}
      </div>
      <div className="text-2xl font-bold text-center text-gray-600 mb-5">
        {movieDetail.tagline}
      </div>
  </div>
  )
}

export default MovieDetail
