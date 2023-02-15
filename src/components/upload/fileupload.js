import React from "react";
import { IconButton, Grid, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        marginBottom: theme.spacing(1),
    },
    root: {
        width: "100%",
        height: "100%",
        "& input": {
            position: "absolute",
            width: "100%",
            height: "100%",
            opacity: 0,
            left: 0,
            cursor: "pointer",
            zIndex: 10000,
        },
        "& .MuiButton-root": {
            top: "80px",
        },
        "& .MuiTypography-colorPrimary": {
            marginTop: theme.spacing(11),
        }
    },
    drap: {
        position: "relative",
        borderRadius: 8,
        textAlign: "center",
        background: "#F3F3F3",
        padding: "10px 10px",
        margin: "7px 0px",
    },
    drap2: {
        position: "relative",
        borderRadius: 6,
        textAlign: "center",
        background: "#FFFFFF",
    },
    text: {
        color: " #3461FF",
        textDecoration: "underline",
        fontSize: "12px",
        fontWeight: 600,
    },
    text2: {

        fontSize: "14px",
        fontWeight: 500,
        padding: 10,
    },
    dragfile: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

    }
}));

export const Upload = (props) => {
    const classes = useStyles(props);
    return (
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.gridContainer}
        >
            <Grid item xs={12}>
                <div className={classes.drap}>
                    <div className={classes.root}>
                        <Typography variant="h6" sx={{ fontFamily: 'crayond_regular', color: "#1a1a1a" }}>{props?.name}</Typography>
                        <div className={classes.dragfile}>
                           
                            {props?.single && <input
                                accept=".file"
                                type="file"
                                onChange={(e) => props.onChange(e)}
                                disabled={props.disabled}
                            />}

                            {!props?.single && <input
                                accept=".file"
                                type="file"
                                single
                                onChange={(e) => props.onChange(e)}
                                disabled={props.disabled}
                            />}

                            {/* Upload  icon*/}
                            <IconButton style={{ marginTop: "-1px", textTransform: "capitalize", color: "#4E5A6B" }}
                            >
                                <UploadFileIcon sx={{ fontSize: "20px" }} />
                            </IconButton>

                            {/* Upload  title*/}
                            <Typography color={"#4E5A6B"} fontSize={"14px"} fontFamily={"crayond_regular"}>Drag and drop the file or</Typography>
                            <br />
                            <Typography color={"#98A0AC"} fontSize={"12px"} fontFamily={"crayond_regular"} ><span className={classes.text}>choose the file</span> </Typography>
                        </div>
                    </div>
                </div>
            </Grid >
        </Grid>
    );
};