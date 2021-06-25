import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  mainGrid: {
    flexGrow: 1,
    marginTop: 20,
  },
  container: {
    position: "relative",
    textAlign: "center",
    color: "white",
    width: "100%",
  },
  centered: {
    position: "absolute",
    alignSelf: "center",
    width: "100%",
    top: 40,
    marginLeft: "auto",
    fontSize: "10rem",
  },
  mainImage: {
    width: "100%",
    height: "20rem",
    objectFit: "cover",
    marginBottom: 20,
  },
  progress: {
    display: "flex",
    justifyContent: "center",
    height: "100%",
    alignItems: "flex-start",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
  },
}));
