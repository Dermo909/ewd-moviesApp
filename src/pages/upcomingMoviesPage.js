import React, { useContext, useEffect, useState } from "react";
import PageTemplate from '../components/templateMovieListPage'
import { MoviesContext } from "../contexts/moviesContexts";
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist';
import { getUpcomingMovies} from '../api/tmdb-api';

const UpcomingMoviesPage = (props) => {

  const context = useContext(MoviesContext);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getUpcomingMovies().then(movies => {
      setMovies(movies);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />
      }}
    />
  );
};
export default UpcomingMoviesPage;