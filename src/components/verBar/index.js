import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { BarStyle } from "./style";

const VerBar = ({ verData, issueData }) => {
  return (
    <>
      <Box>
        <Box sx={BarStyle.appBox}>
          <Stack direction="row" spacing={2} sx={BarStyle.AppbarStyle}>
            <Typography variant="body1" sx={BarStyle.appType}>
              {verData?.overView}
              {issueData?.issue}
            </Typography>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default VerBar;
