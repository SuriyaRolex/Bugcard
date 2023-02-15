import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import useWindowDimensions from "../../hooks";
import { removeStyle } from "./style";
import { SideTabs } from "./tabs";

const data = {
  title: "Remove this commented out code",
  subTitle: "Sections of code should not be commented out typescript:S125",
  typeText: "Where is the issue?",
  subText: "Why is this an issue?",
};

export const RemoveError = () => {
  const [activeTab, setActiveTab] = useState(1);
  const size = useWindowDimensions();
  

  const tabs = [
    {
      label: (
        <Typography sx={removeStyle.typoLableSX} gutterBottom>
          {data.subText}
        </Typography>
      ),
      value: 1,
      body: (
        <div>
          <Box sx={{...removeStyle.indiseBox, height:size.height-330, overflow:"overlay"}}>{data.subText}</Box>
        </div>
      ),
    },
    {
      label: (
        <Typography sx={removeStyle.typoLableSX} gutterBottom>
          {data.typeText}
        </Typography>
      ),
      value: 2,
      body: (
        <div>
          <Box sx={{...removeStyle.indiseBox, height:size.height-330, overflow:"overlay"}}>{data.typeText}</Box>
        </div>
      ),
    },
  ];
  return (
    <>
      <Box sx={{...removeStyle.rootBlock, height:size.height-128, overflow:"overlay"}}>
        <Box>
          <Typography sx={removeStyle.titleText}>{data.title}</Typography>
          <Typography sx={removeStyle.subText}>{data.subTitle} </Typography>
        </Box>

        <Box sx={removeStyle.paperBlock}>
          <Box>
            <SideTabs
              tabs={tabs}
              activeTab={activeTab}
              handleChangeTab={(val) => setActiveTab(val)}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};
