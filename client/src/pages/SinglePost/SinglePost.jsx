import {
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import LikeComment from "../../components/LikeComment/LikeComment";
import Form from "../../components/Form/Form";
import useStyles from "./styles";
import { getPosts } from "../../redux/ducks/postsReducer";
import { deletePost } from "../../api/postApi";

const SinglePost = ({ location, history }) => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const { currentPost } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
    const id = pathname.split("/")[2];
    dispatch(getPosts(id));
    // eslint-disable-next-line
  }, [location]);

  const handleDelete = async () => {
    await deletePost(currentPost._id);
    history.push("/");
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Grid className={classes.main} container justify="center" spacing={4}>
          <Grid container item direction="column" spacing={2} xs md={8}>
            {currentPost ? (
              <>
                {edit ? (
                  <Form
                    history={history}
                    edit={true}
                    initialState={currentPost}
                    setEdit={setEdit}
                  />
                ) : (
                  currentPost && (
                    <Grid item xs={12}>
                      <img
                        className={classes.mainImage}
                        src={currentPost.selectedFile}
                        alt="Post1"
                      />
                      <div className={classes.heading}>
                        <Typography variant="h5" component="h5">
                          {currentPost.title}
                        </Typography>
                        {user &&
                          (user?.result.googleId || user?.result._id) ===
                            currentPost.creatorId && (
                            <div className={classes.icons}>
                              <IconButton
                                size="small"
                                color="inherit"
                                onClick={() => setEdit(!edit)}
                              >
                                <EditOutlinedIcon />
                              </IconButton>
                              <IconButton
                                size="small"
                                color="inherit"
                                onClick={handleDelete}
                              >
                                <DeleteForeverOutlinedIcon />
                              </IconButton>
                            </div>
                          )}
                      </div>
                      <div className={classes.subheading}>
                        <div className={classes.author}>
                          <Typography variant="caption" component="p">
                            by {currentPost.author}
                          </Typography>
                        </div>
                        <div>
                          <Typography variant="caption" component="p">
                            {new Date(currentPost.createdAt).toDateString()}
                          </Typography>
                        </div>
                      </div>
                      <div className={classes.body}>
                        <Typography variant="body1" component="p" gutterBottom>
                          {currentPost.message}
                        </Typography>
                      </div>
                      <Typography variant="body2" component="p" gutterBottom>
                        {currentPost.tags?.map(
                          (tag) => tag !== "" && `#${tag} `
                        )}
                      </Typography>
                      <LikeComment id={currentPost._id} />
                    </Grid>
                  )
                )}
              </>
            ) : (
              <div className={classes.progress}>
                <CircularProgress />
              </div>
            )}
          </Grid>
          <Sidebar />
        </Grid>
      </Container>
    </>
  );
};

export default SinglePost;
