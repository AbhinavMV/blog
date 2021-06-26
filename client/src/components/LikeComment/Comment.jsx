import {
  Avatar,
  Divider,
  Grid,
  // makeStyles,
  Typography,
} from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";

// const useStyles = makeStyles((theme) => ({
//   main: {
//     display: "flex",
//     width: "100%",
//   },
// }));
const Comment = ({ comment }) => {
  // const classes = useStyles();
  return (
    <>
      <Divider />
      <Grid container item xs={12}>
        <Grid item xs={2} sm={1}>
          {/* <Divider /> */}
          <Avatar src={comment.commentor.avatar}>
            {comment.commentor.username?.charAt(0).toUpperCase() || (
              <FaceIcon />
            )}
          </Avatar>
        </Grid>
        <Grid item xs={8} sm={9}>
          <Typography variant="body1" component="p">
            <b>{comment.commentor.username}</b>
            {": " + comment.body}
          </Typography>
          {/* <Divider /> */}
        </Grid>
        <Grid item xs={2} sm={2} style={{ textAlign: "right" }}>
          <Typography variant="caption" component="p">
            {new Date(comment.createdAt).toLocaleDateString()}
          </Typography>
        </Grid>
        <Divider />
      </Grid>
    </>
  );
};

export default Comment;
