import React from "react";
import { Typography, TextField, Box, MenuItem } from "@mui/material";
import { makeStyles } from "@mui/styles";

import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

const styles = makeStyles((theme) => ({
  textBox: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      '& input::placeholder': {
        fontFamily: 'crayond_regular'
      }
    },
    marginTop: 2
  },

}));

export const InputField = ({
  value = "",
  fullWidth = false,
  isReadOnly = false,
  isRequired = false,
  helperText = "",
  isError = false,
  isMulti = false,
  rowMax = 5,
  rowMin = 5,
  placeholder = "",
  size = SIZE.small,
  onChange = () => false,
  label = "",
  endAdornment,
  startAdornment,
  select = "",
  type = "string",
  selectOption = [],
  loading = false
}) => {
  const classes = styles();

  return (
    <div>
      {/* Label */}
      <Typography color="textSecondary" variant="body2" align="left" sx={{ padding: "4px 0px" }}  >
        {label}{isRequired && <Box component={"sup"} color={"red"}>*</Box>}
      </Typography>

      {/* TextField */}
      {!loading && <TextField
        className={classes.textBox}
        size={size}
        variant="outlined"
        value={value}
        type={type}
        placeholder={placeholder}
        fullWidth={fullWidth}
        disabled={isReadOnly}
        multiline={isMulti}
        maxRows={rowMax}
        minRows={rowMin}
        onChange={onChange}
        helperText={helperText}
        error={isError}
        select={select}
        InputProps={{
          endAdornment: endAdornment,
          startAdornment: startAdornment
        }}>
        {selectOption?.map((option) => (
          < MenuItem key={option?.value} value={option?.value} >
            {option?.label}
          </MenuItem>
        ))}
      </TextField>}
      
      {loading && <LoadingButton
        loading
        loadingPosition="start"
        startIcon={<SaveIcon />}
        variant="outlined"
        style={{ width: '100%', borderRadius: "8px" }}
      >
        {"Loading..."}
      </LoadingButton>}
    </div >
  );
};

// size ENUM
const SIZE = {
  small: "small",
  medium: "medium",
  large: "large",
};
InputField.size = SIZE;
