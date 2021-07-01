import { useState } from "react";
import PropTypes from "prop-types";
import { Grid, InputAdornment, IconButton, TextField } from "@material-ui/core";
import { Visibility } from "@material-ui/icons";
import { VisibilityOff } from "@material-ui/icons";
const Input = ({ half, name, label, type, handleChange }) => {
  const [showPassword, setShowPassword] = useState(type === "text");
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        variant="outlined"
        required
        fullWidth
        onChange={handleChange}
        id={name}
        label={label}
        name={name}
        autoComplete={name}
        type={showPassword ? "text" : "password"}
        InputProps={{
          endAdornment: type === "password" && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
};

Input.propTypes = {
  half: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  handleChange: PropTypes.func,
};

export default Input;
