import { Button, Container, Grid, TextField } from "@material-ui/core";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import Navbar from "../../components/Navbar/Navbar";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  main: {
    flexGrow: 1,
    marginTop: 40,
    [theme.breakpoints.up("md")]: {
      paddingRight: 40,
      paddingLeft: 40,
    },
  },
  mainImage: {
    width: "100%",
    height: "20rem",
    objectFit: "cover",
    marginBottom: 10,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "space-around",
    justifyContent: "center",
  },
  heading: {
    display: "flex",
    alignItems: "baseline",
    marginBottom: 20,
    width: "100%",
  },
  file: {
    display: "none",
    marginRight: 20,
  },
}));

const CreatePost = () => {
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Grid container direction="column" spacing={4} className={classes.main}>
          <Grid item xs>
            <img
              className={classes.mainImage}
              src="https://source.unsplash.com/weekly?music"
              alt="Post1"
            />
          </Grid>
          <Grid item xs>
            <form noValidate autoComplete="off">
              <div className={classes.form}>
                <div className={classes.heading}>
                  <label htmlFor="imageAdd" style={{ marginRight: 20 }}>
                    <AddAPhotoOutlinedIcon />
                  </label>
                  <input type="file" id="imageAdd" className={classes.file} />
                  <TextField fullWidth label="Title" />
                </div>
                <TextField
                  fullWidth
                  id="filled-multiline-static"
                  label="Body"
                  multiline
                  variant="outlined"
                />
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    marginTop: 20,
                    width: "min-content",
                    alignSelf: "center",
                  }}
                >
                  Post
                </Button>
              </div>
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default CreatePost;
