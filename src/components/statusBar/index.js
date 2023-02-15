import React from "react";
import { Typography, Box, Button, Avatar, Divider, Menu, MenuItem, Paper, Grid, Stack } from '@mui/material';
import { makeStyles } from "@mui/styles";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const useStyles = makeStyles((theme, value) => ({
    root: {
        width: "90%",
        margin: "auto",
    },
    slNoAvatar: {
        width: 24, height: 24,
        backgroundColor: theme.palette.primary.main,
        fontSize: 12
    },
    subTitle: {
        color: theme.palette.typography.main,
    },
    logo: {
        marginLeft: "18px",
        width: "20px",
        height: "20px"
    },
    dropdownLogo: {
        width: "20px",
        height: "20px",
        marginRight: "10px",
    },
    dropdownLogoBottom: {
        borderBottom: "1px solid #00000029"
    },
    headMenuList: {
        cursor: "pointer",
    },
    active: {
        backgroundColor: '#0063E7',
        width: '2px',
        height: "8px"
    },
    in_active: {
        backgroundColor: '#CBCBCB',
        width: '2px',
        height: "8px"
    },
    dottedLine: {
        position: "absolute",
        left: "90px"
    },
    childTitle: {
        color: "#18283E",
        fontFamily: "crayond_bold"
    }
}))

export const StatusBar = ({
    title = "",
    slNo = 1,
    primaryText = "",
    primaryTextLogo = "",
    secondaryText = "",
    primaryButton = "",
    primaryButtonType = "contained",
    onPrimaryButtonClicked = () => false,
    secondaryButton = "",
    onSecondaryButtonClicked = () => false,
    connector = false,
    isConnectorActive = false,
    dropDownName = "",
    dropDownOptions = [], // [ { value:"value",label:"label" } ]
    onDropDownChanged = () => false,
    child = {}, // { title:"Title 1", row: [ { projectName: "Project 1", port: "3000" } ], column: ['ProjectName', 'port'] }
    isStepper = false,
    isDidiver = false,
    onDeleteButtonClicked = () => false,
    onModifyButtonClicked = () => false,
}) => {
    const [
        value, 
        // setValue
    ] = React.useState(0)

    // const handleOnclick = () => { setValue(value + 1) }

    const classes = useStyles(value);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (e) => { setAnchorEl(e.currentTarget) };

    const handleClose = () => { setAnchorEl(null) };

    return <div className={classes.root} >
        {/* Title of the Status Bar */}
        <Typography gutterBottom variant="body1" sx={{ fontFamily: "crayond_bold" }}>{title}</Typography>
        <Box>
            {/* Card */}
            <Paper elevation={0} sx={{ boxShadow: "0px 3px 6px #00000014", padding: 2, borderRadius: "10px", border: "0.5px solid #CBCBCB", postion: "relative" }} >
                <Grid container justifyContent={"space-between"} alignItems={"center"} >

                    {/* Left Section */}
                    <Grid item>
                        <Box display={"flex"} alignItems={"center"} >
                            {/* Sl No */}
                            <Avatar className={classes.slNoAvatar}>{slNo}</Avatar>

                            {/* Primary Text */}
                            <Typography sx={{ marginLeft: 2 }} variant="subtitle1">{primaryText}</Typography>

                            {/* Primary Text Logo */}
                            {primaryTextLogo.trim().length > 0 && <img className={classes.logo} alt={"Logo"} src={primaryTextLogo} />}

                            {/* Secondary Text */}
                            {secondaryText.trim().length > 1 && <Box display={"flex"} marginLeft={1}>
                                <Divider orientation="vertical" sx={{ height: 16, marginTop: 0.25 }} />
                                <Typography sx={{ marginLeft: 2 }} color={"textSecondary"} variant="subtitle2">{secondaryText}</Typography>
                            </Box>}
                        </Box>
                    </Grid>

                    {/* Right Section */}
                    <Grid item>
                        <Box display={"flex"} >

                            {/* Secondary Button */}
                            {secondaryButton?.length > 0 && <Button className={classes.subTitle} sx={{ marginRight: 2 }} variant={"outlined"} size="small" onClick={onSecondaryButtonClicked} >{secondaryButton}</Button>}

                            {/* Primary Button */}
                            {primaryButton.trim().length > 0 && <Button variant={primaryButtonType} size="small" onClick={onPrimaryButtonClicked} >{primaryButton}</Button>}

                            {/* Dropdown */}
                            {dropDownName?.length > 0 &&
                                <Box className={classes.headMenuList} display={"flex"}>
                                    <Box onClick={handleClick} display={"flex"} className={classes.subTitle}>
                                        {dropDownName}
                                        <KeyboardArrowDownIcon />
                                    </Box>
                                    <Menu
                                        anchorEl={anchorEl} open={open} onClose={handleClose}
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                                        transformOrigin={{ vertical: 'top', horizontal: 'left', }}
                                    >
                                        <MenuItem onClick={handleClose} className={classes.dropdownLogoBottom}><img src="images/gitlab-logo.png" alt="gitLab" className={classes.dropdownLogo} /><span>Gitlab</span></MenuItem>
                                        <MenuItem onClick={handleClose} className={classes.dropdownLogoBottom}><img src="images/gitHub.png" alt="gitHub" className={classes.dropdownLogo} /><span>Github</span></MenuItem>
                                        <MenuItem onClick={handleClose}><img src="images/bitBucket.png" alt="gitBucket" className={classes.dropdownLogo} /><span>Bitbucket</span></MenuItem>
                                    </Menu>
                                </Box>
                            }
                        </Box>
                    </Grid>
                </Grid>
                {/* Divider */}
                {isDidiver &&
                    <>
                        <Divider sx={{ marginTop: "14px", marginBottom: "14px" }} />
                        <Box display={"flex"} alignItems={"end"} >
                            <Box flexGrow={1}>
                                <Stack
                                    direction="row"
                                    divider={<Divider orientation="vertical" flexItem sx={{ height: 20 }} />}
                                    spacing={4}
                                >
                                    <Typography className={classes.childTitle} variant="subtitle2" gutterBottom>{child?.title}</Typography>
                                    {
                                        child?.column?.map((col) => {
                                            return child?.row?.map((row) => {
                                                return <Typography className={classes.subTitle} variant="subtitle2" gutterBottom>{row?.[col]}</Typography>
                                            })
                                        })
                                    }
                                </Stack>
                            </Box>
                            <Box>
                                {/* delete Button */}
                                {<Button sx={{ marginRight: 2 }} className={classes.subTitle} variant={"outlined"} size="small" onClick={onDeleteButtonClicked} >Delete</Button>}

                                {/* modify Button */}
                                {<Button variant={"contained"} size="small" onClick={onModifyButtonClicked} >Modify</Button>}
                            </Box>
                        </Box>
                    </>
                }
            </Paper>
            {/* stepper */}
            {isStepper &&
                <div className={classes.dottedLine} >
                    <Box className={value > 0 ? classes.in_active : classes.active} />
                    <Box className={value > 0 ? classes.in_active : classes.active} sx={{ marginTop: '6px' }} />
                </div>
            }
        </Box>
    </div>
}