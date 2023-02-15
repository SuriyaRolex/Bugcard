import React from 'react'
import { makeStyles } from "@mui/styles";
import { Typography, Card, CardActions, CardContent, CardMedia, Button, Box } from '@mui/material';
// import { Menu, MenuItem, IconButton } from '@mui/material';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const useStyles = makeStyles((theme) => ({
    root: {},
    gridcard: {
        width: "100%",
        maxWidth: "280px",
        position: "relative",
        textAlign: "center",
        boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
        borderRadius: "7px",
        padding: "12px 15px",
        margin: "0px auto"
    },
    more: {
        position: "absolute",
        right: "4px",
        top: "5px"
    },
    gridimg: {
        width: "100%",
        maxWidth: "180px",
        margin: "6px auto"
    },
    morelist: {
        "& .MuiPopover-paper": {
            boxShadow: "0px 0px 7px 1px #b7b7b7"
        }
    },
    edit: {
        marginLeft: "8px"
    },
    border: {
        borderBottom: "1.5px solid #CBCBCB",
        margin: '4px',
    },
    btn: {
        
        fontFamily: "crayond_medium",
        fontSize: "14px",
        border: "0px",
        "&:hover": {
            border: "0px",
            backgroundColor: "#fff"
        }
    },
    btnt: {
        marginRight: "24px",
        fontFamily: "crayond_medium",
        fontSize: "14px",
        "&:hover": {
            border: "0px",
            backgroundColor: "#fff"
        }
    }

}));
export const GridView = ({ images = "", title = "", viewbtn = "", btnHelperText = "",
    btnVarient = "outlined", btnName = "", onBtnClick = () => { },
    onBtnView = () => { }, btnViewText = "" }) => {

    const classes = useStyles();

    // const [anchorEl, setAnchorEl] = React.useState(null);
    // const open = Boolean(anchorEl);

    // const handleClick = (e) => {
    //     setAnchorEl(e.currentTarget);
    // };

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };


    return (
        <div className='gridview'>
            {/* Cards */}
            <Card className={classes.gridcard}>
                <Box >

                    {/* for future use */}

                    {/* Moreicon */}

                    {/* <IconButton className={classes.more}  onClick={handleClick}>
                        <MoreVertIcon color='disabled' />
                    </IconButton>
                     <Menu
                        anchorEl={anchorEl} open={open} onClose={handleClose}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                        transformOrigin={{ vertical: 'top', horizontal: 'left', }}
                        className={classes.morelist}>
                        <MenuItem onClick={handleClose} className={classes.border}> <EditOutlinedIcon color='primary' /> <span className={classes.edit}>Edit</span> </MenuItem>
                        <MenuItem onClick={handleClose}> <DeleteOutlineOutlinedIcon color='warning' /><span className={classes.edit}>Delete</span> </MenuItem>

                    </Menu> */}
                    
                </Box>
                {/* images */}
                <CardMedia component="img" height="140" className={classes.gridimg} src={images} />

                {/* title */}
                <CardContent sx={{ padding: "0px" }}>
                    <Typography gutterBottom variant="subtitle1" sx={{ fontFamily: "Crayond_regular", padding: "5px 0px", margin: "0px" }} component="div">
                        {title}
                    </Typography>
                </CardContent>

                {/* footerbtn */}
                <CardActions sx={{ textAlign: "center", display: "inline-block" }}>
                    {btnHelperText.trim().length > 0 && <Typography variant="caption" color="textSecondary" component={"p"}>{btnHelperText}</Typography>}
                    <Button className={classes.btn} variant={btnVarient} onClick={onBtnClick} sx={{}}>{btnName}</Button>
                    {btnViewText.trim().length > 0 && <Button className={classes.btnt} variant="outlined" onClick={onBtnView} sx={{}}>{btnViewText}</Button>}

                </CardActions>
            </Card>
        </div>
    )
}
