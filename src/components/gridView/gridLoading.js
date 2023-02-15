import React from 'react'
import { Box, Card } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
    root: {},
    load: {
        bgcolor: "#f2f2f2",
        width: "100%",
        maxWidth: "280px",
        height: "180px",
        borderRadius: "7px",
    },
    listbox: {
        display: "flex",
        width: "225px",
    },
    listview: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "rgb(225 225 225 / 38%)",
        padding: "15px 15px",
        boxShadow: "none",
        borderRadius: "7px",
        margin: "0px auto",
        position: "relative"
    },
    more: {
        position: "absolute",
        right: "0px",
        top: "22px"
    },
}));

export const  GridLoading = () => {
    const classes = useStyles();
    return (
        <Box>

            <Card sx={{ width: "100%", maxWidth: "370px", height: "290px", backgroundColor: "rgb(225 225 225 / 38%)", boxShadow: "none", padding: "5px 10px" }}>
                <Box sx={{ paddingTop: "10px", display: 'flex', justifyContent: 'center', }}>
                    <Skeleton animation="wave" className={classes.load} variant="rectangular" />
                </Box>
                <Box sx={{ paddingTop: "10px", display: 'flex', justifyContent: 'center', }}>
                    <Skeleton animation="wave" sx={{ width: "100px", borderRadius: "7px" }} variant="rectangular" />
                </Box>
                <Box sx={{ paddingTop: "10px", display: 'flex', justifyContent: 'center', }}>
                    <Skeleton animation="wave" sx={{ width: "100px", height: "30px", borderRadius: "7px" }} variant="rectangular" />
                </Box>
            </Card>
        </Box>
    )
}
