import React from 'react'
import { Grid, Typography} from "@mui/material";
import { Link } from "react-router-dom";

export const Error = ( {error="",linktext="",link=""}) => {
  return (
    
        <Grid
        container
        style={{ height: "100vh", width: "100%" }}
        justifyContent="center"
        alignItems="center"
        >
        <Grid item>
          {/* Errormessage */}
          <Typography variant="h1" sx={{fontFamily: "crayond_medium"}}>{error}
          </Typography>
          <Link to={link} underline="hover">{linktext}</Link>
        </Grid>
      </Grid>

  )
}
