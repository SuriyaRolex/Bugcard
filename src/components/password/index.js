import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, Typography, TextField, InputAdornment } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/system";

const styles = makeStyles((theme) => ({
  textBox: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      '& input::placeholder':{
        fontFamily:'crayond_regular'
      } 
    },
    marginTop: 3
  }
}));

export const PasswordField = ({
  label = "",
  placeholder = "",
  size = SIZE.small,
  fullWidth = false,
  onChange = () => false,
  isError = false,
  helperText = "",
  value = "",
  isRequired = false
}) => {
  const classes = styles();

  const [showpassword, setPassword] = React.useState();

  const handleClickShowPassword = () => {
    setPassword(!showpassword);
  };
  return (
    <div>
      {/* Label */}
      <Typography variant="body2" align="left" color={"textSecondary"}>
        {label} {isRequired && <Box component={"sup"} color={"red"}>*</Box>}
      </Typography>

      {/* Password TextField */}
      <TextField
        type={showpassword ? "text" : "password"}
        value={value}
        size={size}
        fullWidth={fullWidth}
        className={classes.textBox}
        onChange={onChange}
        placeholder={placeholder}
        helperText={helperText}
        error={isError}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            > 
            {showpassword ? <VisibilityOff  htmlColor="#848484"/> : <Visibility  htmlColor="#848484"/>}
             </IconButton>
          </InputAdornment>
          ),
        }}
 
      />
    </div>
  );
};

const SIZE = {
  small: "small",
  medium: "medium",
  large: "large"
}

PasswordField.size = SIZE;