import { Box, FormControl, Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import PropTypes from "prop-types";
import React from "react";
import { countryCode, getMobileLimitBasedOnCC } from "../../utils";
import { SimpleSelect } from "./select";



const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    marginBottom: 0,
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      '& input::placeholder':{
        fontFamily:'crayond_regular'
      }
      },
  },
  wrapper: {
    border: `1px solid  #CBCBCB`,
    borderRadius: 8,
    height: 40,
    backgroundColor: '#fff',
    alignItems: "center",
    display: "flex"
  },
  input: {

    height: (props) => (props.multiline ? "unset" : props?.height ?? 50),
    [`& fieldset`]: {
      borderRadius: (props) => props?.borderRadius ?? "6px",
      height: (props) => (props.multiline ? "unset" : props?.height ?? 56),

      "& :hover": {
        border: "0px",
      },
      border: "0px",
    },
    "& .MuiOutlinedInput-input": {
      padding: (props) => props?.padding ?? "14px",
    },
  },
}));

export const MobileNumberInputComponent = (props) => {
  const classes = useStyles();

  const [selectValue, setSelectValue] = React.useState({
    mobile: props?.value?.mobile ?? "",
    mobile_code: props?.value?.mobile_code ?? "+91",
  });

  const [limits, setLimits] = React.useState(10);
  const [isvalid, setIsvalid] = React.useState(true);

  const mobileNoValidation = (limitValue = limits) => {
    let inputLengthValue = selectValue?.mobile?.length;

    if (limitValue) {
      if (limitValue === inputLengthValue) {
        setIsvalid(true);
      } else if (limitValue > inputLengthValue) {
        setIsvalid(false);
      } else {
        setIsvalid(true);
      }
    }
  };

  const handleChangeSelect = (mobile_code = {}) => {
    let newState = {
      mobile: selectValue.mobile,
      mobile_code,
    };

    setSelectValue(newState);
    props?.handleChange(newState);

    if (Object.keys(mobile_code)?.length > 0) {
      const limit = getMobileLimitBasedOnCC(mobile_code);
      setLimits(limit);
    }
  };

  const handleChange = (mobile) => {
    if (mobile?.length <= limits) {
      let newState = {
        mobile: mobile.replace(".", ""),
        mobile_code: selectValue.mobile_code,
      };

      setSelectValue(newState);
      props?.handleChange(newState);
    }
  };

  React.useEffect(() => {
    const limit = getMobileLimitBasedOnCC(props?.value?.mobile_code);
    mobileNoValidation(limit);

    // eslint-disable-next-line
  }, [selectValue]);

  React.useEffect(() => {
    if (props?.value) {
      setSelectValue({
        ...selectValue,
        mobile: props?.value?.mobile ?? "",
        mobile_code: props?.value?.mobile_code ?? "+91",
      });
    }
    // eslint-disable-next-line
  }, [props?.value]);

  React.useEffect(() => {
    if (props?.onErrorOccured) {
      props?.onErrorOccured(!isvalid);
    }

    // eslint-disable-next-line
  }, [isvalid]);

  return (
    <div className={classes.root} noValidate>
      {/* Input Label */}
      <Typography
       color="textSecondary" variant="body2" align="left" 
      >
        {props?.label}{" "}
        {props?.isRequired && (
          <Typography variant="caption" color="error">
            *
          </Typography>
        )}
      </Typography>
      <FormControl>

        <Box className={classes.wrapper} display="flex" alignItems="center">
          <Box style={{ borderRight: "1px solid #c1c1c1" }}>

            <SimpleSelect
              className={classes.select}
              options={countryCode}
              handleChangeSelect={handleChangeSelect}
              value={selectValue?.mobile_code ?? ""}
              disabled={props.isReadonly || props.disabled}
              errorValidation={props?.errorValidation}
            />

          </Box>
          <Box flexGrow={1}>
            <TextField
              inputProps={{ maxLength: limits && limits, pattern: "[0-9]" }}
              type={"number"}
              autoFocus={props.autoFocus ? true : false}
              disabled={(props?.isReadonly || props?.disabled) ?? false}
              onInvalid={(e) => {
                e.preventDefault();
              }}
              size="small"
              placeholder={props.placeholder}
              onChange={(e) => handleChange(e.target.value)}
              value={selectValue?.mobile}
              error={
                props?.errorValidation && props?.errorValidation?.error
                  ? props?.errorValidation?.error
                  : false
              }
              onKeyPress={(e) => {
                if (e.key === "e") {
                  e.preventDefault();
                }
              }}
              className={classes.input}
            />
          </Box>
        </Box>


        {/* Warning Message */}
        <Grid container direction={"row"}>
          {isvalid === false &&
            limits !== null &&
            selectValue?.mobile?.length > 0 && (
              <Grid item xs={12} sm={12} md={12}>
                <Typography variant="caption" color="error">
                  {"Please enter " + limits + " digits"}
                </Typography>
              </Grid>
            )}

          {/* Error Message */}
          {props?.errorValidation?.error && (
            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="caption" color="error">
                {props?.errorValidation?.errorMessage ?? ""}
              </Typography>
            </Grid>
          )}

          {/* Field required Message */}
          {props.isError && (
            <Typography variant={"caption"} color={"error"}>
              {props.helperText}
            </Typography>
          )}

          {props.error && (
            <Typography variant="caption" color="error">
              {props.helperText}
            </Typography>
          )}
        </Grid>
      </FormControl>
    </div>
  );
};

// Specifies the required props for the component:
MobileNumberInputComponent.propTypes = {
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  isReadonly: PropTypes.bool,
  // value: PropTypes.object,
  type: PropTypes.string,
  errorValidation: PropTypes.object,
  handleChange: PropTypes.func,
  onErrorOccured: PropTypes.func,
};
MobileNumberInputComponent.defaultProps = {
  handleChange: () => { },
};
