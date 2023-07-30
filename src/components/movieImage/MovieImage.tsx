import { NextPage } from 'next'
import React from 'react'

type  MovieImagesProps = {
  movieImage: {
    file_path: string
  }[]
}
const MovieImage:NextPage<MovieImagesProps> = ({ movieImage }) => {
  return (
    <div className="overflow-x-scroll flex scrollhide">
      {movieImage.map((image, index) => (
        <div
          className="w-80"
          style={{ minWidth: "20rem" }}
          key={index}
        >
          <img
            placeholder="blur"
            alt="image in not available"
            src={`https://image.tmdb.org/t/p/original/${image.file_path}`}
            width={500}
            height={300}
            style={{
                maxWidth: "100%",
                height: "auto",
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default MovieImage
