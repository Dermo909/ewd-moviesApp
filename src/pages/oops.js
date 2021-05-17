import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
}));

const Oops = () => {
    const classes = useStyles();

    return (
        <Box component="div" className={classes.root}>
        <Typography component="h2" variant="h3">
          Oops, something went wrong
        </Typography>
        <p>
            <Link to="/login">Please sign in again</Link>
          </p>
        </Box>
    );
};

export default Oops;