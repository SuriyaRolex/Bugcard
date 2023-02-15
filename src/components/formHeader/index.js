import React from "react";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({ root: {} }));

export const FormHeader = ({ title = "", subTitle = "" }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {/* sign In */}
      <Typography variant="h6" gutterBottom textAlign={"start"}>{title}</Typography>

      {/* Sign In with your email and password */}
      {subTitle.trim().length > 0 && <Typography variant="body2" sx={{padding:"8px 0px"}} color={"textSecondary"}>{subTitle}</Typography>}
    </div>
  );
};




