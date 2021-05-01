import React, { useEffect, useState } from "react";
import PageTemplate from "../components/top100MovieList";
import { getTop100Movies } from "../api/tmdb-api"

const Top100MoviesPage = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getTop100Movies().then(movies => {
            setMovies(movies);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <PageTemplate
            title="Top Rated Movies"
            movies={movies}
        />
    );
};

export default Top100MoviesPage;