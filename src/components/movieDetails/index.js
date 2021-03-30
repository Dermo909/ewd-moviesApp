import React from "react";
import { useState } from "react";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import StarRate from "@material-ui/icons/StarRate";
import NavigationIcon from "@material-ui/icons/Navigation";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import MovieReviews from "../movieReviews"
import Box from '@material-ui/core/Box';
import { excerpt } from "../../../src/utils";
import { Link } from "react-router-dom";
const theme = {
  spacing: 8,
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(1.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  genreList: {
    display: "inline"
  },
  tagline: {
    fontStyle: "oblique"
  },
  crewTitle: {
    fontWeight: "fontWeightBold",
    flexBasis: "33%",
    maxWidth: "33%"
  },
  crewName: {
    flexBasis: "33%",
    maxWidth: "33%",
    color: "grey"
  },
  container: {
    display: "flex",
    maxWidth: "100%"
  },
  actorDetails: {
    flexBasis: "33%",
    maxWidth: "33%",

    margin: "10px",
    fontSize: "1rem",
  },
  actorName: {
    fontWeight: "fontWeightBold",
  },
  characterName: {
    fontSize: ".75rem",
    color: "grey",
  },
  imgSize: {
    height: "75px",
    borderRadius: "16px"
  },
  reviewAuthor: {
    fontWeight: "fontWeightBold"
  }
}));

const MovieDetails = ({ movie }) => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => {
    return () => setDrawerOpen(open);
  };

  // Just show 8 actors
  const actors = movie.castAndCrew.sortedActors.splice(8);
  console.log('avatar path: ', movie.topReview.author_details.avatar_path);

  return (
    <Box>
      <Box>
      <Typography variant="h6" component="span">
        <Chip icon={<StarRate />} label={`${movie.vote_average}`} />
        {movie.genres.map((g) => (
          <Chip key={g.name} label={g.name} className={classes.chip} />
        ))}
        <Box>
          Favourite Watchlist
        </Box>
        <br />
        <Box className={classes.tagline}>
          {movie.tagline}
        </Box>
        <br />
        <Box>
          {movie.overview}
        </Box>
        <br />

        <Box className={classes.container}>
          <Box className={classes.crewTitle}>Director<br /><span className={classes.crewName}>{movie.castAndCrew.director.name}</span></Box>
          <Box className={classes.crewTitle}>Producer <br /><span className={classes.crewName}>{movie.castAndCrew.producer.name}</span></Box>
          <Box className={classes.crewTitle}>Writer <br /><span className={classes.crewName}>{movie.castAndCrew.writer.name}</span></Box>
        </Box>
       </Typography>
       </Box>
        <br />
        <Box className={classes.container}>
        {movie.castAndCrew.sortedActors.map((a) => ( 
          <Paper key={a.original_name} className={classes.actorDetails}>
            <img classes={classes.imgSize} src={`https://image.tmdb.org/t/p/w92/${a.profile_path}`} alt={a.profile_path} />
            <br />
            <span classes={classes.actorName}>{a.original_name}</span><br />
            <span classes={classes.characterName}>{a.character}</span>
          </Paper>))}
        </Box>
      <Box>
        <Paper>
          <Box display="flex" flexDirection="row">
            <Box display="flex" flexDirection="column" m={2}>
              <img src={movie.topReview.author_details.avatar_path} alt={movie.topReview.author_details.avatar_path} />
            </Box>
            <Box display="flex" flexDirection="column" m={2}>
                <Box component="span" m={1} display="block" classes={classes.reviewAuthor}>A review by {movie.topReview.author}</Box>
                <Box component="span" m={1} display="block" classes={classes.reviewAuthor}>Review written {movie.topReview.created_at}</Box>
                <Box component="span" m={1} display="block">{excerpt(movie.topReview.content)}</Box>
                <Box component="span" m={1} display="block">{movie.topReview.rating}</Box>
                <Box component="span" m={1} display="block">
                  <Link
                    to={{
                      pathname: `/reviews/${movie.topReview.id}`,
                      state: {
                        review: movie.topReview,
                        movie: movie,
                      },
                    }}
                    >
                    Full Review
                  </Link>
                </Box>
            </Box>
            </Box>
        </Paper>
      </Box>

      <Box>
      <Fab
        color="secondary"
        variant="extended"
        onClick={toggleDrawer(true)}
        className={classes.fab}
      >
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={toggleDrawer(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
      </Box>
    </Box>
  );
};

export default  MovieDetails ;