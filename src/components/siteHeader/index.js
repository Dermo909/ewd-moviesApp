import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { withRouter, Link } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { AuthContext } from "../../contexts/authContext";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  offset: theme.mixins.toolbar,
}));

const SiteHeader = ( { history }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const auth = useContext(AuthContext);
  const userName = localStorage.getItem('userName');
  const signOutText = `Sign Out ${userName}`;

  const menuOptions = [
    { label: "Discover", path: "/" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Favourites", path: "/movies/favorites" },
    { label: "Watchlist", path: "/movies/watchlist" },
    { label: "Top Rated Movies", path: "/movies/top100" },
    { label: "Sign Out", path: "/login" },
  ];

  const handleMenuSelect = async (option) => {
    if (option.label === "Sign Out") {
      await auth.signout();
      history.push(option.path);
    } else {
      history.push(option.path);
    }
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            TMDB Client
          </Typography>
            {isMobile ? (
              <>
                <IconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={open}
                  onClose={() => setAnchorEl(null)}
                >
                  {menuOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </Menu>
                
              </>
            ) : (
              <>
                {/* {menuOptions.map((opt) => (
                  <Button
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </Button>
                ))} */}
                {auth.isAuthenticated ? menuOptions.map((opt) => (
                  <Button
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt)}
                  >
                    {opt.label}
                  </Button>)
                )  : (<Link to={`/login`} style={{ textDecoration: 'none' }}>Sign In</Link>)
                }
              </>
            )}
        </Toolbar>
      </AppBar>
      <div className={classes.offset} />
    </>
  );
};

export default withRouter(SiteHeader);