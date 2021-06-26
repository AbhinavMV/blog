import { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  Box,
  Typography,
  Container,
  CircularProgress,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Alert from "@material-ui/lab/Alert";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Input from "../../components/Input/Input";
import Icon from "./icon";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { userAuth } from "../../redux/ducks/userReducer";

const initialState = {
  fName: "",
  lName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Auth({ history }) {
  const classes = useStyles();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("authToken") || localStorage.getItem("profile"))
      history.push("/");
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userAuth(formData, isSignUp, history));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH_SUCCESS", data: { result, token } });
      history.push("/");
    } catch (error) {
      dispatch({ type: "AUTH_ERROR", error });
      setTimeout(() => dispatch({ type: "LOGOUT" }), 5000);
    }
  };
  const googleFailure = ({ error }) => {
    console.log("Google Sign In was unsuccesfull. Try Again Later");
    dispatch({ type: "ERROR", error });
  };

  return (
    <>
      <Navbar isSignUp={isSignUp} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignUp ? "Sign Up" : "Sign In"}
          </Typography>
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <Grid container spacing={2} justify="center">
              {loading && (
                <CircularProgress
                  color="secondary"
                  style={{
                    display: "flex",
                    order: "1",
                    position: "absolute",
                    zIndex: 999,
                  }}
                />
              )}
              {isSignUp && (
                <>
                  <Input
                    half
                    name="fName"
                    label="First Name"
                    type="text"
                    handleChange={handleChange}
                  />
                  <Input
                    half
                    name="lName"
                    label="Last Name"
                    type="text"
                    handleChange={handleChange}
                  />
                </>
              )}
              <Input
                name="email"
                label="Email"
                type="text"
                handleChange={handleChange}
              />
              <Input
                name="password"
                label="Password"
                type="password"
                showPassword
                handleChange={handleChange}
              />
              {isSignUp && (
                <Input
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  handleChange={handleChange}
                />
              )}
            </Grid>
            {error && (
              <Alert severity="error" style={{ marginTop: 10 }}>
                {error.response.data.error}
              </Alert>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
            <GoogleLogin
              clientId="885487437222-hkdjcd43t272pr8f5dno8kkerb72p7cb.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
            <Grid container justify="flex-end">
              {!isSignUp && (
                <Grid item xs={12}>
                  <Button
                    size="small"
                    onClick={() => history.push("/forgotpassword")}
                  >
                    Forgot Password
                  </Button>
                </Grid>
              )}
              <Grid item xs={12}>
                <Button size="small" onClick={() => setIsSignUp(!isSignUp)}>
                  {isSignUp
                    ? "Already have an account? Sign in"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Footer />
        </Box>
      </Container>
    </>
  );
}
