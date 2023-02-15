import React from "react";
import { makeStyles } from "@mui/styles";
import { Box, Radio, Typography, TextField } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import { InputField } from "../inputField";
import CircleIcon from "@mui/icons-material/Circle";
import Autocomplete from "@mui/material/Autocomplete";

const useStyles = makeStyles((theme) => ({
  radio: {
    marginLeft: "12px",
  },
  List: {
    paddingRight: "8px",
  },
  circleSx: {
    width: "12px",
    color: "#0063e7",
    height: "12px",
  },
}));

export const BoilerPlateDetails = ({
  platform_label = "platform Label",
  platform_placeholder = "platform placeHolder",
  platform_helperText = "",
  platform_isError = false,
  platform_value = "",
  platformHandleChange = () => false,
  platform_loading = false,
  platform_options = [
    { label: "one", value: "one" },
    { label: "two", value: "two" },
    { label: "three", value: "three" },
  ],
  // boilerplate
  boilerplate_label = "boilerplate Label",
  boilerReport = [],
  boilerplate_placeholder = "boilerplate placeHolder",
  boilerplate_helperText = "",
  boilerplate_isError = false,
  boilerplate_value = "",
  boilerplateHandleChange = () => false,
  boilerplate_loading = false,
  boilerplate_options = [
    { label: "one", value: "one" },
    { label: "two", value: "two" },
    { label: "three", value: "three" },
  ],
  boilerSelectChange = () => false,
}) => {
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = React.useState("yes");

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    boilerSelectChange(e.target.value);
  };

  return (
    <div>
      {/* Title */}
      <Typography variant="body2" color={"textSecondary"}>
        Would you like to use the Automatly boilerplate incase you starting from
        scratch?
      </Typography>

      {/* RadioButton */}
      <Box marginTop={1} marginBottom={2}>
        <FormControlLabel
          checked={selectedValue === "yes"}
          value="yes"
          onChange={handleChange}
          control={<Radio />}
          label="Yes"
        />
        <FormControlLabel
          className={classes.radio}
          checked={selectedValue === "no"}
          value="no"
          onChange={handleChange}
          control={<Radio />}
          label="No"
        />
      </Box>
       {selectedValue === "yes" ? (
        <>
          {/* platform field */}
          <Box marginTop={2} marginBottom={2}>
            <Autocomplete
              fullWidth
              options={platform_options}
              getOptionLabel={(option) => option.label}
              value={platform_value}
              onChange={platformHandleChange}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={platform_label}
                  placeholder={platform_placeholder}
                />
              )}
            />
          </Box>

          {/* Boiler Plate Details  list*/}
          <Box>
            <Typography marginTop={2} marginBottom={1}>
              Boiler Plate Details
            </Typography>
          </Box>
          <Box marginTop={2} marginBottom={2}>
            {boilerReport?.map((val) => {
              return (
                <Typography color="textSecondary"  style={{paddingBottom:'5px'}}>
                  <span className={classes.List}>
                    <CircleIcon className={classes.circleSx} />
                  </span>
                  {val.report}
                </Typography>
              );
            })}
          </Box>

          {/* provider field */}
          <Box>
            <InputField
              // label="Provide the new repo name to push this boilerplate code"
              // placeholder="Enter here"
              // fullWidth
              label={boilerplate_label}
              placeholder={boilerplate_placeholder}
              fullWidth
              helperText={boilerplate_helperText}
              isError={boilerplate_isError}
              value={boilerplate_value}
              onChange={(e) =>
                boilerplateHandleChange("boilerplate", e.target.value)
              }
              selectOption={boilerplate_options}
              loading={boilerplate_loading}
            />
          </Box>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};
