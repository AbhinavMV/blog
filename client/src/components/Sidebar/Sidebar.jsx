import { Grid, Link, makeStyles, Paper, Typography } from "@material-ui/core";
import { useSelector } from "react-redux";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import MainPhoto from "../../images/IMG-20180414-WA0003.jpg";

const social = [
  {
    name: "Instagram",
    icon: InstagramIcon,
    path: "https://www.instagram.com/trueliving.spirits/",
  },
  { name: "Twitter", icon: TwitterIcon },
  { name: "Facebook", icon: FacebookIcon },
];

const useStyles = makeStyles((theme) => ({
  sidebarAboutBox: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.grey[200],
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
  profile: {
    height: "18em",
    width: "18em",
    alignSelf: "center",
    borderRadius: "100%",
    objectFit: "cover",
    marginBottom: 20,
  },
}));

const Sidebar = () => {
  const classes = useStyles();
  const { authData } = useSelector((state) => state.auth);
  return (
    <Grid item xs={12} md={4}>
      <Paper elevation={0} className={classes.sidebarAboutBox}>
        <Typography variant="h6" gutterBottom>
          About
        </Typography>
        <img
          src={
            authData?.result.email === "muskan@gmail.com"
              ? MainPhoto
              : "https://source.unsplash.com/random?model"
          }
          alt="Muskan"
          className={classes.profile}
        />
        <Typography>You don't have to be perfect to be amazing 🌸</Typography>
      </Paper>
      <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
        Social
      </Typography>
      {social.map((network, index) => (
        <Link
          display="block"
          variant="body1"
          target="_blank"
          href={network.path ? network.path : "#"}
          key={index}
        >
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <network.icon />
            </Grid>
            <Grid item>{network.name}</Grid>
          </Grid>
        </Link>
      ))}
    </Grid>
  );
};

export default Sidebar;
