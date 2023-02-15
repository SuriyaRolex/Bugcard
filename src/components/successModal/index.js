import { Card, Typography, CardContent } from '@mui/material'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import React from 'react'
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    totalbox: {
        width: "100%",
        maxWidth: "330px",
        margin: "0px auto",
        textAlign: "center",
        padding: "15px 15px",
        boxShadow: "0px 8px 69px #0000001A",
        borderRadius: 16,
    },
    successbox: {
        height: "60px", width: "60px"

    }, link: {
        textDecoration: "none",
        marginLeft: 4,
        color: theme.palette.primary.main
    }, content: {
        padding: "0px 0px"
    }

}));
export const SuccessModal = ({ para = "", btntext = "", onLogin = () => { }, linkedtext = "", link = "" }) => {
    const classes = useStyles();
    return (
        <div>
            <Card className={classes.totalbox} >

                {/*SuccessIcon  */}
                <CheckCircleRoundedIcon color='success' className={classes.successbox} />

                <CardContent className={classes.content}>
                    {/*Successpara  */}
                    <Typography variant="body1" sx={{ color: "#000" }}>
                        {para}
                    </Typography>

                    {/*Successlink*/}
                    <Typography sx={{ marginTop: 2, textAlign: "center" }} variant="body2" color={"textSecondary"}>
                        {btntext} <Link className={classes.link} to={link} >{linkedtext}</Link>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}
