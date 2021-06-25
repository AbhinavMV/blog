import { makeStyles } from "@material-ui/core/styles";
export const useStyles = makeStyles((theme) => ({
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
    alignItems: "center",
    justifyContent: "space-around",
  },
  heading: {
    display: "flex",
    alignItems: "baseline",
    marginBottom: 20,
    width: "100%",
  },
  file: {
    marginRight: 20,
  },
}));
