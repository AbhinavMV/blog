import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow:1,
    maxWidth: 400,
    flexDirection: "column",
    height: "100%",
    maxHeight: "30em",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  details: {
    display: "flex",
    width: "90%",
    flexDirection: "column",
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
  },
  cover: {
    height: 250,
    width: "100%",
    borderRadius: 10,
    objectFit: "cover",
  },
  description: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    [theme.breakpoints.up("sm")]: {
      WebkitLineClamp: 2,
    },
  },
}));
