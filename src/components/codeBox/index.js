import { Box, Typography } from "@mui/material";
import React from "react";
import { codeBoxSx } from "./style";

export default function CodeBox(props) {
  const { boxText = "", icon, subText = "" } = props;
  return (
    <>
      <Box>
        <Box sx={codeBoxSx.topBoxsx}>
          <Typography sx={codeBoxSx.typeSx}>{boxText}</Typography>
          <Box sx={codeBoxSx.CricleIconSx}>
            {icon}
            <Typography sx={codeBoxSx.codeSx}>{subText}</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
