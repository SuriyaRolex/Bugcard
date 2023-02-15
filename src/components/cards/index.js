import { Avatar, Box, Stack, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import React from "react";
import { cardstyle } from "./style";

export default function StatCard(props) {
  const {
    name="",
    domain="",
    data,
    cardValue,
    icon,
    color,
    Color,
    subTitle,
    number,
    BackgroundColor='',
    metricData=''
  } = props;

  return (
    <Card sx={cardstyle?.rediesSx}>
      <Box sx={cardstyle?.cardSx}>
        <Stack
          sx={cardstyle?.stackSx}
          direction="row"
          justifyContent={"space-between"}
        >
          <Box sx={cardstyle?.boxSx}>
            <Typography
              sx={[cardstyle?.numberSx, { color: color }]}
            >
              {cardValue}
            </Typography>
            <Box sx={{marginTop:"4px"}}>{icon}</Box>
          </Box>
          <Box sx={cardstyle?.boxxxSx}>
            <Typography
              sx={[cardstyle?.numberSx, { color: color?.numberColor }]}
            >
              {data}
            </Typography>
            <Box sx={[cardstyle?.numberSx, { color: color?.numberColor }]}>
              {number}
            </Box>
          </Box>
        </Stack>
        <Stack direction="row" justifyContent={"space-between"}>
          <Box>
            <Typography sx={cardstyle?.HeadText}>{name}</Typography>
          </Box>
          <Typography sx={cardstyle?.HeadText}>{subTitle}</Typography>
        </Stack>
      </Box>
      <Box sx={[cardstyle?.cardContent, { backgroundColor: BackgroundColor }]}>
        <Typography sx={cardstyle?.cardText}>{domain}</Typography>
        <Avatar
          sx={[
            cardstyle?.cardAvater,
            { color:Color},
          ]}
        >
          {metricData}
        </Avatar>
      </Box>
    </Card>
  );
}
