import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Typography, Box } from "@mui/material";
// import { InputField } from "../inputField";
import { AutocompleteCmp } from "../autoCompleteCmp";

const useStyles = makeStyles((theme) => ({
  border: {
    border: "1.3px solid #CBCBCB",
    padding: "12px",
    borderRadius: "8px",
  },
  InputField: {
    paddingTop: "15px",
  },
}));

export const InstanceDetails = ({
  instanceData = [],
  title = "",
  handleChange,
}) => {
  const classes = useStyles();
  return (
    <div className={classes.border}>
      {/* Title */}
      <Typography gutterBottom>{title}</Typography>

      {/* provider,CPU field */}
      <Box>
        {instanceData?.map((_, key) => (
          <Box key={key} className={classes.InputField}>
            <AutocompleteCmp
              options={_?.options?.length > 0 ? _?.options : []}
              // defaultValue={_?.defaultValue}
              onChange={(e, value) =>
                handleChange(_?.key, e.target.value, value)
              }
              label={_?.label}
              value={_?.value ?? ""}
              // default
              placeholder={_?.placeholder}
              loading={_?.loading}
            />
          </Box>
        ))}
      </Box>

      {/* Disk field */}
      {/* <Box>
        <InputField
          label="Version"
          placeholder="Enter here"
          fullWidth
          value={value}
          helperText={helperText}
          isError={isError}
        />
      </Box> */}
    </div>
  );
};
