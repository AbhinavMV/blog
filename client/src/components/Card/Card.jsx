import { useHistory } from "react-router-dom";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Hidden,
  Typography,
} from "@material-ui/core";
import { useStyles } from "./styles";

const CardComponent = ({ data }) => {
  const classes = useStyles();
  const history = useHistory();
  const handleClick = (e) => {
    e.preventDefault();
    history.push(`/post/${data._id}`);
  };

  return (
    <CardActionArea
      onClick={handleClick}
      style={{ height: "100%", display: "flex" }}
    >
      <Card className={classes.root}>
        <Hidden xsDown>
          <CardMedia
            className={classes.cover}
            image={`${data.selectedFile}/480x250`}
            tilte={data.title}
          />
        </Hidden>
        <div className={classes.details}>
          <CardContent>
            <Typography component="h5" variant="h5">
              {data.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {data.author}
            </Typography>
            <Typography
              variant="body2"
              component="p"
              className={classes.description}
            >
              {data.message}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </CardActionArea>
  );
};

export default CardComponent;
