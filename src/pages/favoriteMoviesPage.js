import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContexts";
import { AuthContext } from "../contexts/authContext";
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";
import { getUserFavourites } from './../api/movie-api';

const FavoriteMoviesPage = (props) => {
  const context = useContext(MoviesContext);
  const { favouriteMovies } = context;

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