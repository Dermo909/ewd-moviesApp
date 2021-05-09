import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CalendarIcon from "@material-ui/icons/CalendarTodayTwoTone";
import StarRateIcon from "@material-ui/icons/StarRate";
import Grid from "@material-ui/core/Grid";
import img from '../../images/film-poster-placeholder.png'
import Avatar from "@material-ui/core/Avatar";
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import Box from '@material-ui/core/Box';
const useStyles = makeStyles({
  card: { maxWidth: 250 },
  media: { height: 400 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
});

export default function MovieCard({ movie, action }) {
  const classes = useStyles();
  console.log('movieCard');
  return (

    <Card className={classes.card}>
      {/* <CardHeader
        className={classes.header}
        avatar={
          movie.favorite ? (
            <Avatar className={classes.avatar}>
              <FavoriteIcon />
            </Avatar>
          ) : movie.playlist ? (
            <Avatar className={classes.avatar}>
              <PlaylistAddCheckIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {movie.title}{" "}
          </Typography>
        }
      /> */}
      <Link to={`/movies/${movie._id}`}>
      <CardMedia
        className={classes.media}
        image={
          movie.poster_path !== 'null'
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : img
        }
      />
      </Link>
      <CardContent>
        <Grid container>
        <Grid item xs={12}>
            <Typography variant="h6">
              <Box fontWeight="fontWeightBold" fontSize={18}>
                {movie.title}
              </Box>
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={8}>
            <Typography variant="h6">
              <Box fontWeight="fontWeightMedium" fontSize={14}>
              <CalendarIcon fontSize="small" />
              {movie.release_date}
              </Box>
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h6">
            <Box fontWeight="fontWeightMedium" fontSize={14}>
              <StarRateIcon fontSize="small" />
              {"  "} {movie.vote_average}{" "}
              </Box>
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      {/* <CardActions disableSpacing>
        {action(movie)}

        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions> */}
    </Card>
  );
}