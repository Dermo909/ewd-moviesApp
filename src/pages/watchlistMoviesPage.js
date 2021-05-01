import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContexts";
import RemoveFromWatchlist from "../components/cardIcons/removeFromWatchlist";


const WatchlistMoviesPage = () => {
  const context = useContext(MoviesContext);
  const { upcoming } = context;
  const watchlistMovies = upcoming.filter((m) => m.playlist);

  const isLoggedIn = localStorage.getItem('LoggedIn');

  const renderPage = () => {
    if (isLoggedIn === 'true') {
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

export default WatchlistMoviesPage;