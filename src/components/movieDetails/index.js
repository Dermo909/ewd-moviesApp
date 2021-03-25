import React from "react";
import { useState } from "react";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import MonetizationIcon from "@material-ui/icons/MonetizationOn";
import StarRate from "@material-ui/icons/StarRate";
import NavigationIcon from "@material-ui/icons/Navigation";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import MovieReviews from "../movieReviews"
import { NoEncryption } from "@material-ui/icons";
import Box from '@material-ui/core/Box';
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
    display: "flex"
  },
  actorName: {
    fontSize: "1rem",
    flexBasis: "33%",
    maxWidth: "33%",
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

  return (
    <div>
      <Typography variant="h6" component="span">
        <Chip icon={<StarRate />} label={`${movie.vote_average}`} />
        {movie.genres.map((g) => (
          <Chip key={g.name} label={g.name} className={classes.chip} />
        ))}
        <div className={classes.tagline}>
          {movie.tagline}
        </div>
        <div>
          {movie.overview}
        </div>
        <br />

        <div className={classes.container}>
          <div className={classes.crewTitle}>Director<br /><span className={classes.crewName}>{movie.castAndCrew.director.name}</span></div>
          <div className={classes.crewTitle}>Producer <br /><span className={classes.crewName}>{movie.castAndCrew.producer.name}</span></div>
          <div className={classes.crewTitle}>Writer <br /><span className={classes.crewName}>{movie.castAndCrew.writer.name}</span></div>
        </div>
        <br />
        <div className={classes.container}>
        {movie.castAndCrew.sortedActors.map((a) => ( <Paper key={a.original_name} className={classes.actorName}>{a.original_name}</Paper>))}
        </div>
      </Typography>
        

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
    </div>
  );
};

export default  MovieDetails ;