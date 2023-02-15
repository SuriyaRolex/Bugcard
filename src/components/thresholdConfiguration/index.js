import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Typography, Box } from "@mui/material";
import { InputField } from "../inputField";
import PercentOutlinedIcon from '@mui/icons-material/PercentOutlined';
import InputAdornment from '@mui/material/InputAdornment';


const useStyles = (makeStyles)((theme) => ({
  border: {
    border: '1.3px solid #CBCBCB',
    padding: '12px',
    borderRadius: '8px'
  },
  InputField: {
    marginBottom: '4px'
  },
}));



export const ThresholdConfiguration = ({ dataAlert = [], handleChange = () => { } }) => {

  const classes = useStyles();
  return (
    <div className={classes.border}>

      {/* Title */}
      <Typography variant='subtitle2' gutterBottom >Threshold Configurations</Typography>

      {dataAlert.map((_, key) => <div key={key} className={classes.report}>
        <Box className={classes.InputField} >
          <InputField
            label={_.label}
            placeholder={_.placeholder}
            type={_?.type}
            fullWidth
            helperText={_.helperText}
            isError={_.isError}
            value={_.value}
            onChange={(e) => handleChange(_.key, e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <PercentOutlinedIcon color="disabled" fontSize="8px" />
              </InputAdornment>
            } />
        </Box>
      </div>

      )}

    </div>
  )

}

