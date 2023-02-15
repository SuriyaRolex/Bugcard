import React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, Button, Divider, Avatar, Typography, IconButton } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { Logout } from "../../../assets";
import { LocalStorageKeys } from "../../../utils";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../router/routes";
import { useSelector } from "react-redux";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import DownloadIcon from '@mui/icons-material/Download';
import { useStyles } from "./style";
import { TopLeftNav } from "./topLeftNav";

export const TopNavBar = ({
  showTopLeftNav = false,
  showBackBtn = true,
  primaryText = "",
  secondaryText = "",
  showActionBtn = false,
  actionBtnName = "",
  isDownloadRefreshRequired= false,
  onDownload =()=>{},
  onRefresh=()=>false,
  actionBtnOnClick = () => false,
}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userDetails);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem(LocalStorageKeys.authToken);
    navigate(AppRoutes.login);
  };

  const homeScreen = () => {
    navigate(AppRoutes.home);
  };

  return (
    <div className={classes.grow}>
      <div>
        {/* card */}
        <Box className={classes.card}>
          {/* Title */}
          <Box className={classes.header}>
            {showTopLeftNav === false && (
              <>
                Automatly
                <Typography
                  component={"p"}
                  variant={"caption"}
                  color={"textSecondary"}
                >{`v${localStorage.getItem(
                  LocalStorageKeys.version
                )}`}</Typography>
              </>
            )}
            {showTopLeftNav === true && (
              <TopLeftNav
                showBackBtn={showBackBtn}
                primaryText={primaryText}
                secondaryText={secondaryText}
              />
            )}
          </Box>

          {/*img & Dropdown */}
          <Box>
            <Box className={classes.profile}>
              {/* Action Button */}
              {showActionBtn === true && (
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ fontFamily: "crayond_medium", fontSize: "14px" }}
                    onClick={actionBtnOnClick}
                  >
                    {actionBtnName}
                  </Button>
                </Box>
              )}
              {isDownloadRefreshRequired && (
                <>
                <Box>
                    <IconButton onClick={onRefresh} className={classes.downloadbtnSx}>
                    <AutorenewIcon   className={classes.iconSx}/>
                    </IconButton>
                </Box>
                 <Box>
                 <IconButton  onClick={onDownload} className={classes.downloadbtnSx}>
                 <DownloadIcon className={classes.iconSx}/>
                 </IconButton>
             </Box>
             </>
              )}
              {/* Divider*/}

              <Divider
                orientation="vertical"
                variant="middle"
                flexItem
                sx={{ margin: "8px 8px", height: "32px" }}
              />

              {/* Refresh  and Download */}
              

              {/*pro-img*/}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <HomeOutlinedIcon
                  onClick={homeScreen}
                  className={classes.profileicon}
                  sx={{
                    backgroundColor: "#f7f7f7",
                    color: "#c3c3c3",
                    borderRadius: "6px",
                    fontSize: "29px",
                  }}
                />

                <Box
                  onClick={handleClick}
                  onMouseOver={handleClick}
                  className={classes.dropdown}
                >
                  <Avatar
                    alt=""
                    className={classes.profileicon}
                    sx={{
                      backgroundColor: "#ededed",
                      borderRadius: "20px",
                      fontSize: "16px",
                      color: "#8d8d8d",
                      opacity: anchorEl ? 0.3 : 1,
                    }}
                  >
                    {userData?.name?.charAt(0)?.toUpperCase()}
                  </Avatar>

                  {/*icons-up&down*/}
                  {anchorEl ? (
                    <KeyboardArrowUpIcon className={classes.icon} />
                  ) : (
                    <KeyboardArrowDownIcon className={classes.icon} />
                  )}
                </Box>
              </Box>
            </Box>
            {/* Menu list */}
            <Menu
              className={classes.Menu}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
            >
              <MenuItem onClick={handleLogout} className={classes.logout}>
                <Logout />
                <span className={classes.move}>Logout</span>
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </div>
    </div>
  );
};
