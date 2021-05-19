import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContexts";
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

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

const FavoriteMoviesPage = () => {
  const context = useContext(MoviesContext);
  const { movies } = context;
  const classes = useStyles();
  const favoriteMovies = movies.filter((m) => m.favorite);

  const isLoggedIn = localStorage.getItem('LoggedIn');

  const renderPage = () => {
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
      //return <h1>You need to be logged in to access this page</h1>;
      return (
        <div className={classes.root}>
        <Typography component="h2" variant="h3">
        You need to be logged in to access this page
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

export default FavoriteMoviesPage;