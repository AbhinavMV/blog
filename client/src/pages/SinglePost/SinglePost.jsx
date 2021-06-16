import { Container, Grid, IconButton, Typography } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";

import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  main: {
    flexGrow: 1,
    marginTop: 20,
  },
  mainImage: {
    width: "100%",
    height: "20rem",
    objectFit: "cover",
    marginBottom: 10,
  },
  heading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  icons: {
    display: "flex",
    justifyContent: "flex-end",
    marginLeft: "auto",
  },
  subheading: {
    display: "flex",
  },
  author: {
    marginRight: "auto",
  },
  body: {
    marginTop: 20,
    display: "flex",
    whiteSpace: "pre-line",
  },
}));

const data = {
  imgUrl: "https://source.unsplash.com/random",
  title: "Just a friend or a magician?",
  author: "Muskan Sharma",
  body: `As I come towards u 
        Loaded with mountains of trouble 
        Everything turns normal
        With your words of wisdom
        Are u just a friend or a magician?
        As I get bored
        I get entertained by a glimpse of u
        Are you just a friend or a magician?
        Adding pinch of your voice to my ugly singing makes it melodious
        Are you just a friend or a magician?
        From where do you get the patience of listening to my bullshit ?
        Are you just a friend or a magician?
        How can you be just one call away even after being miles apart ?
        Are u just a friend or a magician?
        As I see you fall
        My heart aches like I'm falling
        Are u just a friend or a magician?`,
  date: "13-06-2021",
};

const SinglePost = () => {
  const classes = useStyles();
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Grid className={classes.main} container spacing={4}>
          <Grid container item direction="column" spacing={2} xs md={8}>
            <Grid item xs={12}>
              <img
                className={classes.mainImage}
                src="https://source.unsplash.com/weekly?nature"
                alt="Post1"
              />
              <div className={classes.heading}>
                <Typography variant="h5" component="h5">
                  {data.title}
                </Typography>
                <div className={classes.icons}>
                  <IconButton size="small" color="inherit">
                    <EditOutlinedIcon />
                  </IconButton>
                  <IconButton size="small" color="inherit">
                    <DeleteForeverOutlinedIcon />
                  </IconButton>
                </div>
              </div>
              <div className={classes.subheading}>
                <div className={classes.author}>
                  <Typography variant="caption" component="p">
                    by {data.author}
                  </Typography>
                </div>
                <div>
                  <Typography variant="caption" component="p">
                    {data.date}
                  </Typography>
                </div>
              </div>
              <div className={classes.body}>
                <Typography variant="body1" component="p">
                  {data.body}
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Sidebar />
        </Grid>
      </Container>
    </>
  );
};

export default SinglePost;
