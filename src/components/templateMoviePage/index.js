import React, { useState, useEffect } from "react";
import MovieHeader from "../headerMovie";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { getMovieImages } from "../../api/tmdb-api";
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridList: {
    width: 450,
    height: '100vh',
  },
}));

const TemplateMoviePage = ({ movie, children }) => {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  useEffect(() => {
    getMovieImages(movie.id).then((images) => {
      movie.mainPoster = images.length !== 0 ? images[0].file_path : movie.backdrop_path;
      console.log(images);
      setImages(images);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MovieHeader movie={movie} />

      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid item xs={3}>
          <div className={classes.root}>
            <GridList cellHeight={900} className={classes.gridList} cols={1}>
                <GridListTile key={movie.mainPoster} className={classes.gridListTile} cols={1}>
                  <Box>
                  <img 
                    src={`https://image.tmdb.org/t/p/w501/${movie.mainPoster}`}
                    alt={movie.mainPoster}
                  />
                  </Box>
                </GridListTile>
            </GridList>
          </div>
        </Grid>

        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateMoviePage;