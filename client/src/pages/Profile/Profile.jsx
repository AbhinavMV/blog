import { Button, Container, Grid, TextField, Typography, Paper } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import FileBase from "react-file-input-previews-base64";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { deleteUser, updateUser } from "../../api/userApi";
import { red } from "@material-ui/core/colors";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  main: {
    flexGrow: 1,
    marginTop: 20,
  },
  mainImage: {
    width: "15rem",
    height: "15rem",
    objectFit: "cover narrow",
    borderRadius: 200,
    marginBottom: 10,
  },
  googleAccount: {
    marginTop: "2rem",
    display: "flex",
    justify: "center",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const initialState = { fname: "", lname: "", email: "", password: "", imageUrl: "" };
const Profile = ({ history }) => {
  const classes = useStyles();
  const user = useState(JSON.parse(localStorage.getItem("profile")));
  const [profileData, setProfileData] = useState(initialState);
  const [message, setMessage] = useState({ success: undefined, error: undefined });
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      setProfileData({
        fname: user[0].result.name.split(" ")[0],
        lname: user[0].result.name.split(" ")[1],
        imageUrl: user[0].result.imageUrl,
        email: user[0].result.email,
        password: null,
      });
    } else {
      history.push("/auth");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleDelete = async () => {
    try {
      await deleteUser(user[0].result._id);
      localStorage.clear();
      history.push("/");
      dispatch({ type: "LOGOUT" });
    } catch (error) {
      console.log(error.response.data);
      setMessage({ success: undefined, error: error.response?.data.message });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profileData.imageUrl)
      profileData.imageUrl = `https://source.unsplash.com/random?model?${Math.ceil(
        Math.random() * 100
      )}/100x100`;
    try {
      const { data } = await updateUser(user[0].result._id, profileData);
      dispatch({ type: "AUTH_SUCCESS", data });
      setMessage({ success: "Profile Updated", error: undefined });
    } catch (error) {
      setMessage({ success: undefined, error: error.response?.data.message });
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Grid container spacing={4} className={classes.main}>
          <Grid container item direction="column" justify="flex-start" spacing={2} xs={12} md={8}>
            {!user[0]?.result.googleId ? (
              <>
                <Grid container item direction="row" alignItems="baseline" xs>
                  <Typography variant="h3" component="h3">
                    Update your Account
                  </Typography>
                  <Button onClick={handleDelete} style={{ marginLeft: "auto", color: red[500] }}>
                    Delete Account
                  </Button>
                </Grid>
                <Grid container item xs alignItems="baseline">
                  <img
                    className={classes.mainImage}
                    src={
                      profileData.imageUrl
                        ? profileData.imageUrl
                        : "https://source.unsplash.com/random?model"
                    }
                    alt="Post1"
                  />
                  <div>
                    <FileBase
                      buttonComponent={<AddAPhotoOutlinedIcon />}
                      imagePreview={false}
                      labelText=""
                      multiple={false}
                      callbackFunction={({ base64 }) =>
                        setProfileData({ ...profileData, imageUrl: base64 })
                      }
                    />
                  </div>
                </Grid>
                <form onSubmit={handleSubmit}>
                  <Grid container direction="column" spacing={2} alignItems="stretch">
                    <Grid container item spacing={2}>
                      <Grid item xs sm={6}>
                        <TextField
                          fullWidth
                          variant="standard"
                          label="First Name"
                          name="fname"
                          id="fname"
                          value={profileData.fname}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs sm={6}>
                        <TextField
                          fullWidth
                          variant="standard"
                          label="Last Name"
                          name="lname"
                          id="lname"
                          value={profileData.lname}
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs>
                      <TextField
                        fullWidth
                        variant="standard"
                        label="Email"
                        name="email"
                        id="email"
                        value={profileData.email}
                        onChange={handleChange}
                      />
                    </Grid>
                    <Grid item xs>
                      <TextField
                        fullWidth
                        variant="standard"
                        type="password"
                        label="Password"
                        name="password"
                        id="password"
                        onChange={handleChange}
                      />
                    </Grid>

                    {message.error && <Alert severity="error">{message.error}</Alert>}
                    {message.success && <Alert severity="success">{message.success}</Alert>}
                    <Grid item xs>
                      <Button type="submit" fullWidth variant="contained" color="primary">
                        Update
                      </Button>
                    </Grid>
                  </Grid>
                </form>
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
