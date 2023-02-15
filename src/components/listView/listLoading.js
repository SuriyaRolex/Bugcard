import React from 'react'
import { Avatar, Box, Grid, } from '@mui/material';
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

export const Listloading = () => {
    const classes = useStyles();
    return (
        <Box>
            <Grid item xs={12} sm={12} md={12} className={classes.listi} >
                <div className={classes.listview}>
                    {/* Cards */}
                    <Box className={classes.listbox}>
                        <Skeleton animation="wave" variant="circular">
                            <Avatar />
                        </Skeleton>
                        <Skeleton sx={{ width: "100%", maxWidth: "90px", margin: "0px 10px" }}></Skeleton>
                    </Box>
                    <Box>
                        <Skeleton animation="wave" sx={{ width: "100px", height: "30px", borderRadius: "7px" }}></Skeleton>
                    </Box>
                </div>
            </Grid> 
        </Box>
    )
}
