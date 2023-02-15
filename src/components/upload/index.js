import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DriveFolderUploadOutlinedIcon from '@mui/icons-material/DriveFolderUploadOutlined';
import GetAppIcon from '@mui/icons-material/GetApp';
import {
    Button,
    Grid,
    IconButton,
    Typography
} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import React from "react";
import { AlertContext } from '../../contexts';
import { AlertProps, ToBase64 } from '../../utils';
import { Upload } from "./fileupload";






var b64toBlob = require('b64-to-blob');
var FileSaver = require('file-saver');


const useStyles = makeStyles((theme) => ({
    rootContainer: {
        position: "relative",
        minHeight: "100%",
        backgroundColor: theme.palette.background.paper,
        margin: 0,
    },
    root: {

    },
    footer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
    },
    content: {
        display: "inline-flex",
        width: "100%",
    },
    cardContainer: {
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(2),
        boxShadow: "0px 10px 15px #00000014",
        border: "2px solid #E2E2E2",
        borderRadius: "8px",
    },
    Container: {
        marginBottom: theme.spacing(2),
        padding: "4px",
        borderRadius: "12px",
        border: "1px solid #E4E8EE",
        display: "flex",

    },
    circularLoader: {
        paddingRight: "8px",
        position: "relative",
        "& .MuiCircularProgress-root": {
            position: "relative",
        },
    },
    loadCenter: {
        position: "absolute",
        left: 14,
    },
    uploadText: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    },
    errorText: {
        color: 'red',
        fontSize: '0.75rem'
    }
}));

export const UploadReports = (props) => {
    const classes = useStyles(props);

    const alert = React.useContext(AlertContext);

    const [uploaddocc, setuploaddocc] = React.useState(props?.value ? props?.value : []);


    const returnFileSize = (number) => {
        if (number < 1024) {
            return number + 'bytes';
        } else if (number >= 1024 && number < 1048576) {
            return (number / 1024).toFixed(1) + 'KB';
        } else if (number >= 1048576) {
            return (number / 1048576).toFixed(1) + 'MB';
        }
    }

    const FileSizeSetLimit = (number) => {
        if (number >= 1048576) {
            if ((number / 1048576).toFixed(1) > 15) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    const handleUpload = async (e) => {
        e.preventDefault();
        let file = e.target.files[0];
        let size = returnFileSize(file.size);
        let files = new FormData();
        files.append("files", file);
        let base = await ToBase64(file);
        const data = {
            name: file?.name,
            load: true,
            file: base,
            size: size,
            data: file
        };
        if (FileSizeSetLimit(file.size)) {
            if (props?.single && uploaddocc.length >= 1) {
                alert.setSnack({
                    ...alert,
                    open: true,
                    severity: AlertProps.severity.error,
                    msg: "Only Single File can be Uploaded !",
                    vertical: AlertProps.vertical.top,
                    horizontal: AlertProps.horizontal.center
                })
            } else {

                if (props?.single && !validFileType(file)) {
                    alert.setSnack({
                        ...alert,
                        open: true,
                        severity: AlertProps.severity.error,
                        msg: "Only Image File Type Accepted !",
                        vertical: AlertProps.vertical.top,
                        horizontal: AlertProps.horizontal.center
                    })
                }

                if (validFileType(file) && props?.single) {
                    setuploaddocc([...uploaddocc, ...[data]]);

                    props.onChange([...uploaddocc, ...[data]]);
                }




                if (!props?.single) {
                    setuploaddocc([...uploaddocc, ...[data]]);

                    props.onChange([...uploaddocc, ...[data]]);
                }

            }

        }
        if (!FileSizeSetLimit(file.size)) {
            alert.setSnack({
                ...alert,
                open: true,
                severity: AlertProps.severity.error,
                msg: "File Size Too Large !",
                vertical: AlertProps.vertical.top,
                horizontal: AlertProps.horizontal.center
            })
        }


    };
    const handleDelete = (i) => {
        uploaddocc.splice(i, 1);
        setuploaddocc([...uploaddocc]);
        props.onChange([...uploaddocc]);
    };

    const getLabel = (props) => {
        return <Typography variant="body1" style={{ fontSize: "11px", color: "textsecondary" }} gutterBottom >{props?.label} {props?.isrequired && <Typography variant="caption" style={{ color: "red", marginLeft: "2px" }}>*</Typography>}</Typography>
    }


    const fileTypes = [
        "image/apng",
        "image/bmp",
        "image/gif",
        "image/jpeg",
        "image/pjpeg",
        "image/png",
        "image/svg+xml",
        "image/tiff",
        "image/webp",
        "image/x-icon",
        "image/pdf"
    ];

    const validFileType = (file) => {
        return fileTypes.includes(file.type);
    }


    const Download = async (data) => {


        var contentType = data.file.match(/[^:]\w+\/[\w-+\d.]+(?=;|,)/)[0];
        var b64Data = data.file.split(',')[1];
        var blob = await b64toBlob(b64Data, contentType);
        var saveBlob = await new Blob([blob], { type: contentType });

        await FileSaver.saveAs(saveBlob, data.name);

    }

    const uploadfile = () => {
        if (props.uploadfile) {
            props.uploadfile(uploaddocc)
        }
    }

    return (
        <div className={classes.rootContainer}>

            <div className={classes.root} noValidate>
                <Typography variant="body1" color={"textPrimary"}>
                    {getLabel(props)}
                </Typography>
                <Grid sx={{ backgroundColor: "black" }}>
                    {(!props?.isReadonly && uploaddocc?.length === 0) ?
                        <Grid item>
                            <Upload onChange={handleUpload} single={props?.single} state={uploaddocc} />
                        </Grid> : <></>}
                    {uploaddocc?.length > 0 &&
                        <div style={{ overflowY: 'auto', overflowX: 'hidden', height: props?.single ? "62.5px" : "125px" }}>
                            {
                                uploaddocc?.map((item) => {
                                    return (
                                        <Grid
                                            container
                                            className={classes.Container}
                                        >
                                            <Grid item xs={2}>
                                                 <DriveFolderUploadOutlinedIcon />
                                            </Grid>

                                            <Grid itemxs ={props?.isReadonly ? 8 : 6} className={classes.uploadText}>
                                                <Typography variant="subtitle2" color="textPrimary">
                                                    {item?.name}
                                                </Typography>
                                            </Grid>

                                            <Grid item xs={2} >
                                                {<IconButton
                                                    onClick={() => Download(item)}>
                                                    <GetAppIcon style={{ color: "green" }} />
                                                </IconButton>
                                                }
                                            </Grid>

                                            <Grid item xs={2}>
                                                {!props?.isReadonly && <IconButton
                                                    onClick={() => handleDelete()}
                                                    aria-label="settings"
                                                    disabled={props?.isReadonly}
                                            >
                                                    <DeleteOutlineOutlinedIcon style={{ color: "red", marginRight: "3px" }} />
                                                </IconButton>}
                                            </Grid>
                                        </Grid>
                                    );
                                })
                            }
                        </div>}
                    <Grid item xs={12} textAlign={"center"}>
                        <Button disabled={props?.loading ? props?.loading : uploaddocc?.length > 0 ? false : true} variant='contained' onClick={() => uploadfile()} >
                            Upload
                        </Button>
                    </Grid>
                </Grid>

            </div>
        </div >
    );
};