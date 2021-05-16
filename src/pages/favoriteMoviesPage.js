import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContexts";
import { AuthContext } from "../contexts/authContext";
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";
import { Redirect } from "react-router-dom";

const FavoriteMoviesPage = (props) => {
  const context = useContext(MoviesContext);
  const { favouriteMovies } = context;
  const auth = useContext(AuthContext);
  if (auth.isAuthenticated === false) {
    return <Redirect to={'/unathorised'} />;
  }

  console.log('favouritesMoviePage, context: ', context);

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