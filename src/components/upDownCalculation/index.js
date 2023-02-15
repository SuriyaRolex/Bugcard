import React from 'react'
import { Typography, Box, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { UpArrow, DownArrow } from '../../assets';

const useStyles = makeStyles((theme) => ({
    upbox: {
        backgroundColor: "#f7f7f7",
        width: "176px",
        height: "140px",
        textAlign: "center",
        padding: "10px 10px",
        boxShadow: "0px 3px 6px #00000029",
        border: "2px solid #fff",
        borderRadius: "7px",
        margin: "0px auto",
        position: "relative"
    },
    bar: {
        position: "relative",
        borderRadius: "25px"
    },
    upcircle: {
        display: "flex",
    },
    totalprogress: {
        padding: "15px"
    },
    updown: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1px"

    },
    up: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",

    }, number: {
        fontSize: "28px"
    },arrow:{
        marginLeft:"6px",
        fontSize:"14px"
    }

}));


export const UpDownCalculation = ({ title = "", calculations = "", numberUp = "", numberDown = "", numUp = "", numDown = "" }) => {

    const classes = useStyles();

    return (
        <div className={classes.upcircle}>


            <Box className={classes.upbox}>

                {/* Title */}
                <Typography variant="body1" sx={{ fontFamily: "crayond_semibold" }} gutterBottom>{title}</Typography>

                {/* ProgressBar-back */}
                <Box fontSize={"16px"}>
                    <Typography variant="h6">{calculations}</Typography>
                    <div className={classes.updown}>
                        <Box> <div className={classes.up}>
                            <Typography variant="h6" className={classes.number}>{numberUp}<UpArrow className={classes.arrow} /></Typography>
                        </div>
                            <Typography variant="subtitle1" sx={{ fontSize: "12px" }}>{numUp} </Typography></Box>
                        <Divider orientation="vertical" variant="middle" flexItem sx={{ margin: "8px 8px", height: "32px" }} />
                        <Box>
                            <div className={classes.up}>
                                <Typography variant="h6" className={classes.number}>{numberDown}<DownArrow className={classes.arrow} /> </Typography>
                            </div>
                            <Typography variant="subtitle1" sx={{ fontSize: "12px" }}>{numDown} </Typography>
                        </Box>
                    </div>
                </Box>
                {/* Footer Text */}
                <Typography variant="body2" gutterBottom></Typography>
            </Box>




        </div>
    )
}
