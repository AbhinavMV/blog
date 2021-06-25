import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Navbar from "../../components/Navbar/Navbar";
import CardComponent from "../../components/Card/Card";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import { getPosts } from "../../redux/ducks/postsReducer";
import { useStyles } from "./styles";

const Home = ({ history }) => {
  const classes = useStyles();
  const { loading, posts, pagination } = useSelector((state) => state.posts);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts(null, page));
    // eslint-disable-next-line
  }, [page]);
  const handleChange = (e, value) => {
    setPage(value);
  };
  return (
    <>
      <Navbar />
      <div className={classes.container}>
        <Typography className={classes.centered} variant="h1" component="h2">
          Blog
        </Typography>
        <img
          className={classes.mainImage}
          src="https://source.unsplash.com/weekly?dark"
          alt="Blog"
        />
      </div>

      <Container maxWidth="lg" className={classes.mainGrid}>
        <Grid container spacing={4} justify="center">
          <Grid
            container
            item
            // direction="column"
            alignItems="stretch"
            justify="flex-start"
            alignContent="flex-start"
            spacing={4}
            xs={12}
            md={8}
          >
            {!loading ? (
              <>
                {posts.map((data, index) => (
                  <Grid
                    key={index}
                    container
                    item
                    xs={12}
                    sm={6}
                    justify="center"
                  >
                    <CardComponent data={data} />
                  </Grid>
                ))}
                {pagination.totalPages > 1 && (
                  <Grid item xs={12}>
                    <Pagination
                      className={classes.pagination}
                      count={pagination.totalPages}
                      page={page}
                      onChange={handleChange}
                    />
                  </Grid>
                )}
              </>
            ) : (
              <Grid item className={classes.progress} xs={12}>
                <CircularProgress />
              </Grid>
            )}
          </Grid>
          <Sidebar />
        </Grid>
      </Container>

      <Footer />
    </>
  );
};

export default Home;
