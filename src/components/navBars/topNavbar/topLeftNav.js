import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
// import { getNullableType } from "graphql";
import { useNavigate } from "react-router-dom";

export const TopLeftNav = ({
    showBackBtn = true,
    primaryText = "",
    secondaryText = "",
    prevURL = null
}) => {

    const navigate = useNavigate();

    const onBackBtnClicked = () => {
        if (prevURL) {
            navigate(prevURL);
        } else {
            navigate(-1);
        }
    }

    return <Box display={"flex"} alignItems={"center"} >
        {showBackBtn && <IconButton onClick={onBackBtnClicked}>
            <KeyboardBackspaceRoundedIcon />
        </IconButton>}
        <Typography variant={"body1"} color={"textPrimary"}>{primaryText}</Typography>
        <Typography variant={"caption"} sx={{ marginLeft: 0.5 }} color={"textSecondary"}>{`${secondaryText.length > 0 ? `(${secondaryText})` : ``}`}</Typography>
    </Box>
}