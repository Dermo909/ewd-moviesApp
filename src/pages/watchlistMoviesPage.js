import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContexts";
import RemoveFromWatchlist from "../components/cardIcons/removeFromWatchlist";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
      marginTop: theme.spacing(2),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
  },
  form: {
      width: "100%",
      "& > * ": {
          marginTop: theme.spacing(2),
      },
  },
  textField: {
      width: "40ch",
  },
}));

const WatchlistMoviesPage = () => {
  const context = useContext(MoviesContext);
  const { upcoming } = context;
  const watchlistMovies = upcoming.filter((m) => m.playlist);
  const classes = useStyles();

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
      //return <h1>You need to be logged in to access this page</h1>;
      return (
        <div className={classes.root}>
        <Typography component="h2" variant="h3">
        You need to be logged in to view watchlist
      </Typography>
      <div><Link to={`/login`}>Log in</Link>
      </div></div>
      );
    }
  }

  return (
    <div>
      {renderPage()}
    </div>
  );
};

export default WatchlistMoviesPage;