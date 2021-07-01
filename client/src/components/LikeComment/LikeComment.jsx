import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import FaceIcon from "@material-ui/icons/Face";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core";
import Comment from "./Comment";
import { likePost, getComments, postComment } from "../../api/postApi";
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
  const likes = useSelector((state) => state.posts.currentPost.likes);
  const [likesCount, setLikesCount] = useState(undefined);
  const user = JSON.parse(localStorage.getItem("profile"));
  const [userLike, setUserLike] = useState();
  useEffect(() => {
    setUserLike(
      user?.result._id || user?.result.googleId
        ? likes?.find((id) => id === (user.result?._id || user.result?.googleId))
          ? true
          : false
        : false
    );
    if (likesCount === undefined) setLikesCount(likes?.length);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likes]);
  const [showComment, setShowComment] = useState(false);
  const [allComments, setAllComments] = useState([]);
  const [message, setMessage] = useState("");
  const classes = useStyles();

  const handleLike = async () => {
    try {
      const { data } = await likePost(user, id);
      setLikesCount(data.likesCount);
      setUserLike(!userLike);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleComments = async () => {
    try {
      const { data } = await getComments(id);
      setAllComments(data.comments);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postComment(user, id, message);
      handleComments();
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
          <IconButton aria-label="like" onClick={handleLike} disabled={user ? false : true}>
            {userLike ? <FavoriteIcon style={{ color: red[500] }} /> : <FavoriteBorderIcon />}{" "}
            <Typography variant="subtitle1">{likesCount}</Typography>
          </IconButton>
          <IconButton
            aria-label="comment"
            onClick={() => {
              setShowComment(!showComment);
              handleComments();
            }}
          >
            <CommentIcon />
          </IconButton>
        </div>
        <Divider />
        {showComment && (
          <>
            <form onSubmit={handleSubmit}>
              <Grid container item xs={12} spacing={1} className={classes.commentsPost}>
                <Grid item xs={2} sm={1}>
                  <Avatar alt="A" src={user?.result.imageUrl}>
                    {user?.result.name.charAt(0).toUpperCase() || <FaceIcon />}
                  </Avatar>
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
                  {!user && (
                    <Typography variant="body2" component="p" style={{ marginRight: 5 }}>
                      Post as Anonymous
                    </Typography>
                  )}
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
