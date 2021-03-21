import React, { useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getTop100Movies } from "../api/tmdb-api"
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist';

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
            title="Top 100 Movies"
            movies={movies}
            action={(movie) => {
                return <AddToPlaylistIcon movie={movie} />
              }}
        />
    );
};

export default Top100MoviesPage;