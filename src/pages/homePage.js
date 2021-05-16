import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContexts";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import { AuthContext } from "../contexts/authContext";
import { Redirect } from "react-router-dom";

const HomePage = (props) => {
  const context = useContext(MoviesContext);
  const { movies  } = context;
  const auth = useContext(AuthContext);
  if (auth.isAuthenticated === false) {
    //return <Redirect to={'/unathorised'} />;
    props.history.push('/login');
  }
  console.log('homepage movies:', movies);
  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
    />
  );
};

export default HomePage;