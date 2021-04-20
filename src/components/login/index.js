import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import useForm from "react-hook-form";
import { withRouter } from "react-router-dom";


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

const LoginForm = () => {
    const classes = useStyles();
    const { register, handleSubmit, errors, reset } = useForm();

    let name = '';

    const handleNameChange = (e) => {
        name = e.target.value;
    }

    const onSubmit = (e) => {
        // Saving to local storage to display users name on header
        localStorage.setItem('UserName', name);
        localStorage.setItem('LoggedIn', 'true');
    };

    return (
        <Box component="div" className={classes.root}>
            {name}
        <Typography component="h2" variant="h3">
          Please enter your name
        </Typography>

        <form
          className={classes.form}
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
            onBlur={handleNameChange}
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
                  name: ""
                });
              }}
            >
              Reset
            </Button>
          </Box>
        </form>
        </Box>
    );
}

export default withRouter(LoginForm);