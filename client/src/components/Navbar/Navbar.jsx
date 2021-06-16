import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import CreateIcon from "@material-ui/icons/Create";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { useStyles } from "./styles";
import { Link } from "react-router-dom";

export default function MenuAppBar() {
  const classes = useStyles();
  const user = false;
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
              >
                <Link to="/login" className={classes.Link}>
                  <ExitToAppIcon />
                </Link>
              </IconButton>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <Link to="/profile" className={classes.Link}>
                  <AccountCircle />
                </Link>
              </IconButton>
            </div>
          ) : (
            window.location.pathname !== "/login" && (
              <Typography variant="h6" component="h6">
                <Link to="login" className={classes.Link}>
                  Login
                </Link>
              </Typography>
            )
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
