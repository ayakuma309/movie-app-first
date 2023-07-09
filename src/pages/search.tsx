import { NextPage } from "next";
import React, { useState } from "react";
import SearchForm from "@/components/search/SearchForm";
import { MovieInfo } from "@/types/Types";
import Layout from "@/components/common/Layout";
import MovieItem from "@/components/search/MovieItem";
//検索画面
const Search: NextPage = () => {
    const [query, setQuery] = useState<string>("");
    const [movies, setMovies] = useState<MovieInfo[]>([]);

    return (
        <Layout title="Search">
            <div className="container mx-auto mt-24 pb-16 text-black sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
                <SearchForm
                    query={query}
                    setQuery={setQuery}
                    setMovies={setMovies}
                />
                <MovieItem movies={movies} />
            </div>
        </Layout>
    );
};
export default Search;
