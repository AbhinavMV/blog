import React, { useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  IconButton,
  Divider,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core";
import Comment from "./Comment";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  mainArea: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
  },
  commentsPost: {
    display: "flex",
    marginTop: 20,
  },
  formButton: {
    display: "flex",
    marginLeft: "auto",
    alignItems: "center",
  },
  comments: {
    marginTop: 20,
  },
}));

const LikeComment = ({ id }) => {
  const [userLike, setUserLike] = useState(true);
  const [user] = useState(JSON.parse(localStorage.getItem("profile")));
  const [showComment, setShowComment] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [message, setMessage] = useState("");
  const classes = useStyles();

  const getComments = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/comment/${id}`
      );
      setAllComments(data.comments);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8000/api/comment/${id}`, {
        message,
        commentor: user
          ? JSON.stringify({
              username: user.result.name,
              avatar: user.result.url ? null : user.result.imageUrl,
              userId: user.result._id ? user.result.id : user.result.googleId,
            })
          : JSON.stringify({
              username: "Anonymous",
              avatar: `https://source.unsplash.com/random/100x100?model?sig=${Math.round(
                Math.random() * 1000
              )}`,
              userId: "Anonymous",
            }),
      });
      getComments();
      setMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid container item xs={12} spacing={2}>
      <Paper className={classes.mainArea} elevation={0}>
        <Divider />
        <div>
          <IconButton aria-label="like" onClick={() => setUserLike(!userLike)}>
            {userLike ? (
              <FavoriteIcon style={{ color: red[500] }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          <IconButton
            aria-label="comment"
            onClick={() => {
              setShowComment(!showComment);
              getComments();
            }}
          >
            <CommentIcon />
          </IconButton>
        </div>
        <Divider />
        {showComment && (
          <>
            <form onSubmit={handleSubmit}>
              <Grid
                container
                item
                xs={12}
                spacing={1}
                className={classes.commentsPost}
              >
                <Grid item xs={2} sm={1}>
                  <Avatar
                    alt="Chinky"
                    src="https://source.unsplash.com/random?model"
                  />
                </Grid>
                <Grid item xs={10} sm={11}>
                  <TextField
                    multiline
                    fullWidth
                    variant="outlined"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </Grid>
                <span className={classes.formButton}>
                  <Typography
                    variant="body2"
                    component="p"
                    style={{ marginRight: 5 }}
                  >
                    Post as Anonymous
                  </Typography>
                  <Button type="submit" color="primary" variant="contained">
                    Post
                  </Button>
                </span>
              </Grid>
            </form>
            {/* <Divider style={{ marginTop: 10, marginBottom: 10 }} /> */}
            <Grid
              className={classes.comments}
              container
              item
              direction="column"
              spacing={2}
              xs={12}
            >
              {allComments &&
                Object.keys(allComments).map((key, index) => (
                  <Comment comment={allComments[key]} key={index} />
                ))}
            </Grid>
          </>
        )}
      </Paper>
    </Grid>
  );
};

export default LikeComment;
