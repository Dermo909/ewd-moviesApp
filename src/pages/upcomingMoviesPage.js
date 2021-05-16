import React, { useContext } from "react";
import PageTemplate from '../components/templateMovieListPage'
import { MoviesContext } from "../contexts/moviesContexts";
import AddToPlaylistIcon from '../components/cardIcons/addToPlaylist';
import { AuthContext } from "../contexts/authContext";
import { Redirect } from "react-router-dom";

const UpcomingMoviesPage = (props) => {
  const context = useContext(MoviesContext);
  const { upcoming } = context;
  const auth = useContext(AuthContext);
  if (auth.isAuthenticated === false) {
    return <Redirect to={'/unathorised'} />;
  }
  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={upcoming}
      action={(movie) => {
        return <AddToPlaylistIcon movie={movie} />
      }}
    />
  );
};
export default UpcomingMoviesPage;