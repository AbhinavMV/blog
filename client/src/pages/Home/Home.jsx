import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
import Navbar from "../../components/Navbar/Navbar";
import CardComponent from "../../components/Card/Card";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import { useStyles } from "./styles";

const Home = () => {
  const classes = useStyles();
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
            justify="flex-start"
            alignContent="center"
            spacing={2}
            xs={12}
            md={8}
          >
            {cardData.map((data, index) => (
              <Grid key={index} item xs={12} sm={6}>
                <CardComponent data={data} />
              </Grid>
            ))}
          </Grid>
          <Sidebar />
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

const cardData = [
  {
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
  },

  {
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
  },
  {
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
  },
  {
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
  },
  {
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
  },
];

export default Home;
