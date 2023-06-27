import React, { memo, useState } from 'react'
import Image from 'next/image'
import { MovieInfo } from '@/types/Types'
//styles
import { Modal } from "@mui/material";
import Link from 'next/link';

const RecommendModal: React.FC<MovieInfo> = ({id, poster_path, title, overview }) => {
  //modal用
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div
        className="glass_card glass_recommend_card"
        onClick={() => setOpen(true)}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
          alt={title}
          width={100}
          height={100}
          className='mx-auto'
        />
        <div className="whitespace-pre-line font-semibold text-gray-700 sm:text-base text-sm">
          {title}
        </div>
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="modal-card">
          <img
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt={title}
            width={200}
            height={100}
            className='mx-auto'
          />
          <div className="flex justify-center">
            <div className="text-gray-500 my-2">
              <span className="text-2xl font-bold">{title}</span>
              <Link href={`/movie/${id}`}>
                <button
                className="btn-color font-bold py-2 px-2 rounded mx-2 border border-gray-900"
                >
                  詳細へ
                </button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center whitespace-pre-line font-semibold text-gray-700 text-xl mb-3">
            {overview}
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default memo(RecommendModal);
