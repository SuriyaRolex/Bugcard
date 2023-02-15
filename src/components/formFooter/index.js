import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

const useStyles = makeStyles((theme) => ({
    root: {},
    link: {
        textDecoration: "none",
        marginLeft: 4,
        color: theme.palette.primary.main
    }
}));

export const FormFooter = ({ btnName = "", onClick = () => false, footerText = "", linkText = "", link = "", isLoading = false, }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>

            {/* Button */}
            <LoadingButton loading={isLoading}  onClick={onClick} sx={{marginTop: 2, borderRadius: 2 }} variant="contained" color="primary" fullWidth >
                {btnName}
            </LoadingButton>

            {/* Footer Text */}
            <Typography sx={{ marginTop: 2, textAlign: "center" }} variant="body2" color={"textSecondary"}>
                {footerText}
                <Link className={classes.link} to={link} >{linkText}</Link>
            </Typography>
        </div>
    );
};




