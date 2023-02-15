import React from "react";
import {
  Typography,
  Box,
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
// import { LoadingButton } from "@mui/lab";
import { InputField } from "../inputField";
import { PasswordField } from "../password";
import { Upload } from "../upload/fileupload";
import IconButton from "@mui/material/IconButton";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

const styles = makeStyles((theme) => ({
  border: {
    border: "1.3px solid #CBCBCB",
    padding: "12px",
    borderRadius: "8px",
  },
  InputField: {
    marginBottom: "4px",
  },
  pass: {
    margin: "15px 0px",
  },
  radiobtn: {
    flexDirection: "row",
    display: "flex",
    "& .MuiTypography-root": {
      fontSize: "12px",
      margin: "0px",
    },
  },
  uploadcontent: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 10px",
    backgroundColor: "#f1f1f1",
    borderRadius: "12px",
  },
}));

const InitialState = {
  cpu: "",
  memory: "",
  disk: "",
  error: {
    cpu: "",
    memory: "",
    disk: "",
  },
};

const CRENDTIAL_TYPE = {
  password: "password",
  ssh: "ssh",
};

export const CredentialsDetails = ({
  title = "",
  sshPassword = "",
  dataCredentials = [],
  loading = false,
  addTestButtonType = "",
  AddTestbtn = () => false,
  addTestButton = "",
  handleChangeSsh=()=>false,
  radioprimary = "",
  helperTextSsh='',
  isErrorSsh='',
  radiosecondary = "",
  handleChange,
  ssh_file,
}) => {
  const classes = styles();
  const [credentialType, setCredentialType] = React.useState("");
  const [data, setData] = React.useState({ ...InitialState });

  const OnSwitch = (event) => {
    setCredentialType(event.target.value);
  };

  const onClick = () => {
    let isValid = true;
    let error = data?.error;
    //Checking email
    if (data.cpu.length === 0) {
      isValid = false;
      error.cpu = "This field is mandatory";
    }
    if (data.memory.length === 0) {
      isValid = false;
      error.memory = "This field is mandatory";
    }
    if (data.disk.length === 0) {
      isValid = false;
      error.disk = "This field is mandatory";
    }
    setData({ ...data, error });
    return isValid;
  };

  return (
    <div>
      <div className={classes.border}>
        {/* Title */}
        <Typography variant="subtitle2" gutterBottom>
          {title}
        </Typography>

        {/* IP and Username Input Field*/}
        {dataCredentials.map((_, key) => (
          <div key={key} className={classes.report}>
            <Box className={classes.InputField}>
              <InputField
                label={_.label}
                placeholder={_.placeholder}
                fullWidth
                helperText={_.helperText}
                isError={_.isError}
                value={_.value}
                onClick={onClick}
                onChange={(e) => handleChange(_.key, e.target.value)}
              />
            </Box>
          </div>
        ))}

        {/* SSH File Upload and SSH Password Selection Radio Button  */}
        <FormControl
          sx={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "inherit",
            margin: "10px 0px",
          }}
        >
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={credentialType}
            onChange={OnSwitch}
            className={classes.radiobtn}
          >
            <span>
              <FormControlLabel
                value={CRENDTIAL_TYPE.ssh}
                control={<Radio sx={{ padding: "0px 0px" }} />}
                label={radioprimary}
                sx={{ fontSize: "14px", margin: "0px", padding: "0px 2px" }}
              />
            </span>
            <span>
              <FormControlLabel
                value={CRENDTIAL_TYPE.password}
                control={<Radio sx={{ padding: "0px 0px" }} />}
                label={radiosecondary}
                sx={{ fontSize: "14px", margin: "0px", padding: "0px 2px" }}
              />
            </span>
          </RadioGroup>
        </FormControl>

        {/* SSH File Upload*/}
        {credentialType === CRENDTIAL_TYPE.ssh && !ssh_file && (
          <Upload
            onChange={(e) => {
              handleChange("ssh_file", e.target?.files?.[0] ?? false);
            }}
          />
        )}

        {ssh_file && (
          <Box className={classes.uploadcontent}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {" "}
              <IconButton>
                {" "}
                <InsertDriveFileIcon sx={{ color: "#0065e6" }} />
              </IconButton>{" "}
              <Typography variant="subtitle1">{ssh_file.name}</Typography>
            </Box>
            <IconButton
              aria-label="delete"
              onClick={() => {
                handleChange("ssh_file", false);
              }}
            >
              <DeleteForeverIcon color="error" />
            </IconButton>
          </Box>
        )}

        {/* SSH Password Input*/}
        {credentialType === CRENDTIAL_TYPE.password && (
          <PasswordField
            className={classes.pass}
            onChange={handleChangeSsh}
            value={sshPassword}
            helperText={helperTextSsh}
            isError={isErrorSsh}
            placeholder="Password"
            fullWidth
          />
        )}

        {/* Test Connection Button */}
        {/* <Box sx={{ textAlign: "center", paddingTop: "10px" }}>
          <LoadingButton loading={loading} size="small" variant={addTestButtonType} className={classes.addButton} sx={{ color: "#18283E" }} onClick={AddTestbtn}>{addTestButton}</LoadingButton>
        </Box> */}
      </div>
    </div>
  );
};
