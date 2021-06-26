import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  AppBar,
  Avatar,
  Toolbar,
  Typography,
  IconButton,
} from "@material-ui/core";
import decode from "jwt-decode";
import CreateIcon from "@material-ui/icons/Create";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { useStyles } from "./styles";

export default function Navbar({ isSignUp }) {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
    // eslint-disable-next-line
  }, []);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setUser(false);
    history.push("/");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.Link}>
              Inspire
            </Link>
          </Typography>
          {user ? (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <Link to="/create" className={classes.Link}>
                  <CreateIcon />
                </Link>
              </IconButton>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
                onClick={handleLogout}
              >
                <ExitToAppIcon />
              </IconButton>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <Link to="/profile" className={classes.Link}>
                  <Avatar alt={user.result.name} src={user?.result.imageUrl}>
                    {user?.result.name.charAt(0)}
                  </Avatar>
                </Link>
              </IconButton>
            </div>
          ) : (
            <Typography variant="h6" component="h6">
              <Link to="/auth" className={classes.Link}>
                Login
              </Link>
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
