import React, { useContext, useEffect, useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContexts";
import RemoveFromWatchlist from "../components/cardIcons/removeFromWatchlist";
import { AuthContext } from "../contexts/authContext";
import { Redirect } from "react-router-dom";
import { getUserWatchlist } from './../api/movie-api';

const WatchlistMoviesPage = (props) => {
  const context = useContext(MoviesContext);
  const auth = useContext(AuthContext);
  const unathorised = '/unathorised';
  const [watchlistMovies, setWatchlistMovies] = useState([]);

  useEffect(() => {
    getUserWatchlist(auth.userName).then((r) => {
      setWatchlistMovies(r);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  if (auth.isAuthenticated === false) {
    return <Redirect to={unathorised} />;
  }
  
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