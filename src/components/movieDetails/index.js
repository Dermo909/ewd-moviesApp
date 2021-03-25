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
}));

const MovieDetails = ({ movie }) => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => {
    return () => setDrawerOpen(open);
  };

  return (
    <><Paper component="ul" className={classes.root}>
      <Typography variant="h6" component="p">
        <Chip icon={<StarRate />} label={`${movie.vote_average}`} />
        {movie.genres.map((g) => (
          <Chip label={g.name} className={classes.chip} />
        ))}
        <br />
        {movie.overview}
        <br />
      </Typography>
      </Paper>

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
    </>
  );
};

export default  MovieDetails ;