import React from "react";
import { makeStyles } from "@mui/styles";
import {Typography,Button, Box,Avatar} from "@mui/material";
// import { Menu, MenuItem, IconButton } from "@mui/material"
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const useStyles = makeStyles((theme) => ({
  root: {},
  listview: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: "15px 15px",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    borderRadius: "7px",
    margin: "0px auto",
    position: "relative",
  },
  listbox: {
    display: "flex",
    width: "300px",
  },
  more: {
    position: "absolute",
    right: "0px",
    top: "15px",
  },
  edit: {
    marginLeft: "8px",
  },
  border: {
    borderBottom: "1.5px solid #CBCBCB",
    margin: "4px",
  },
  morelist: {
    "& .MuiPopover-paper": {
      boxShadow: "0px 0px 7px 1px #b7b7b7",
    },
  },
  btn: {
    marginRight: "24px",
    fontFamily: "crayond_medium",
    fontSize: "14px",
    margin:"2px",
    "&:hover": {
      backgroundColor: "#fff",
    },
  },
  btnt: {
    marginRight: "24px",
    fontFamily: "crayond_medium",
    fontSize: "14px",
  },
}));

export const ListView = ({images = "",title = "",btnName = "",alter = "", onBtnClick = () => {},onBtnView = () => {}, btnHelperText = "",
  btnVarient = "", btnViewText = "",handleDelete=()=>{}}) => {

  const classes = useStyles();
  // const [anchorEl, setAnchorEl] = React.useState(null);


  // for future use
  // function handleClick(event) {
  //   if (anchorEl !== event.currentTarget) {
  //     setAnchorEl(event.currentTarget);
  //   }
  // }

  // function handleClose() {
  //   setAnchorEl(null);
  // }
 

  return (
    <div className={classes.listview}>
      {/* Cards */}
      <Box className={classes.listbox}>
        {/* Avatar */}
        <Avatar alt={alter} src={images} />

        {/* Title */}
        <Typography gutterBottom variant="subtitle1" sx={{ fontFamily: "Crayond_regular",padding: "5px 15px", margin: "0px",}} component="div">
          {title}
        </Typography>
      </Box>

      <Box sx={{ display: "flex" }}>
        <Box>
          {btnHelperText.trim().length > 0 && ( <Typography variant="caption" color="textSecondary"> {btnHelperText} </Typography> )}
          <Button className={classes.btn} variant={btnVarient} onClick={onBtnClick}>
            {btnName}
          </Button>
          {btnViewText.trim().length > 0 && (
            <Button className={classes.btnt} variant="outlined" onClick={onBtnView}>
              {btnViewText}
            </Button>
          )}

          {/* for future useage */}

          {/* Moreicon */}
          {/* <IconButton
            className={classes.more}
            onClick={handleClick}
          >
            <MoreVertIcon color="disabled" />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} className={classes.morelist}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }} 
          >
            <MenuItem onClick={handleClose} className={classes.border}>
              {" "}
              <EditOutlinedIcon color="primary" />
              <span className={classes.edit}>Edit</span>
            </MenuItem>
            <MenuItem onClick={handleDelete}>
              {" "}
              <DeleteOutlineOutlinedIcon color="warning" />
              <span className={classes.edit}>Delete</span>{" "}
            </MenuItem>
          </Menu> */}

        </Box>
      </Box>
    </div>
  );
};
