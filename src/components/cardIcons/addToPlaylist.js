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

  const handleAddToPlaylist = (e) => {
    e.preventDefault();
    context.addToPlaylist(movie._id);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
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
    </Box>
  );
};

export default AddToPlaylistIcon;