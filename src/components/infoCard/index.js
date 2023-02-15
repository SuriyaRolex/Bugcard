import React from "react";
import { Typography, Card, CardActions, CardContent, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

const styles = makeStyles((theme) => ({
  addButton: {
    marginBottom: "4px",
    padding: "6px 16px",
  }, colbimg: {
    width: "100%",
    maxWidth: "200px"
  }
}));

export const InfoCard = ({
  primaryText = "",
  actionButton = "text",
  actionButtonType = "contained",
  onActionButtonClicked = () => false
}) => {
  const classes = styles();
  return (
    <div>
      <Card sx={{ maxWidth: 325, borderRadius: "16px", padding: "16px", boxShadow: "0px 8px 69px #0000001A", margin: "0px auto" }}>

        {/* Logo */}
        <center>
          <img src="/images/homeScreenLogo.png" alt="logo" className={classes.colbimg} />
        </center>

        {/* Primary Text */}
        <CardContent sx={{ padding: "25px 40px" }}>
          <Typography variant="body2" color="text.primary" textAlign={"center"}>
            {primaryText}
          </Typography>
        </CardContent>

        {/* Add Project Button */}
        <CardActions>
          <Button
            size="small"
            variant={actionButtonType}
            fullWidth
            className={classes.addButton}
            onClick={onActionButtonClicked}
          >
            {actionButton}
          </Button>
        </CardActions>

      </Card>
    </div>
  );
};

