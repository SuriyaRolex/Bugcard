import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CodeBox from "../../components/codeBox";
import { codeSmallSx } from "./style";
import { RemoveError } from "../../components/removeError/removeError";
import { Typography } from "@mui/material";
import useWindowDimensions from "../../hooks";
import { CricleIcon } from "../../assets/cricleIcon";
import { NavIcon } from "../../assets/navIcon";

const boxData = [
  {
    id: "1",
    boxText: "Remove this commented out code",
    icon: <CricleIcon />,
    subText: "Code Smell",
  },
  {
    id: "2",

    boxText: "Remove this unused import of 'RequireAuth'.",
    icon: <CricleIcon />,
    subText: "Code Smell",
  },
  {
    id: "3",
    boxText: "Rename this file to 'graphqlReq'",
    icon: <CricleIcon />,
    subText: "Code Smell",
  },
  {
    id: "4",
    boxText: "Remove this unused import of 'config'.",
    icon: <CricleIcon />,
    subText: "Code Smell",
  },{
    id: "5",
    boxText: "Remove this commented out code",
    icon: <CricleIcon />,
    subText: "Code Smell",
  },
  {
    id: "6",

    boxText: "Remove this unused import of 'RequireAuth'.",
    icon: <CricleIcon />,
    subText: "Code Smell",
  },
  {
    id: "7",
    boxText: "Rename this file to 'graphqlReq'",
    icon: <CricleIcon />,
    subText: "Code Smell",
  },
  {
    id: "8",
    boxText: "Remove this unused import of 'config'.",
    icon: <CricleIcon />,
    subText: "Code Smell",
  },
  {
    id: "9",
    boxText: "Remove this commented out code",
    icon: <CricleIcon />,
    subText: "Code Smell",
  },
  {
    id: "10",

    boxText: "Remove this unused import of 'RequireAuth'.",
    icon: <CricleIcon />,
    subText: "Code Smell",
  },
  {
    id: "11",
    boxText: "Rename this file to 'graphqlReq'",
    icon: <CricleIcon />,
    subText: "Code Smell",
  },
  {
    id: "12",
    boxText: "Remove this unused import of 'config'.",
    icon: <CricleIcon />,
    subText: "Code Smell",
  },
];

export default function CodeSmall(props) {

  const size = useWindowDimensions()

  const { setOpen } = props;

  const [active, setActive] = useState(false);
  const [selected, setSelected] = useState("");

  const handleClick = (i) => {
    setActive(!active);
    setSelected(i);
  };
  const handleRoute = () => {
    setOpen(true);
  };

  return (
    <Grid container>
      <Grid item xs={12} sm={12} md={12} lg={3}>
        <Box sx={{...codeSmallSx.textBoxSx, height:size.height-130, overflow:"overlay"}}>
          <Box sx={codeSmallSx.boxSx}>
            <Typography
              component={"span"}
              sx={codeSmallSx.cursorSX}
              onClick={() => handleRoute()}
            >
              <NavIcon />
            </Typography>
          </Box>
          <Box sx={codeSmallSx.codeSx}>
            {boxData.map((val, i) => (
              <Box
                sx={
                  selected === val?.id
                    ? codeSmallSx.activeBox
                    : codeSmallSx.mapBoxSx
                }
                onClick={() => handleClick(val.id)}
              >
                <CodeBox
                  boxText={val.boxText}
                  icon={val.icon}
                  subText={val.subText}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={9}
        sx={{ backgroundColor: "#F6F6F6" }}
      >
        <Box>
          <RemoveError />
        </Box>
      </Grid>
    </Grid>
  );
}
