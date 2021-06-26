import { makeStyles } from "@material-ui/core/styles";
export default makeStyles((theme) => ({
  main: {
    flexGrow: 1,
    marginTop: 20,
    marginBottom: 20,
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
  progress: {
    width: "100%",
    height: "100%",
    display: "flex",
    marginTop: 20,
    justifyContent: "center",
  },
}));
