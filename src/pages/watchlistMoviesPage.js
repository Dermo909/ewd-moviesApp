import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContexts";
import RemoveFromWatchlist from "../components/cardIcons/removeFromWatchlist";


const WatchlistMoviesPage = () => {
  const context = useContext(MoviesContext);
  const { upcoming } = context;
  const watchlistMovies = upcoming.filter((m) => m.playlist);
  console.log('watchlistMovies: ', watchlistMovies);
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
};

export default WatchlistMoviesPage;