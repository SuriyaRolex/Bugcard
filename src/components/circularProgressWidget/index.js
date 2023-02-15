import React from 'react'
import { Typography, Box, CircularProgress, circularProgressClasses } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Done, InfoOutlined } from '@mui/icons-material';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';

const useStyles = makeStyles((theme) => ({
  progressbox: {
    backgroundColor: "#f7f7f7",
    width: "190px",
    height: "145px",
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
  progressbarcircle: {
    display: "flex",
  },
  totalprogress: {
    padding: "15px"
  },
  avatarDiv: {
    display: "flex",
    alignItems: "center",
    height: "75%",
    justifyContent: "center"
  },
  avatar: {
    width: "60px",
    height: "60px"
  }
}));


const CircularProgressWithLabel = (props) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        className={props?.className}
        variant={props.variant ?? "determinate"}
        size={props?.size}
        value={props?.value}
        thickness={props.thickness}
        sx={{
          color: props?.color,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}



      />
      <Box
        sx={{
          top: 0, left: 0, bottom: 0, right: 0,
          position: 'absolute', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
        }}
      >
        <Typography variant="caption" component="div" color="textPrimary" sx={{ fontSize: "20px", lineHeight: "12px" }} >
          {props.icon}
        </Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
};

const giveMeProgressProps = (progress = 0, end = 100) => {
  let percentage = (progress / end) * 100;

  if (percentage < 50) {
    return { percentage, color: '#FF4141', icon: <RemoveCircleIcon fontSize={"28px"} /> }
  } else if (percentage >= 50 && percentage < 75) {
    return { percentage, color: '#FF4141', icon: <InfoOutlined fontSize={"28px"} /> }
  } else if (percentage >= 75 && percentage <= 100) {
    return { percentage, color: '#FF4141', icon: <Done fontSize={"28px"} /> }
  } else {
    return { percentage, color: '#FF4141', icon: <InfoOutlined fontSize={"28px"} /> }
  }
}

export const ProgressBar = ({
  title = "",
  type = "progressBar",
  countBar = 0,
  progress = 0
}) => {

  const classes = useStyles();

  const progressProps = giveMeProgressProps(progress);

  return (
    <div className={classes.progressbarcircle}>


      <Box className={classes.progressbox}>

        {/* Title */}
        <Typography variant="body1" sx={{ fontFamily: "crayond_semibold" }} gutterBottom>{title}</Typography>

        {/* ProgressBar-back */}
        { type === "progressBar" && <Box fontSize={"16px"}>
          <CircularProgress
            variant="determinate"
            sx={{ color: "#e3e3e3", position: "absolute", top: "40px", borderRadius: "12px" }}
            size={60}
            thickness={4}
            value={100}
          />
          {/* ProgressBar-front */}
          <CircularProgressWithLabel
            className={classes.bar}
            color={progressProps?.color}
            icon={progressProps.icon}
            size={60}
            variant="determinate" value={progressProps.percentage} thickness={5}
          />
        </Box>}
        {/* Footer Text */}
        { type === "progressBar" && <Typography variant="body2" gutterBottom>{progress}%</Typography>}

        {type === "countBar" && <div className={classes.avatarDiv}>
          <Avatar className={classes.avatar}>{countBar}</Avatar>
        </div>}
      </Box>
    </div>
  )
}
