import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from './../../contexts/authContext';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Link } from "react-router-dom";
import useForm from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";

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

const SignUpPage = props => {
  const context = useContext(AuthContext)
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);
  const { register, handleSubmit, errors, reset } = useForm();
  const classes = useStyles();

  const onSubmit = () => {
    if (password.length > 0 && password === passwordAgain) {
        console.log('Calling register');
      context.register(userName, password);
      setRegistered(true);
    }
  }

  const { from } = props.location.state || { from: { pathname: "/" } };

  if (registered === true) {
    return <Redirect to={from} />;
  }

  return (
    <Box component="div" className={classes.root}>
    <Typography component="h2" variant="h3">
      Please enter your details
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
        autoFocus
        inputRef={register({ required: "Password required" })}
        onBlur={e => {setPassword(e.target.value)}}
      />
      <TextField
        className={classes.textField}
        variant="outlined"
        margin="normal"
        required
        id="name"
        label="password"
        name="passwordAgain"
        type="password"
        autoFocus
        inputRef={register({ required: "Confirm password required" })}
        onBlur={e => {setPasswordAgain(e.target.value)}}
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
    </form>
    </Box>
  );
};

export default SignUpPage;