import {
  Button,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { CricleIcon } from "../../assets/cricleIcon";
import { DefaulBugIcon, DefaultLockIcon } from "../../assets/icon";
import { ListNested } from "../listNested/listNested";
import { listStyle } from "../listNested/style";
import { filterStyle } from "./style";

const Type = [
  {
    titlePrimary: "Bug",
    icon: <DefaulBugIcon />,
    count: "05",
  },
  {
    titlePrimary: "Vulnerabilitiy",
    icon: <DefaultLockIcon />,
    count: "00",
  },
  {
    titlePrimary: "Code Smells",
    icon: <CricleIcon />,
    count: "00",
  },
];

const Severity = [
  {
    title: "Blocker",
    count: "00",
    color: "#BD1919",
  },
  {
    title: "Minor",
    count: "343",
    color: "#19BD50",
  },
  {
    title: "Critical",
    count: "18",
    color: "#BD1919",
  },
  {
    title: "Info",
    count: "05",
    color: "#0063E7",
  },
  {
    title: "Major",
    count: "257",
    color: "#BD1919",
  },
];

const Types = () => {
  return (
    <List component="div" disablePadding>
      {Type.map((item, key) => (
        <ListItemButton sx={{ pl: 4 }}>
          <ListItemIcon sx={filterStyle.itemText}>{item.icon}</ListItemIcon>
          <ListItemText sx={filterStyle.itemText} primary={item.titlePrimary} />
          <Typography
            sx={filterStyle.itemText}
            justifySelf={"self-end"}
            color={"#848484"}
          >
            {item.count}
          </Typography>
        </ListItemButton>
      ))}
    </List>
  );
};

const Severitys = () => {
  return (
    <Grid container justifyContent={"space-between"} p={1} mt={1} spacing={1}>
      {Severity.map((item) => (
        <Grid item xs={12} md={12} lg={6}>
          <Box sx={listStyle.childCard} >
            <Typography color={"#3D4755"} style={listStyle.cardTitle}>
              {item.title}
            </Typography>
            <Typography color={item.color} style={listStyle.cardCount}>
              {item.count}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export const Filter = () => {
  return (
    <>
      <Box sx={filterStyle.mailBox}>
        <Box sx={filterStyle.headHorder}>
          <Grid
            container
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Grid item>
              <Typography style={filterStyle.filterText}>Filters</Typography>
            </Grid>
            <Grid item>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  disabled
                  size="small"
                  sx={{ textTransform: "none", fontSize: "12px" }}
                >
                  My Issues
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ textTransform: "none", fontSize: "12px" }}
                >
                  All
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Box>
            <ListNested
              titlePrimary={"Type "}
              option={<Types />}
              sxTitle={filterStyle.tpeTxt}
            />
          </Box>
          <Box>
            <ListNested
              titlePrimary={"Severity"}
              sxTitle={filterStyle.tpeTxt}
              option={<Severitys />}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};
