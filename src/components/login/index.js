import React, { useContext, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import useForm from "react-hook-form";
import { withRouter } from "react-router-dom";
import { AuthContext } from './../../contexts/authContext';
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        width: "100%",
        "& > * ": {
            marginTop: theme.spacing(2),
        },
    },
    textField: {
        width: "40ch",
    },
    submit: {
        marginRight: theme.spacing(2),
    },
    snack: {
        width: "50%",
        "& > * ": {
            width: "100%",
        },
    },
}));

const LoginForm = props => {
    const context = useContext(AuthContext);
    const classes = useStyles();
    const { register, handleSubmit, errors, reset } = useForm();

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e) => {
      context.authenticate(userName, password);
    };

    const { from } = props.location.state || { from: { pathname: "/" } };

    if (context.isAuthenticated === true) {
      return <Redirect to={from} />;
    }

    return (
        <Box component="div" className={classes.root}>
        <Typography component="h2" variant="h3">
          Please log in
        </Typography>

        <form
          className={classes.root}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <TextField
            className={classes.textField}
            variant="outlined"
            margin="normal"
            required
            id="name"
            label="user name"
            name="name"
            autoFocus
            inputRef={register({ required: "User name required" })}
            onBlur={e => {setUserName(e.target.value)}}
          />
          <TextField
            className={classes.textField}
            variant="outlined"
            margin="normal"
            required
            id="name"
            label="password"
            name="password"
            type="password"
            inputRef={register({ required: "Password required" })}
            onBlur={e => {setPassword(e.target.value)}}
          />
          {errors.name && (
            <Typography variant="h6" component="p">
              {errors.name.message}
            </Typography>
          )}
          <Box className={classes.buttons}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
            <Button
              type="reset"
              variant="contained"
              color="secondary"
              className={classes.submit}
              onClick={() => {
                reset({
                  userName: "", password: ""
                });
              }}
            >
              Reset
            </Button>
          </Box>
          <p>Not Registered?
            <Link to="/signup">Sign Up!</Link>
          </p>
        </form>
        </Box>
    );
}

export default withRouter(LoginForm);

