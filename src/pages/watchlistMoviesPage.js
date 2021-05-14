import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContexts";
import RemoveFromWatchlist from "../components/cardIcons/removeFromWatchlist";


const WatchlistMoviesPage = (props) => {
  const context = useContext(MoviesContext);
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