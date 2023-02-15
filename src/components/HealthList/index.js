import React from "react";
import { Box, Button, 
  // CircularProgress, 
  Typography } from "@mui/material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { 
  // Link,
   useNavigate } from "react-router-dom";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
// import { AppRoutes } from '../../router/routes';
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const useStyles = makeStyles((theme) => ({
  root: {},
  tablebox: {
    backgroundColor: "#fff",
    boxShadow: "0px 1px 7px 1px #e1e1e1",
    padding: "5px 5px",
    borderRadius: "12px",
  },
  linkto: {
    textDecoration: "none",
    color: "#0063E7",
  },
  btnsm: {
    width: "120px",
    textTransform: "capitalize",
    color: "#18283E",
    fontFamily: "crayond_regular",
  },
  btnsmView: {
    marginRight: "6px",
    width: "120px",
    textTransform: "capitalize",
    color: "#18283E",
    fontFamily: "crayond_regular",
  },
  aicon: {
    fontSize: "17px",
    margin: "-5px 5px",
  },
  issues: {
    padding: "0px 5px",
  },
  loadingSx: {
    width: " 20px !important",
    height: "20px !important",
  },
}));

export const HealthList = ({ healthData = [], loading = true }) => {
  console.log("000-000-000",healthData);
  const classes = useStyles();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const Status = {
    "No issue": (
      <CheckCircleIcon sx={{ color: "#00B17E" }} className={classes.aicon} />
    ),
    Incident: (
      <HandymanOutlinedIcon color="primary" className={classes.aicon} />
    ),
    Notice: (
      <AnnouncementIcon sx={{ color: "#0063E7" }} className={classes.aicon} />
    ),
    Maintenance: (
      <ReportProblemIcon sx={{ color: "#F9BB40" }} className={classes.aicon} />
    ),
    Outage: (
      <RemoveCircleIcon sx={{ color: "#FF4141" }} className={classes.aicon} />
    ),
  };

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }

  // const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState(false);

  // const onLoad = () => {
  //     setLoading(true);
  //     setTimeout(() => {
  //         setLoading(false)
  //         setSuccess(true)
  //     }, 1000)
  //     navigate(AppRoutes.route)
  // }

  return (
    <>
      <Box>
        {/* Title */}

        {/* Health Table*/}
        <TableContainer component={Paper} className={classes.tablebox}>
          <Table
            sx={{ minWidth: 950, borderRadius: "12px" }}
            size="small"
            aria-label="a dense table"
          >
            {healthData?.length > 0 &&
              healthData?.map((e, key) => (
                <TableBody key={key}>
                  <TableRow>
                    <TableCell align="left">{e.secondarytext}</TableCell>
                    <TableCell align="center">
                  

                      {Status[e.infotext]}
                     {e.infotext}
                    </TableCell>
                    <TableCell align="right">
                      {/* {loading && <CircularProgress />} */}

                      {e?.btnView && (
                        <Button
                          color="primary"
                          variant="outlined"
                          className={classes.btnsmView}
                          onClick={() => {
                            navigate(e?.view_route, { state: e?.errorLogData });
                          }}
                          // onClick={onLoad}
                          disabled={e?.btnViewDisable}
                        >
                          {e?.btnView}
                        </Button>
                      )}

                      <Button
                        color="primary"
                        variant="outlined"
                        className={classes.btnsm}
                        onClick={() => {
                          navigate(e?.route, { 
                            state: (e?.errorLogData, e?.headerText)  });
                        }}
                        // onClick={onLoad}
                      >
                        {e.btntext}
                        {/* {success ? "view" : loading ? "Runing" : "Run"} */}
                      </Button>
                      {!e?.HideMoreBtn && (
                        <span>
                          {" "}
                          <IconButton
                            className={classes.more}
                            onClick={handleClick}
                          >
                            <MoreVertIcon color="disabled" />
                          </IconButton>
                          <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                            className={classes.morelist}
                          >
                            <MenuItem
                              onClick={handleClose}
                              className={classes.border}
                            >
                              {" "}
                              <EditOutlinedIcon color="primary" />
                              <span className={classes.edit}>Edit</span>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                              {" "}
                              <DeleteOutlineOutlinedIcon color="warning" />
                              <span className={classes.edit}>Delete</span>{" "}
                            </MenuItem>
                          </Menu>
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}

            {healthData?.length === 0 ? (
              <TableRow>
                {" "}
                {loading ? (
                  <Typography variant="subtitle2">{"Loading..."}</Typography>
                ) : (
                  <Typography variant="subtitle2">
                    {"No data Found ! Please Add Atleast One Application."}
                  </Typography>
                )}
              </TableRow>
            ) : (
              <></>
            )}
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
