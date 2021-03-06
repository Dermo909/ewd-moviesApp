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
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import AddToFavoritesIcon from '../cardIcons/addToFavorites';
import AddToPlaylistIcon from '../cardIcons/addToPlaylist';
import FavoriteIcon from "@material-ui/icons/Favorite";
import Avatar from "@material-ui/core/Avatar";
import WriteReview from "../cardIcons/writeReview";

const theme = {
  spacing: 8,
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    //justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(1.5),
    margin: 0,
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
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
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
    height: "250px"
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
}));

function ShowFavoriteIcon(props) {
  console.log('props: ', props);
  const isFavorite = props.favorite;

  if (isFavorite) {
    console.log('Is favorite');
    return <FavoriteIcon />;
  } else {
    console.log('Is not favorite');
    return <AddToFavoritesIcon movie={props}/>;
  }
}


const MovieDetails = ({ movie, action }) => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => {
    return () => setDrawerOpen(open);
  };

  const favIcon = ShowFavoriteIcon(movie);

  // Just show actors with images
  const actors = movie.castAndCrew.sortedActors.filter(x => x.file_path !== undefined);

  const handleGenreClick = () => {
    console.info('You clicked the Chip.');
  };

  return (
    <Box>
      <Box>
      <Typography variant="h6" component="span">
          {(() => {
            if (movie.userRating !== null) {
              return <Chip icon={<StarRate />} label={`${movie.userRating}`}     style={{

                backgroundColor: "#32a852"

            }}/>;
            } else {
              return <Chip icon={<StarRate />} label={`${movie.vote_average}`} />;
            }
          })()}
        
        {movie.genres.map((g) => (
          <Chip key={g.name} label={g.name} className={classes.chip} onClick={handleGenreClick}/>
        ))}
        <Box display="flex" flexDirection="row">
          {/* {favIcon } */}
          <AddToFavoritesIcon movie={movie}/>
          <AddToPlaylistIcon movie={movie}/>
          <Box>
            {(() => {
              if (movie.userRating === null) {
                return <WriteReview movie={movie} />;
              }
            })()}
          </Box>
          
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
        <br />
        <GridList className={classes.gridList} cols={9}>
        {movie.castAndCrew.sortedActors.map((actor) => (
          <GridListTile key={actor.original_name}>
            <a href={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}>
            <img src={`https://image.tmdb.org/t/p/w154/${actor.profile_path}`} alt={actor.profile_path} />
            </a>
            <GridListTileBar
              title={actor.original_name}
              classes={{
                root: classes.titleBar,
              }}
            />
          </GridListTile>
        ))}
      </GridList>

        {/* {movie.castAndCrew.sortedActors.map((a) => ( 
          <Paper key={a.original_name} className={classes.actorDetails}>
            <img classes={classes.imgSize} src={`https://image.tmdb.org/t/p/w92/${a.profile_path}`} alt={a.profile_path} />
            <br />
            <span classes={classes.actorName}>{a.original_name}</span><br />
            <span classes={classes.characterName}>{a.character}</span>
          </Paper>))} */}
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
        All Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={toggleDrawer(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
      </Box>
    </Box>
  );
};

export default  MovieDetails ;