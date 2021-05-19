import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContexts";
import IconButton from "@material-ui/core/IconButton";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';

const AddToPlaylistIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleAddToPlaylist = (e) => {
    const loggedIn = localStorage.getItem('LoggedIn');
    if (loggedIn === 'true') {
      e.preventDefault();
      context.addToPlaylist(movie.id);
      setOpen(true);
    } else {
      setError(true);
    }
  };

  const handleClose = (event, reason) => {
    setOpen(false);
    setError(false);
  };

  return (
    <Box>
    <IconButton aria-label="add to playlist" onClick={handleAddToPlaylist}>
      <PlaylistAddIcon color="primary" fontSize="large" />
    </IconButton>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Movie added to watchlist!
        </Alert>
      </Snackbar>
      <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
        You need to be logged in to add to watchlist!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AddToPlaylistIcon;