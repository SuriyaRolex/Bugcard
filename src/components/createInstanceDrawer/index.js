import React from "react";
import { Box } from "@mui/material";
import { InputField } from "../inputField";
import { Report } from "../reportConfiguration";
import { InstanceDetails } from "../instanceDetails";
import { CredentialsDetails } from "../credentialsDetails";
import { DrawerHeader } from "../drawerHeader";
import { useCreateCreateInstanceMutation } from "../../redux/services/Instance";
import { useDispatch } from "react-redux/es/exports";
import { closeDrawer } from "../../redux/slices/drawer";
import { useSnackbar } from "notistack";
import { refreshProjectInstanceListing } from "../../redux/slices/utils";
import { makeStyles } from "@mui/styles";
import { AppRoutes } from "../../router/routes";
import { useGetOsVersionQuery } from "../../redux/services/os";
import { useLazyGetVersionUpdateQuery } from "../../redux/services";

const styles = makeStyles((theme) => ({
  totalbox: {
    padding: "10px 20px",
  },
  head: {},
  totalcontent: {
    paddingTop: "70px",
  },
}));
export const CreateInstanceDrawer = ({ id, navigate }) => {
  const InitialState = {
    instance_name: "",
    instance_description: "",
    provider: "",
    os: "",
    version: "",
    dast: true,
    sast: true,
    performance_test: true,
    ip: "",
    user_name: "",
    ssh_file: false,
    ssh_password: "",
    error: {
      instance_name: "",
      instance_description: "",
      provider: "",
      os: "",
      version: "",
      dast: "",
      sast: "",
      performance_test: "",
      ip: "",
      user_name: "",
      ssh_file: "",
      ssh_password: "",
    },
  };

  // General Hooks
  const classes = styles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [state, setState] = React.useState({ ...InitialState });
  const [versionDataCopy, setVersionDataCopy] = React.useState([]);
  // Redux Hooks for API Integeration
  const [createCreateInstance, { isLoading, isError, isSuccess }] =
    useCreateCreateInstanceMutation();

  const { data: osData, refetch: getOsVersion } = useGetOsVersionQuery({
    start: 0,
    length: 10,
  });
  const [getVersionUpdate] = useLazyGetVersionUpdateQuery();

  React.useEffect(() => {
    (async () => {
      if (state?.os?.value === 1 || state?.os?.value === 2) {
        let AllGroupsData = await getVersionUpdate({
          start: 0,
          length: 50,
          os_master_id: state?.os?.value,
        });
        setVersionDataCopy(AllGroupsData?.data?.data);
      }
    })();
    // eslint-disable-next-line
  }, [state?.os?.value]);

  React.useEffect(() => {
    getOsVersion();
    // eslint-disable-next-line
  }, []);

  const onCreateInstance = async () => {
    if (validate()) {
      const formData = new FormData();
      formData.append(
        "inputParams",
        JSON.stringify({
          name: state?.instance_name,
          host: state?.ip,
          provider: state?.provider,
          os: state?.os,
          version: state?.version,
          username: state?.user_name,
          project_id: Number(id),
          password: state?.ssh_password,
        })
      );
      formData.append("sshKeyFile", state?.ssh_file);
      let form = await createCreateInstance(formData);
      if (form?.data) {
        navigate({
          pathname: `${AppRoutes.projectInstancesParent}${id}`,
          state: {
            name: state?.instance_name,
          },
        });
      }
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar("New instance has been successfully created", {
        variant: "success",
        anchorOrigin: { horizontal: "center", vertical: "top" },
        className: classes.snackbar,
      });
      dispatch(refreshProjectInstanceListing());
      dispatch(closeDrawer());
      setState({ ...InitialState });
    }
    // eslint-disable-next-line
  }, [isSuccess]);

  React.useEffect(() => {
    if (isError) {
      enqueueSnackbar("Oops unable to connect!!!!", {
        variant: "error",
        anchorOrigin: { horizontal: "center", vertical: "top" },
        className: classes.snackbar,
      });
    }
    // eslint-disable-next-line
  }, [isError]);

  const keyIncludes = (val) => {
    const key = [
      "instance_name",
      "instance_description",
      "ip",
      "user_name",
      "performance_test",
      "ssh_password",
      "ssh_file",
    ];
    return key.includes(val);
  };

  const updateState = (key, value, val) => {
    if (keyIncludes(key)) {
      let error = state.error;
      error[key] = "";
      setState({
        ...state,
        [key]: value,
        error,
      });
    }
    if (key === "os") {
      let error = state.error;
      error[key] = "";
      setState({
        ...state,
        [key]: val,
        error,
      });
    }
    if (key === "version") {
      let error = state.error;
      error[key] = "";
      setState({
        ...state,
        [key]: val,
        error,
      });
    }
    if (key === "provider") {
      let error = state.error;
      error[key] = "";
      setState({
        ...state,
        [key]: val,
        error,
      });
    }
  };

  const validate = () => {
    let isValid = true;
    let error = state?.error;

    //Checking email
    if (state?.instance_name.trim()?.length === 0) {
      isValid = false;
      error.instance_name = "This field is mandatory";
    }

    //checking os
    if (state?.os?.length === 0) {
      isValid = false;
      error.os = "This field is mandatory";
    }

    //checking provider
    if (state?.provider?.length === 0) {
      isValid = false;
      error.provider = "This field is mandatory";
    }

    //checking IP
    if (state?.ip?.trim()?.length === 0) {
      isValid = false;
      error.ip = "IP Address is required";
    }

    //checking username
    if (state?.user_name?.length === 0) {
      isValid = false;
      error.user_name = "username is required";
    }

    //checking password
    if (state?.password?.length === 0) {
      isValid = false;
      error.password = "Password is required";
    }

    setState({ ...state, error });
    return isValid;
  };

  return (
    <div>
      <Box>
        {/*instanceHeader*/}
        <div className={classes.head}>
          <DrawerHeader
            title="Create Instance"
            btnName="Save"
            onSave={onCreateInstance}
            isLoading={isLoading}
          />
        </div>

        {/*instanceContent*/}
        <div className={classes.totalcontent}>
          {/*instanceName*/}
          <Box className={classes.totalbox}>
            <InputField
              label="Instance Name"
              placeholder=""
              fullWidth
              value={state.instance_name}
              onChange={(e) => updateState("instance_name", e.target.value)}
              helperText={state.error.instance_name}
              isError={state.error.instance_name.length > 0}
            />
          </Box>

          {/*instance Description*/}
          <Box className={classes.totalbox}>
            <InputField
              label="Instance Description"
              placeholder=""
              fullWidth
              isMulti
              value={state.instance_description}
              helperText={state.error.instance_description}
              isError={state.error.instance_description.length > 0}
              onChange={(e) =>
                updateState("instance_description", e.target.value)
              }
            />
          </Box>

          {/*InstanceDetails*/}
          <Box className={classes.totalbox}>
            <InstanceDetails
              title="Instance Details"
              instanceData={[
                {
                  label: "Provider",
                  placeholder: "",
                  value: state.provider,
                  helperText: state.error.provider,
                  key: "provider",
                  options: [
                    { label: "E2E", value: "E2E" },
                    { label: "AWS", value: "AWS" },
                    { label: "DigitalOcean", value: "DigitalOcean" },
                  ],
                },
                {
                  label: "OS",
                  placeholder: "",
                  value: state.os,
                  helperText: state.error.os,
                  key: "os",
                  options: osData?.os?.map((val) => {
                    return { value: val?.id, label: val?.OsName };
                  }),
                },
                {
                  label: "Version",
                  placeholder: "",
                  value: state.version,
                  helperText: state.error.version,
                  key: "version",
                  options: versionDataCopy.map((val) => {
                    return { value: val?.id, label: val?.VersionCode };
                  }),
                },
              ]}
              handleChange={updateState}
            />
          </Box>

          {/*ReportConfiguraion*/}
          <Box className={classes.totalbox}>
            <Report
              title="Report Configurationsss"
              data={[
                { title: "DAST", value: state.dast, key: "dast" },
                { title: "SAST", value: state.sast, key: "sast" },
                {
                  title: "Performance Testing",
                  value: state.performance_test,
                  key: "performance_test",
                },
              ]}
              handleChange={updateState}
            />
          </Box>

          {/*CredentialsDetails*/}
          <Box className={classes.totalbox}>
            <CredentialsDetails
              title="Credentials"
              radioprimary="Paste SSH File Content"
              radiosecondary="paste SSH Password"
              addTestButton="Test Connection"
              addTestButtonType="outlined"
              dataCredentials={[
                {
                  label: "IP Address",
                  placeholder: "",
                  value: state.ip,
                  helperText: state.error.ip,
                  key: "ip",
                  isError: state.error.ip.length > 0,
                },
                {
                  label: "UserName",
                  placeholder: "",
                  value: state.user_name,
                  helperText: state.error.user_name,
                  key: "user_name",
                  isError: state.error.user_name.length > 0,
                },
              ]}
              ssh_file={state.ssh_file}
              sshPassword={state.ssh_password}
              helperTextSsh={state?.error?.ssh_password}
              isErrorSsh={state?.error?.ssh_password?.length > 0}
              handleChangeSsh={(e) =>
                updateState("ssh_password", e.target.value)
              }
              handleChange={updateState}
            />
          </Box>
        </div>
      </Box>
    </div>
  );
};
