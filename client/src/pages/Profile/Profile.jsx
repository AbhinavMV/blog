import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
} from "@material-ui/core";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  main: {
    flexGrow: 1,
    marginTop: 20,
  },
  mainImage: {
    width: "5rem",
    height: "5rem",
    borderRadius: 30,
    objectFit: "cover",
    marginBottom: 10,
  },
  googleAccount: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Profile = () => {
  const classes = useStyles();
  const user = useState(JSON.parse(localStorage.getItem("profile")));
  // const [profileData, setProfileData] = useState({});

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Grid container spacing={4} className={classes.main}>
          <Grid
            container
            item
            direction="column"
            justify="flex-start"
            spacing={2}
            xs={12}
            md={8}
          >
            {!user[0]?.result.googleId ? (
              <>
                <Grid container item direction="row" alignItems="baseline" xs>
                  <Typography variant="h3" component="h3">
                    Update your Account
                  </Typography>
                  <Typography
                    variant="body2"
                    component="p"
                    style={{ marginLeft: "auto" }}
                  >
                    Delete Account
                  </Typography>
                </Grid>
                <Grid container item xs alignItems="baseline">
                  <img
                    className={classes.mainImage}
                    src="https://source.unsplash.com/weekly?nature"
                    alt="Post1"
                  />
                  <div>
                    <label htmlFor="addPhoto">
                      <AddAPhotoOutlinedIcon />
                    </label>
                    <input
                      type="file"
                      id="addPhoto"
                      style={{ display: "none" }}
                    />
                  </div>
                </Grid>
                <Grid container item spacing={2}>
                  <Grid item xs sm={6}>
                    <TextField
                      fullWidth
                      variant="standard"
                      label="First Name"
                      id="fname"
                    />
                  </Grid>
                  <Grid item xs sm={6}>
                    <TextField
                      fullWidth
                      variant="standard"
                      label="Last Name"
                      id="lname"
                    />
                  </Grid>
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    variant="standard"
                    label="Email"
                    id="email"
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    variant="standard"
                    type="password"
                    label="Password"
                    id="password"
                  />
                </Grid>
                <Grid item xs>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Update
                  </Button>
                </Grid>
              </>
            ) : (
              <GoogleAccountPage user={user[0].result} />
            )}
          </Grid>
          <Sidebar />
        </Grid>
      </Container>
    </>
  );
};

const GoogleAccountPage = ({ user }) => {
  const classes = useStyles();
  return (
    <Paper elevation={3} square className={classes.googleAccount}>
      <Typography variant="h5" component="h5">
        Cannot update Google Account
      </Typography>
      <Typography variant="h6" component="h6">
        Name - {user.name}
      </Typography>
      <Typography variant="h6" component="h6">
        Email - {user.email}
      </Typography>
    </Paper>
  );
};
export default Profile;
