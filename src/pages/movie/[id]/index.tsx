import React, { useEffect, useState, useMemo } from "react";
import { NextPage, GetServerSideProps } from "next";
import { Circles } from "react-loader-spinner";
import YouTube from "react-youtube";
import { RecommendProps } from "@/types/Types";
import useMovies from "@/hooks/useMovies";
//components
import Layout from "@/components/common/Layout";
import Recommends from "@/components/recommend/Recommends";
import MovieImage from "@/components/movieImage/MovieImage";
import MovieDetail from "@/components/movieDetail/MovieDetail";

const RecommendMovie: NextPage<RecommendProps> = ({ id }: RecommendProps) => {
    const { movieDetail, movieRecommend, trailerUrl, movieImage } = useMovies(id);

    //share用の変数を定義
    const movieListShare = useMemo(() => {
        if (!movieRecommend || !movieDetail) return null;
        // 上位5件のおすすめ映画タイトル
        const recommendedMovieTitles = movieRecommend
            .slice(0, 5)
            .map((movie) => movie.title)
            .join("\n");
        return `${movieDetail.title}\n${recommendedMovieTitles}\n`;
    }, [movieDetail, movieRecommend]);

    const trailerURL = trailerUrl?.results[0]?.key;
    // YouTubeプレーヤーのオプション設定
    const opts = {
        height: "290",
        width: "100%",
        playerVars: {
            autoplay: 0,
        },
    };

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (movieDetail && movieRecommend && trailerUrl && movieImage) {
            setLoading(false); // データの取得が完了したらloadingをfalseに設定
        }
    }, [movieDetail, movieRecommend, trailerUrl, movieImage]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Circles
                    height="80"
                    width="80"
                    color="#A55EAD"
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        );
    }

    return (
        <Layout title="Movie Wizard">
            <div className="w-9/12  mx-auto font-mono">
                <div className="mt-24">
                    {movieRecommend && <Recommends  movieRecommend={movieRecommend} movieListShare={movieListShare} id={id}/>}
                    <div className="flex flex-col p-4 md:pt-8">
                        {movieImage && movieImage.length > 0 && (
                            <MovieImage movieImage={movieImage} />
                        )}
                    </div>
                    <div className="glass_card my-24">
                        {movieDetail && (
                            <MovieDetail movieDetail={movieDetail} />
                        )}
                        {trailerUrl?.results[0]?.key && (
                            <div className="mx-auto">
                                <YouTube videoId={trailerURL} opts={opts} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default RecommendMovie;

export const getServerSideProps: GetServerSideProps<RecommendProps> = async (
    context,
) => {
    const { id } = context.query; // クエリパラメータから'id'を取得

    // 'id'をnumberに変換する
    const parsedId = Number(id);

    // 'parsedId'を使用してRecommendPropsを作成
    const props: RecommendProps = { id: parsedId };

    return {
        props,
    };
};
