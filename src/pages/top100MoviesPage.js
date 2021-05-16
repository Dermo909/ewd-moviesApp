import React, { useEffect, useState, useContext } from "react";
import PageTemplate from "../components/top100MovieList";
import { getTop100Movies } from "../api/tmdb-api"
import { AuthContext } from "../contexts/authContext";
import { Redirect } from "react-router-dom";

const Top100MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const auth = useContext(AuthContext);

    useEffect(() => {
        if (auth.isAuthenticated === false) {
            return <Redirect to={'/unathorised'} />;
          }
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