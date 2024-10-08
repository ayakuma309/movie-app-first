import React, { useEffect } from "react";
import {
    RecommendMovieProps,
    MovieDetailProps,
    MovieVideoProps,
    MovieImageProps,
} from "../types/Types";

const useMovies = (id: number) => {
    const [movieData, setMovieData] = React.useState<{
        movieDetail: MovieDetailProps | null;
        movieRecommend: RecommendMovieProps[] | null;
        trailerUrl: MovieVideoProps | null;
        movieImage: MovieImageProps[] | null;
    }>({
        movieDetail: null,
        movieRecommend: null,
        trailerUrl: null,
        movieImage: null,
    });

    const APIKEY = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const detailUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=ja`;
                    const recommendUrl = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${APIKEY}&language=ja&page=1`;
                    const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${APIKEY}&language=ja`;
                    const imageUrl = `https://api.themoviedb.org/3/movie/${id}/images?api_key=${APIKEY}`;

                    // 3つの異なるAPIエンドポイントに対して非同期なHTTPリクエストを行う
                    const [detailRes, recommendRes, videoRes, imageRes] =
                        await Promise.all([
                            fetch(detailUrl),
                            fetch(recommendUrl),
                            fetch(videoUrl),
                            fetch(imageUrl),
                        ]);
                    // レスポンスデータを格納
                    const [detailData, recommendData, videoData,imageData] =
                        await Promise.all([
                            detailRes.json(),
                            recommendRes.json(),
                            videoRes.json(),
                            imageRes.json(),
                        ]);
                    // レスポンスから取得したデータをステートに設定
                    setMovieData({
                        movieDetail: detailData,
                        movieRecommend: recommendData.results,
                        trailerUrl: videoData,
                        movieImage: imageData.backdrops,
                    });
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    return movieData;
};

export default useMovies;
