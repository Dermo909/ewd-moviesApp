import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContexts";
import RemoveFromWatchlist from "../components/cardIcons/removeFromWatchlist";
import { AuthContext } from "../contexts/authContext";
import { Redirect } from "react-router-dom";

const WatchlistMoviesPage = (props) => {
  const context = useContext(MoviesContext);
  const auth = useContext(AuthContext);
  const unathorised = '/unathorised';

  if (auth.isAuthenticated === false) {
    return <Redirect to={unathorised} />;
  }

  const { watchlistMovies } = context;
  console.log('watchlistMoviePage, context: ', context);
  
  const renderPage = () => {

    return (
      <PageTemplate
        title="Watchlist"
        movies={watchlistMovies}
        action={(movie) => {
          return (
            <>
              <RemoveFromWatchlist movie={movie} />
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

export default WatchlistMoviesPage;