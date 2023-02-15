import React from "react";
import MenuItem from "@mui/material/MenuItem";
import { Box, Typography, InputLabel, FormControl, Select } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useCreategitTokenMutation, useCreategitLabMutation, } from "../../redux/services/oauth";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { closeBackdrop, openBackdrop } from "../../redux/slices/backdrop";


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
  },
  border: {
    border: "1.3px solid #CBCBCB",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "26px",
  },
  form: {
    marginTops: "0px",
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },
}));

let previousUrl = null;
let windowObjectReference = null;

export const RepoConfigurations = ({
  handleUpdate = () => { },
  label = "",
  isError = false,
  helpertext = "",
  value = "",
  git_details = {},
  open,
}) => {

  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();


  // Redux Hooks for API Integeration
  //Gitlab-Auth
  const [createGitlab] = useCreategitLabMutation();

  //Gitlab-Token
  const [verifyGitToken] = useCreategitTokenMutation();

  const showBackdrop = () => {
    dispatch(openBackdrop("Connecting your " + value + " account..."))
  }

  const hideBackdrop = () => {
    dispatch(closeBackdrop());
  }

  const createWindowObject = (oAuthURL, name) => {
    showBackdrop();
    const timer = setInterval(async () => {
      if (windowObjectReference.closed) {
        clearInterval(timer);
        /// proceed to verify whether user authorized their required oauth service
        let data = await verifyGitToken();
        handleUpdate("git_details", data?.data?.data ?? {});
        hideBackdrop();

        enqueueSnackbar("Nice! your connected to Git Account", {
          variant: "success", anchorOrigin: { horizontal: "center", vertical: "top" },
          className: classes.snackbar,
        });

      }
    }, 5000);

    const strWindowFeatures = "toolbar=no, menubar=no, width=600, height=700, top=100, left=100";

    if (windowObjectReference === null || windowObjectReference.closed) {
      windowObjectReference = window.open(oAuthURL, name, strWindowFeatures);
    } else if (previousUrl !== oAuthURL) {
      windowObjectReference = window.open(oAuthURL, name, strWindowFeatures);
      windowObjectReference.focus();
    } else {
      windowObjectReference.focus();
    }
    previousUrl = oAuthURL;
  };

  const handleOauthConn = async (connType) => {
    if (connType === "gitlab") {
      let data = await createGitlab();
      // let url = data?.data?.URL;
      if (data?.data?.URL) {
        createWindowObject(data?.data?.URL, "Gitlab Authorization");
      } else {
        enqueueSnackbar("Some error occured with gitlab authentication", { variant: "error" });
      }
    }
  };

  const handleChange = (event) => {
    handleUpdate("git_provider", event.target.value);
  };

  React.useEffect(() => {
    if(git_details !== {}){
      handleOauthConn(value);
    }
    // eslint-disable-next-line
  }, [value])

  return (
    <>
      <div className={classes.border}>
        <div className={classes.connection}>
          <Box>
            <Typography variant="subtitle2">Connect Git Account</Typography>
          </Box>
          <Box>
            <Box sx={{ minWidth: 120 }}>
              <FormControl
                sx={{ width: "147px", top: "-8px" }}
                variant="standard"
                error={isError}
              >
                <InputLabel id="demo-simple-select-label">Connect</InputLabel>
                <Select
                  className={classes.form}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={value}
                  label={label}
                  onChange={handleChange}
                >
                  <MenuItem value={"gitlab"} className={classes.gitconnection}>
                    <span className={classes.move}>
                      <img
                        src="/images/gitlab.png"
                        alt="Gitlab"
                        class={classes.git}
                      ></img>
                      GitLab
                    </span>
                  </MenuItem>
                  <MenuItem value={"gitbucket"} className={classes.gitconnection}>
                    <span className={classes.move}>
                      <img
                        src="/images/gitbucket.png"
                        alt="Gitbucket"
                        class={classes.git}
                      ></img>
                      GitBucket
                    </span>
                  </MenuItem>
                  <MenuItem value={"github"} className={classes.gitconnection}>
                    <span className={classes.move}>
                      <img
                        src="/images/gitHub.png"
                        alt="Github"
                        class={classes.git}
                      ></img>
                      GitHub
                    </span>
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

        </div>
      </div>
    </>

  );
};
