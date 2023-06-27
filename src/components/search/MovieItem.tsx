import React, { useState } from 'react'
import { MovieItemProps, RecommendProps } from '../../types/Types';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Circles } from 'react-loader-spinner';

const RecommendItem: NextPage<MovieItemProps> = ({ movies }) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter();

  const onClickSelect = (movie: RecommendProps) => {
    setIsLoading(true);
    router.push(`/movie/${movie.id}`);
  }

  return (
    <div className="flex flex-wrap mx-auto justify-center">
      {movies && movies
        .filter((movie) => movie.poster_path)
        .map((movie) => (
          <div className="card_movie mx-auto" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              width={200}
              height={300}
            />
            <p className="text-center font-bold text-gray-900 text-lg my-2">{movie.title}</p>
            {isLoading ? (
              <>
                <Circles
                  height="80"
                  width="80"
                  color="#A55EAD"
                  ariaLabel="circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </>
            ) : (
              <button
                className="flex items-center justify-center w-full my-2 px-10 py-4 text-base font-medium text-center text-neutral-900 transition duration-500 ease-in-out transform bg-gradient-to-r from-indigo-600 to-indigo-300 rounded-xl hover:from-indigo-300 hover:to-indigo-600 hover:text-white"
                onClick={() => {
                  onClickSelect(movie);
                }}
                >
                おすすめを探す！
              </button>
            )}
          </div>
        ))}
    </div>
  )
}

export default RecommendItem
