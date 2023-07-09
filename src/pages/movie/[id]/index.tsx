import React, { useEffect, useState, useMemo } from "react";
import { NextPage, GetServerSideProps } from "next";
import YouTube from "react-youtube";
import { TwitterIcon, TwitterShareButton } from "react-share";
import { RecommendProps } from "@/types/Types";
import useMovies from "@/hooks/useMovies";
//components
import Layout from "@/components/common/Layout";
import RecommendModal from "@/components/recommend/RecommendModal";
import { Circles } from "react-loader-spinner";
import Link from "next/link";

const RecommendMovie: NextPage<RecommendProps> = ({ id }: RecommendProps) => {
    const { movieDetail, movieRecommend, trailerUrl } = useMovies(id);

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
        if (movieDetail && movieRecommend && trailerUrl) {
            setLoading(false); // データの取得が完了したらloadingをfalseに設定
        }
    }, [movieDetail, movieRecommend, trailerUrl]);

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
                                {movieRecommend &&
                                    movieRecommend.map((movie) => (
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
                    <div className="glass_card my-24">
                        {movieDetail && (
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
