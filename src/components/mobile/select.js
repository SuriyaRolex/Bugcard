import Autocomplete from '@mui/material/Autocomplete';
import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: "0px",
    height: "100%",
    width: "100%",
    "& .MuiOutlinedInput-root": {
      paddingRight: "20px !important",
    },
  },
  label: {
    color: "rgba(146, 151, 165, 1)",
    textTransform: "uppercase",
    margin: "0px 8px",
  },
  autocomplete: {
    width: 85,
    "& fieldset": {
      border: "none",
    },
    "& .MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root']": {
      padding: "0px 9px",
    },
  },
}));

const getValue = (value, options) => {
  if (value && options?.length > 0) {
    return options.filter((val) => val.value === value)?.[0];
  } else {
    return value;
  }
};

export const SimpleSelect = ({
  placeholder = "",
  id = "",
  options = [],
  disabled = false,
  handleChangeSelect = () => false,
  value = "",
}) => {

  const classes = useStyles();

  const giveMeValueLabel = (option) => {
    return `${option?.value}`;
  };


  return (
    <div className={classes.margin}>
      <Autocomplete
        id={id}
        className={classes.autocomplete}
        placeholder={placeholder}
        options={options}
        getOptionLabel={(option) => giveMeValueLabel(option)}
        disabled={disabled}
        onChange={(event, value) =>
          handleChangeSelect(value?.value)
        }
        defaultValue={getValue(value, options)}
        disableClearable

        renderInput={(params) => (
          <TextField
            {...params}
            label=""
            variant="outlined"
            placeholder={placeholder}
            autoComplete={"true"}
          />
        )}
      />
    </div>
  );
};