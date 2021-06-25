import { Button, Grid, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import { useEffect, useState } from "react";
import FileBase from "react-file-input-previews-base64";

import { useStyles } from "./styles";
import { addPosts, updatePost } from "../../api/postApi";
// import { useHistory } from "react-router-dom";

const Form = ({ initialState, edit, setEdit, history }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");

  useEffect(() => {
    const convertTags = () => {
      if (Array.isArray(formData.tags)) {
        setFormData({ ...formData, tags: formData.tags.toString() });
      }
    };
    convertTags();
    // eslint-disable-next-line
  }, []);

  const handleChange = (e) => {
    if (e.target.type !== "file")
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.selectedFile)
        formData.selectedFile = `https://source.unsplash.com/random?sig=${Math.round(
          Math.random() * 100
        )}`;
      await addPosts(formData);
      history.push("/");
    } catch (error) {
      setError(error);
      console.log(error.response);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    formData.tags = formData.tags.split(",");

    try {
      await updatePost(formData);
      setEdit(false);
      history.push(`/post/${formData._id}`);
    } catch (error) {
      setError(error);
      console.log(error.response);
    }
  };

  return (
    <Grid container direction="column" spacing={4} className={classes.main}>
      <Grid item xs>
        <img
          className={classes.mainImage}
          src={"https://source.unsplash.com/weekly?nature"}
          alt="Post1"
        />
      </Grid>
      <Grid item xs>
        <form
          onSubmit={edit ? handleUpdate : handleSubmit}
          noValidate
          autoComplete="off"
        >
          <div className={classes.form}>
            <div className={classes.heading}>
              <div className={classes.file}>
                <FileBase
                  buttonComponent={<AddAPhotoOutlinedIcon />}
                  imagePreview={false}
                  labelText=""
                  multiple={false}
                  callbackFunction={({ base64 }) =>
                    setFormData({ ...formData, selectedFile: base64 })
                  }
                />
              </div>
              <TextField
                fullWidth
                autoFocus
                name="title"
                id="title"
                label="Title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <TextField
              fullWidth
              id="tags"
              name="tags"
              label="Tags (comma separated values)"
              variant="outlined"
              value={formData.tags}
              onChange={handleChange}
            />
            <TextField
              fullWidth
              id="message"
              name="message"
              label="Body"
              multiline
              value={formData.message}
              margin="normal"
              variant="outlined"
              onChange={handleChange}
            />
            {error && <Alert severity="error">{error.message}</Alert>}
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{
                marginTop: 10,
                width: "min-content",
                alignSelf: "center",
              }}
            >
              {edit ? "Update" : "Post"}
            </Button>
          </div>
        </form>
      </Grid>
    </Grid>
  );
};

export default Form;
