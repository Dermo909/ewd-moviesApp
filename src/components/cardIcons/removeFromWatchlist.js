import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { MoviesContext } from "../../contexts/moviesContexts";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';

const RemoveFromWatchlistIcon = ({ movie }) => {
  const context = useContext(MoviesContext);
  const [open, setOpen] = React.useState(false);

  const handleRemoveFromWatchlist = (e) => {
    e.preventDefault();
    context.removeFromPlaylist(movie.id);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  return (
    <Box>
    <IconButton aria-label="remove from watchlist" onClick={handleRemoveFromWatchlist} >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Movie added to favorites!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default RemoveFromWatchlistIcon;