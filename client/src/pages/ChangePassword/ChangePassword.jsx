import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Avatar,
  Button,
  Box,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { forgotpassword, resetPassword } from "../../api/userApi";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const ChangePassword = () => {
  const classes = useStyles();
  const [isForgotPassword, setForgotPassword] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();
  useEffect(() => {
    if (location.pathname.split("/")[1] === "resetpassword")
      setForgotPassword(false);
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isForgotPassword && formData.email) {
        const { data } = await forgotpassword(formData.email);
        setSuccess(data.data);
      } else {
        if (formData.password === formData.confirmPassword) {
          let resetToken = location.pathname.split("/")[2];
          const { data } = await resetPassword(resetToken, formData.password);
          setSuccess(data.data);
        } else {
          setError("Passwords do not match");
          setTimeout(() => setError(""), 4000);
        }
      }
      success && setTimeout(() => setSuccess(""), 5000);
    } catch (error) {
      setError(error.response?.data.error);
      setTimeout(() => setError(""), 4000);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <Grid
          container
          component="main"
          justify="center"
          className={classes.root}
        >
          <Grid item xs={12} sm={6}>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                {isForgotPassword ? "Forgot Password" : "Reset Password"}
              </Typography>
              <form onSubmit={handleSubmit} className={classes.form} noValidate>
                {isForgotPassword ? (
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    autoFocus
                  />
                ) : (
                  <>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="current-password"
                    />
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      id="confirmpassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      autoComplete="current-password"
                    />
                  </>
                )}
                {isForgotPassword ? (
                  success ? (
                    <Alert severity="success">{success}</Alert>
                  ) : (
                    error && <Alert severity="error">{error}</Alert>
                  )
                ) : success ? (
                  <Alert severity="success">
                    {success}
                    <Link to="/auth">Go to Login Screen</Link>
                  </Alert>
                ) : (
                  error && <Alert severity="error">{error}</Alert>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  {isForgotPassword ? "Send Email" : "Change Password"}
                </Button>
                <Box mt={5}>
                  <Footer />
                </Box>
              </form>
            </div>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ChangePassword;
