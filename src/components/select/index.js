import { Autocomplete, TextField } from "@mui/material";
import React, { useState } from "react";
export const SelectInput = ({ selectSx, placeholder, options }) => {
  const [select, setSelect] = useState("");
  const handleChange = (e) => {
    setSelect(e.target.value);
  };
  return (
    <>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={options}
        sx={{
          width: "157px",
          height: "36px",
          "&.MuiAutocomplete-root .MuiOutlinedInput-root": {
            fontSize: "14px",
            borderRadius: "8px",
          },
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            value={select}
            onChange={handleChange}
            size={"small"}
            sx={{
              width: "157px",
              height: "36px",
              opacity: 1,
              "&.MuiAutocomplete-root .MuiOutlinedInput-root": {
                fontSize: "14px",
              },
            }}
          />
        )}
      />
    </>
  );
};
