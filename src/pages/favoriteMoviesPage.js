import React, { useContext, useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContexts";
import { AuthContext } from "../contexts/authContext";
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";
import { Redirect } from "react-router-dom";
import { getUserFavourites } from './../api/movie-api';

const FavoriteMoviesPage = (props) => {
  const context = useContext(MoviesContext);
  const auth = useContext(AuthContext);
  const [favouriteMovies, setFavouriteMovies] = useState([]);

  useEffect(() => {
    getUserFavourites(auth.userName).then((r) => {
      setFavouriteMovies(r);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (auth.isAuthenticated === false) {
    return <Redirect to={'/unathorised'} />;
  }

  const renderPage = () => {
      return (
        <PageTemplate
          title="Favourite Movies"
          movies={favouriteMovies}
          action={(movie) => {
            return (
              <>
                <RemoveFromFavorites movie={movie} />
                <WriteReview movie={movie} />
              </>
            );
          }}
        />
      );

  }

  return (
    <div>
      {renderPage()}
    </div>
  );
};

export default FavoriteMoviesPage;