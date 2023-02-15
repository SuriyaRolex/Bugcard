import React from "react";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export const AutocompleteCmp = (props) => {
  return (
    <Autocomplete
      multiple={props?.multiple}
      limitTags={props?.limitTags}
      id={props?.id}
      options={props?.options}
      getOptionLabel={(option) => option.label || ""}
      // defaultValue={props?.defaultValue ?? ''}
      value={props?.value}
      onChange={props?.onChange}
    
      renderInput={(params) => (
        <TextField {...params} label={props?.label} placeholder={props?.placeholder} />
      )}
      sx={{ width: props?.width ? props?.width : "320px" }}
    />
  );
}

