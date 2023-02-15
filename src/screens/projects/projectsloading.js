import React from 'react'
import {  Box, Grid, } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { Listloading, GridLoading } from '../../components';

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

export const Projectsloading = (props) => {
    const classes = useStyles();
    const skeletonArray = Array(20).fill('');
    return (
        <Box>
            {/* Projectloading */}
            <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 1, sm: 8, md: 12 }} sx={{ padding: "20px" }}>
                {
                    props.view === "gridView" ?
                        skeletonArray.map((e, index) => {
                            return (
                                <Grid item xs={2} sm={4} md={3} key={index}>
                                    <GridLoading />
                                </Grid>
                            )
                        }) : skeletonArray.map((e, index) => { return (
                                <Grid item xs={12} sm={12} md={12} className={classes.listi} key={index} >
                                    <Listloading />
                                </Grid>
                            )
                        })
                }
            </Grid>
        </Box>
    )
}
