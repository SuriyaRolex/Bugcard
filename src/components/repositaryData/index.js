import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
// import { InputField } from "../inputField";
import LoopIcon from "@mui/icons-material/Loop";
import { AutocompleteCmp } from "../autoCompleteCmp";

const useStyles = makeStyles((theme) => ({
  dropdown: {
    color: "#000",
    display: "flex",
    marginLeft: 0,
    fontSize: "18px",
    fontFamily: "crayond_medium",
    alignItems: "center",
    cursor: "pointer",
  },
  gitconnection: {
    alignItems: "center",
  },
  git: {
    width: "100%",
    maxWidth: "20px",
    margin: "-5px 6px",
  },
  connection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "26px",
  },
  border: {
    border: "1.3px solid #CBCBCB",
    padding: "12px",
    borderRadius: "8px",
  },
  InputField: {
    paddingTop: "15px",
  },
  refreshBtnSx: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));
export const RepositaryData = ({
  title = "",
  gitlabData = [],
  handleChange = () => {},
  refreshIconBtn = () => false,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.border}>
      {/* gitforms */}
      <Box className={classes.refreshBtnSx}>
        <Typography variant="subtitle2" gutterBottom>
          {title}
        </Typography>

        <IconButton onClick={()=>refreshIconBtn()}>
          <LoopIcon style={{color:'#0063e7'}} />
        </IconButton>
      </Box>
      <Box className={classes.gitlab}>
        {gitlabData?.map((_, key) => (
          <div key={key} className={classes.report}>
            <Box className={classes.InputField}>
              <AutocompleteCmp
                options={_?.options || ""}
                // defaultValue={_?.defaultValue}
                onChange={(e, value) =>
                  handleChange(_?.key, e.target.value, value)
                }
                label={_?.label}
                value={_?.value ?? ""}
                // default
                placeholder={_?.placeholder}
                loading={_?.loading}
              />
            </Box>
          </div>
        ))}
      </Box>
    </div>
  );
};
