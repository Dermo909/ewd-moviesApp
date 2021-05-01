import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContexts";
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
  const context = useContext(MoviesContext);
  const { movies } = context;
  const favoriteMovies = movies.filter((m) => m.favorite);

  const isLoggedIn = localStorage.getItem('LoggedIn');
  console.log('isLoggedIn:', isLoggedIn);

  const renderPage = () => {
    console.log('Rendering page, isLoggedIn:', isLoggedIn);
    if (isLoggedIn === 'true') {
      return (
        <PageTemplate
          title="Favorite Movies"
          movies={favoriteMovies}
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
    } else {
      return <h1>You need to be logged in to access this page</h1>;
    }
  }

  return (
    <div>
    {renderPage()}
    </div>
  );
};

export default FavoriteMoviesPage;