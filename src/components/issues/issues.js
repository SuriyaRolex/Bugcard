import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React from "react";
import { PathIcon } from "../../assets/fileIcon";
import useWindowDimensions from "../../hooks";
import { Filter } from "../filters/filter";
import { RemoveComment } from "../removeComment";
import { issuesStyle } from "./style";

export default function Issues({ handleClick = () => {} }) {
  const size = useWindowDimensions();

  return (
    <Box>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={3}>
          <Box
            sx={{
              ...issuesStyle.paperBlock,
              height: size?.height - 130,
              overflow: "overlay",
            }}
          >
            <Filter />
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={9}>
          <Box
            sx={{
              ...issuesStyle.rootBlock,
              height: size?.height - 128,
              overflow: "overlay",
            }}
          >
            <Box sx={issuesStyle.iconOutlined}>
              <Box sx={issuesStyle.pathIcon}>
                <PathIcon />
              </Box>
              <Box>
                <Typography sx={issuesStyle.pathText}>src/App.tsx</Typography>
              </Box>
            </Box>
            <Box>
              <RemoveComment handleClick={handleClick} />
              <RemoveComment handleClick={handleClick} />
              <RemoveComment handleClick={handleClick} />
              <RemoveComment handleClick={handleClick} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
