import React from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { InputField } from "../inputField";
import { BoilerPlateDetails } from "../boilerPlateDetails";
import { DrawerHeader } from "../drawerHeader";
import { ApplicationDetails } from "../applicationDetails";
import { useDispatch } from "react-redux/es/exports";
import { closeDrawer } from "../../redux/slices/drawer";
import { useSnackbar } from "notistack";
import { RepoConfigurations } from "../repoConfigurations";
import { RepositaryData } from "../repositaryData";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import {
  useLazyGetAllGroupsQuery,
  useLazyGetAllGroupsRepoQuery,
  useLazyGetAllGroupsRepoBranchQuery,
  useCreateApplicationMutation,
  useGetPlatformQuery,
  useLazyGetBoilerplateQuery,
  useBoilerplateUploadMutation,
  useLazyGetAllGitUsersQuery,
} from "../.././redux/services";
import { closeBackdrop, openBackdrop } from "../../redux/slices/backdrop";

const styles = makeStyles((theme) => ({
  totalbox: { padding: "10px 20px" },
  head: {
    marginLeft: "2px",
  },
  totalcontent: { paddingTop: "90px" },
  title: {
    fontFamily: "crayond_regular",
    fontSize: "16px",
    fontWeight: "600",
  },
  gitUser: {
    display: "flex",
    alignItems: "center",
    marginLeft: "20px",
  },
}));

export const ApplicationDrawer = (props) => {
  //General Hooks
  const classes = styles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const InitialState = {
    project_id: "",
    server_id: "",
    git_data_id: "",
    platform: "", // nodeJs, ReactJs
    application_name: "",
    application_description: "",
    app_run_command: "",
    app_build_command: "",
    build_dir: "",
    app_port: "",
    custom_domain: "",
    bdd_features: "",
    git_group: "",
    git_repo: "",
    git_repo_id: "",
    git_path: "",
    git_branch: "",
    git_repo_url: "",
    git_repo_ssh_url: "",
    git_provider: "",
    git_details: {},
    error: {
      application_name: "",
      application_description: "",
      app_run_command: "",
      app_build_command: "",
      build_dir: "",
      app_port: "",
      platform: "",
      custom_domain: "",
      bdd_features: "",
      git_group: "",
      git_repo: "",
      git_branch: "",
      git_repo_url: "",
      git_repo_ssh_url: "",
      git_provider: "",
    },
  };
  //component state
  const [state, setState] = React.useState({ ...InitialState });
  const [stepper, setStepper] = React.useState({ title: "Next", done: false });

  const [groupsSelect, setGroupsSelect] = React.useState([]);
  const [groupsRepoSelect, setGroupsRepoSelect] = React.useState([]);
  const [groupsRepoBranchSelect, setGroupsRepoBranchSelect] = React.useState(
    []
  );
  const [BoilderPlateData, setBoilderPlateData] = React.useState({});
  const [boilderPlateRepoName, setBoilderPlateRepoName] = React.useState("");
  const [boilderSelect, setBoilderSelect] = React.useState("yes");
  const [platformDropValue, setPlatformDropValue] = React.useState(null);

  //Redux  Hooks for API Integration
  const [getAllGroups, ...AllGroupsParams] = useLazyGetAllGroupsQuery();
  const [getAllGitUsers, ...AllUsersParams] = useLazyGetAllGitUsersQuery();
  const [getAllGroupsRepo, ...AllGroupsRepoParams] =
    useLazyGetAllGroupsRepoQuery();
  const [getAllGroupsRepoBranch, ...AllGroupsRepoBranchParams] =
    useLazyGetAllGroupsRepoBranchQuery();
  const [createApplication, ...AllcreateApplicationParams] =
    useCreateApplicationMutation();
  const [boilerplateUpload] = useBoilerplateUploadMutation();
  const [getBoilerplate, ...getBoilerplateParams] =
    useLazyGetBoilerplateQuery();
  const { data: PlatformData, isLoading: platformLoading } =
    useGetPlatformQuery();



  React.useEffect(() => {
    (async () => {
      if (
        state?.git_details?.access_token &&
        !state?.git_group?.id &&
        !state?.git_repo?.id
      ) {
        let AllGroupsData = await getAllGroups({
          access_token: state?.git_details?.access_token,
        });

        const obj = {
          name: state?.git_details?.gitUsername,
          id: state?.git_details?.gitUserId,
          gituser: true,
        };
        const arr =
          Array.isArray(AllGroupsData?.data) && AllGroupsData?.data.length > 0
            ? JSON.parse(JSON.stringify(AllGroupsData?.data))
            : [];

        arr.push(obj);

        setGroupsSelect(arr);
      }
      if (
        state?.git_group?.id &&
        state?.git_details?.access_token &&
        !state?.git_repo?.id
      ) {
        // let dataGroupsRepo = await getAllGroupsRepo({ access_token: state?.git_details?.access_token, id: groupsSelect?.filter((i) => { return state?.git_group === i?.name })[0]?.id })
        if (state?.git_group?.gituser) {
          let allUser = await getAllGitUsers({
            access_token: state?.git_details?.access_token,
            id: state?.git_details?.gitUserId,
            gitUsername: state?.git_details?.gitUsername,
          });
          setGroupsRepoSelect(allUser?.data);
        } else {
          let dataGroupsRepo = await getAllGroupsRepo({
            access_token: state?.git_details?.access_token,
            // gitUserId: state?.git_details?.gitUserId,
            // gitUsername: state?.git_details?.gitUsername,
            id: state?.git_group?.id,
          });
          setGroupsRepoSelect(dataGroupsRepo?.data);
        }
      }
      if (state?.git_repo?.id && state?.git_group?.id && !state?.git_branch) {
        // let dataGroupsRepoBranch = await getAllGroupsRepoBranch({ access_token: state?.git_details?.access_token, id: groupsRepoSelect?.filter((i) => { return state?.git_repo === i?.name })[0]?.id })
        let dataGroupsRepoBranch = await getAllGroupsRepoBranch({
          access_token: state?.git_details?.access_token,
          id: state?.git_repo?.id,
        });

        setGroupsRepoBranchSelect(dataGroupsRepoBranch?.data);
      }
    })();
    // eslint-disable-next-line
  }, [
    state?.git_details?.access_token,
    state?.git_details?.gitUsername,
    state?.git_details?.gitUserId,
    state?.git_group,
    state?.git_repo,
  ]);

  const boilerplateUploadFunc = async (payload) => {
    if (
      BoilderPlateData?.data?.id &&
      state?.git_data_id &&
      boilderPlateRepoName &&
      stepper.title === "Next" &&
      boilderSelect === "yes"
    ) {
      let datapayloadForApplication = await boilerplateUpload({
        payload: {
          server_id: parseInt(state?.server_id),
          boilerplate_id: BoilderPlateData?.data?.id,
          git_data_id: state?.git_data_id,
          repo_name: boilderPlateRepoName,
        },
      });

      if (datapayloadForApplication?.data?.type === "success") {
        enqueueSnackbar(
          "Please wait for a while. Boilerplate is being uploaded to the user git account",
          {
            variant: "success",
            anchorOrigin: { horizontal: "center", vertical: "top" },
            className: classes.snackbar,
          }
        );
        setStepper({ ...stepper, title: "Save", done: true });
      }
      if (datapayloadForApplication?.data?.type !== "success") {
        enqueueSnackbar("Error in uploading boilerPlate", {
          variant: "error",
          anchorOrigin: { horizontal: "center", vertical: "top" },
          className: classes.snackbar,
        });
      }
    } else {
      enqueueSnackbar("please fill the boilerPlate details", {
        variant: "error",
        anchorOrigin: { horizontal: "center", vertical: "top" },
        className: classes.snackbar,
      });
    }
  };

  const deployAPI = async (payload) => {
    let datapayloadForApplication = await createApplication({
      payload: payload,
    });

    if (datapayloadForApplication?.data?.type === "success") {
      // Success Message
      enqueueSnackbar("New Application has been successfully created", {
        variant: "success",
        anchorOrigin: { horizontal: "center", vertical: "top" },
        className: classes.snackbar,
      });
      dispatch(closeDrawer());
      setState({ ...InitialState });
    } else {
      enqueueSnackbar("something went wrong!", {
        variant: "error",
        anchorOrigin: { horizontal: "center", vertical: "top" },
        className: classes.snackbar,
      });
      dispatch(closeDrawer());
      setState({ ...InitialState });
    }
  };

  const applicationChange = () => {
    if (validate(stepper)) {
      setStepper({ ...stepper, title: "Save", done: true });

      if (stepper?.done) {
        setStepper({ ...stepper, title: "Next", done: true });

        // prepare submit JSON here :

        let payloadForApplication = {
          project_id: parseInt(state?.project_id),
          server_id: parseInt(state?.server_id),
          git_data_id: state?.git_data_id,
          applications: [
            {
              app_port: parseInt(state?.app_port),
              app_run_command: state?.app_run_command,
              app_build_command: state?.app_build_command,
              build_dir: state?.build_dir,
              custom_domain: state?.custom_domain,
              bdd_features: state?.bdd_features,
              git_branch: state?.git_branch?.value,
              git_group: state?.git_group?.value,
              git_path: state?.git_path,
              git_repo: state?.git_repo?.value,
              git_repo_id: state?.git_repo_id,
              git_repo_ssh_url: state?.git_repo_ssh_url,
              git_repo_url: state?.git_repo_url,
              name: state?.application_name,
              need_app_health_alert: false,
              need_testing: true,
              platform: state?.platform,
            },
          ],
        };

        // submit API Call Here :

        deployAPI(payloadForApplication);
      }
    }
  };

  const keyIncludes = (val) => {
    const key = [
      "application_name",
      "application_description",
      "app_run_command",
      "app_build_command",
      "app_port",
      "custom_domain",
      "platform",
      "build_dir",
      "bdd_features",
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

    if (key === "git_group") {
      let error = state.error;
      error[key] = "";
      setState({
        ...state,
        [key]: val,
        git_repo_id: "",
        git_repo: "",
        git_path: "",
        git_repo_url: "",
        git_repo_ssh_url: "",
        git_branch: "",
        error,
      });
    }

    if (key === "git_repo") {
      let filterRepoValue = groupsRepoSelect?.filter((i) => {
        return i?.name === val?.value;
      });
      let error = state.error;
      error[key] = "";
      setState({
        ...state,
        application_name: filterRepoValue[0]?.name,
        application_description: filterRepoValue[0]?.description,
        git_repo_id: filterRepoValue[0]?.id,
        git_repo: val,
        git_path: filterRepoValue[0]?.path,
        git_repo_url: filterRepoValue[0]?.http_url_to_repo,
        git_repo_ssh_url: filterRepoValue[0]?.ssh_url_to_repo,
        git_branch: "",
        error,
      });
    }

    if (key === "git_provider") {
      let error = state.error;
      error[key] = "";
      setState({
        ...state,
        [key]: value,
        server_id: props?.instance?.id,
        project_id: props?.project_id,
        git_group: "",
        git_repo_id: "",
        git_repo: "",
        git_path: "",
        git_repo_url: "",
        git_repo_ssh_url: "",
        git_branch: "",
        error,
      });
    }

    if (key === "git_details") {
      let error = state.error;
      error[key] = "";
      setState({
        ...state,
        [key]: value,
        git_data_id: value?.gitDataId,
        git_group: "",
        git_repo_id: "",
        git_repo: "",
        git_path: "",
        git_repo_url: "",
        git_repo_ssh_url: "",
        git_branch: "",
        error,
      });
    }
    if (key === "git_branch") {
      let error = state.error;
      error[key] = "";
      setState({
        ...state,
        [key]: val,
        error,
      });
    }
  };

  const validate = (val) => {
    let isValid = true;
    let error = state?.error;

    // checking Git-Repo
    if (state?.git_provider?.length === 0 && val?.title === "Next") {
      isValid = false;
      error.git_provider = "Please select your git provider.";
    }
    if (state?.git_group?.length === 0 && val?.title === "Save") {
      isValid = false;
      error.git_group = "Please select your git group.";
    }
    if (state?.git_repo?.length === 0 && val?.title === "Save") {
      isValid = false;
      error.git_repo = "Please select your git repo.";
    }
    if (state?.git_branch?.length === 0 && val?.title === "Save") {
      isValid = false;
      error.git_branch = "Please select your git branch.";
    }
    if (state?.application_name?.length === 0 && val?.title === "Save") {
      isValid = false;
      error.application_name = "Please Enter your Application Name.";
    }
    // if (state?.application_description?.length === 0 && (val?.title === "Save")) {
    //   isValid = false;
    //   error.application_description = "Please select your Application Description.";
    // }
    if (state?.app_run_command?.length === 0 && val?.title === "Save") {
      isValid = false;
      error.app_run_command = "Please Enter your Run Command.";
    }
    // if (state?.app_build_command?.length === 0 && (val?.title === "Save")) {
    //   isValid = false;
    //   error.app_build_command = "Please Enter your Build Command.";
    // }
    // if (state?.build_dir?.length === 0 && (val?.title === "Save")) {
    //   isValid = false;
    //   error.build_dir = "Please Enter your Build directory Command.";
    // }
    if (state?.app_port?.length === 0 && val?.title === "Save") {
      isValid = false;
      error.app_port = "Please Enter your Port.";
    }
    if (state?.custom_domain?.length === 0 && val?.title === "Save") {
      isValid = false;
      error.custom_domain = "Please Enter your custom Domain.";
    }
    // if (state?.bdd_features?.length === 0 && (val?.title === "Save")) {
    //   isValid = false;
    //   error.bdd_features = "Please Enter your BDD features.";
    // }
    if (state?.platform?.length === 0 && val?.title === "Save") {
      isValid = false;
      error.platform = "Please select your Platform.";
    }

    setState({ ...state, error });
    return isValid;
  };

  const onBackBtnClicked = () => {
    setState({ ...InitialState });
    setStepper({ ...stepper, title: "Next", done: false });
  };

  const platformHandleChange = async (event, val) => {
    setPlatformDropValue(val);

    let boilerPlateRes = await getBoilerplate({ platform_id: val?.value });

    setBoilderPlateData(boilerPlateRes);
  };
  const boilerPlateChange = async (key, val) => {
    setBoilderPlateRepoName(val);
  };

  const handleBoilerChange = (val) => {
    setBoilderSelect(val);
  };

  const refreshIconBtn = async () => {
    dispatch(openBackdrop("Collecting Repo Data..."));
    if (state?.git_group?.gituser) {
      await getAllGitUsers({
        access_token: state?.git_details?.access_token,
        id: state?.git_details?.gitUserId,
        gitUsername: state?.git_details?.gitUsername,
      });
    } else {
      await getAllGroupsRepo({
        access_token: state?.git_details?.access_token,
        id: state?.git_group?.id,
      });
    }
    getAllGroups({
      access_token: state?.git_details?.access_token,
    });
    await getAllGroups({
      access_token: state?.git_details?.access_token,
    });
    setState({ ...state, git_repo: "", git_branch: "" });
    dispatch(closeBackdrop());
  };
  // const initialStateData = async () => {
  //   await setState({ ...InitialState });
  // };
  // React.useEffect(() => {
  //  if(props?.listForm){
  //   initialStateData();
  //  }

  // }, []);
  return (
    <div>
      {/*Header*/}
      <div className={classes.head}>
        <DrawerHeader
          title="Create Application"
          isLoading={AllcreateApplicationParams[0]?.isLoading}
          btnName={stepper?.title}
          onBackBtnClicked={onBackBtnClicked}
          showBackBtn={!stepper?.done}
          onSave={
            stepper?.title === "Next" && boilderSelect === "yes"
              ? boilerplateUploadFunc
              : applicationChange
          }
        />
      </div>

      {/*ApplicationContent*/}

      {/*Stepper-A*/}
      {!stepper?.done && (
        <div className={classes.totalcontent}>
          <Box className={classes.totalbox}>
            <RepoConfigurations
              helperText={state?.error?.git_provider}
              value={state?.git_provider}
              git_details={state?.git_details}
              isError={state.error.git_provider.length > 0}
              handleUpdate={updateState}
            />

            {state?.git_details?.gitUsername && (
              <div className={classes.gitUser}>
                <CheckCircleOutlineOutlinedIcon style={{ color: "#0acf83" }} />
                <Typography
                  style={{ color: "#0acf83", marginLeft: "4px" }}
                  variant="subtitle2"
                >{`Git account connected - ${state?.git_details?.gitUsername}`}</Typography>
              </div>
            )}

            {state?.error?.git_provider?.length > 0 && (
              <div className={classes.gitUser}>
                <ErrorOutlineOutlinedIcon style={{ color: "#f44336" }} />
                <Typography
                  style={{ color: "#f44336", marginLeft: "4px" }}
                  variant="subtitle2"
                >
                  {state.error.git_provider}
                </Typography>
              </div>
            )}
          </Box>

          <Box className={classes.totalbox}>
            {/* Commenting for now */}
            <BoilerPlateDetails
              platform_label={"platform"}
              platform_placeholder={"select platform"}
              platform_helperText=""
              platform_isError={false}
              platform_value={platformDropValue}
              platformHandleChange={(key, val) =>
                platformHandleChange(key, val)
              }
              platform_loading={platformLoading}
              platform_options={PlatformData?.data?.map((i) => {
                return { label: i?.platform, value: i?.id };
              })}
              // boilerplate
              boilerplate_label={"boilerplate"}
              boilerplate_placeholder={"select boilerplate"}
              boilerplate_helperText=""
              boilerplate_isError={false}
              boilerplate_value={boilderPlateRepoName}
              boilerplateHandleChange={(key, val) =>
                boilerPlateChange(key, val)
              }
              boilerplate_loading={false}
              //  boilerplate_options = []
              boilerSelectChange={(val) => {
                handleBoilerChange(val);
              }}
              boilerReport={[
                { report: "Configuration : 1" },
                { report: "Configuration : 2" },
                { report: "Configuration : 3" },
              ]}
            />
          </Box>
        </div>
      )}

      {/*Stepper-B*/}
      {stepper?.done && (
        <>
          {/* <Box sx={{ position: "relative" }}>
            <IconButton sx={{ position: "absolute", zIndex: "99", top: "15px" }} >
              <KeyboardBackspaceRoundedIcon />
            </IconButton>
          </Box> */}
          <div className={classes.totalcontent}>
            {/*Repository data Configuraion*/}
            {Object.keys(state?.git_details)?.length > 0 && (
              <Box className={classes.totalbox}>
                <RepositaryData
                  title={"Git Details"}
                  refreshIconBtn={refreshIconBtn}
                  gitlabData={[
                    {
                      loading: AllGroupsParams[0].isLoading,
                      label: "Group",
                      key: "git_group",
                      value: state?.git_group ?? "",
                      helperText: state?.error?.git_group,
                      placeholder: "Enter Here",
                      isError: state?.error?.git_group?.length > 0,
                      options: groupsSelect?.map((i) => {
                        return {
                          value: i?.name,
                          label: i?.name,
                          id: i?.id,
                          gituser: i?.gituser ?? false,
                          // full_name: i.full_name,
                          // full_path: i.full_path,
                        };
                      }),
                    },
                    {
                      loading: AllGroupsRepoParams[0].isLoading,
                      label: "Repo",
                      key: "git_repo",
                      value: state?.git_repo,
                      helperText: state?.error?.git_repo,
                      placeholder: "Enter Here",
                      isError: state?.error?.git_repo?.length > 0,
                      options: groupsRepoSelect?.map((i) => {
                        return { value: i.name, label: i.name, id: i.id };
                      }),
                    },
                    {
                      loading: AllGroupsRepoBranchParams[0].isLoading,
                      label: "Branch",
                      key: "git_branch",
                      value: state?.git_branch,
                      helperText: state?.error?.git_branch,
                      placeholder: "Enter Here",
                      isError: state?.error?.git_branch?.length > 0,
                      options: groupsRepoBranchSelect?.map((i) => {
                        return { value: i.name, label: i.name, id: i.id };
                      }),
                    },
                  ]}
                  handleChange={updateState}
                />
              </Box>
            )}

            {/*application Name*/}
            <Box className={classes.totalbox}>
              <InputField
                label="Application Name"
                placeholder="Enter here"
                fullWidth
                value={state.application_name}
                onChange={(e) =>
                  updateState("application_name", e.target.value)
                }
                helperText={state?.error?.application_name}
                isError={state?.error?.application_name?.length > 0}
              />
            </Box>

            {/*application  Description*/}
            <Box className={classes.totalbox}>
              <InputField
                label="Application Description"
                placeholder="Type here"
                fullWidth
                isMulti
                value={state?.application_description}
                helperText={state?.error?.application_description}
                isError={state?.error?.application_description?.length > 0}
                onChange={(e) =>
                  updateState("application_description", e.target.value)
                }
              />
            </Box>

            {/*applications Details*/}
            <Box className={classes.totalbox}>
              <ApplicationDetails
                dataAlert={[
                  {
                    label: "Run Command",
                    key: "app_run_command",
                    value: state?.app_run_command,
                    helperText: state?.error?.app_run_command,
                    placeholder: "Enter Run command",
                    isError: state?.error?.app_run_command?.length > 0,
                  },
                  {
                    label: "Build Command",
                    key: "app_build_command",
                    value: state?.app_build_command,
                    helperText: state?.error?.app_build_command,
                    placeholder: "Enter Build Command",
                    isError: state?.error?.app_build_command?.length > 0,
                  },
                  {
                    label: "Build Directory",
                    key: "build_dir",
                    value: state?.build_dir,
                    helperText: state?.error?.build_dir,
                    placeholder: "Enter Build Directory",
                    isError: state?.error?.build_dir?.length > 0,
                  },
                  {
                    label: "Port",
                    key: "app_port",
                    value: state?.app_port,
                    helperText: state?.error?.app_port,
                    placeholder: "Enter Port",
                    type: "number",
                    isError: state?.error?.app_port?.length > 0,
                  },
                  {
                    label: "Custom Domain",
                    key: "custom_domain",
                    value: state?.custom_domain,
                    helperText: state?.error?.custom_domain,
                    placeholder: "Enter Custom Domain",
                    isError: state?.error?.custom_domain?.length > 0,
                  },
                  {
                    label: "Platform",
                    key: "platform",
                    value: state?.platform,
                    helperText: state?.error?.platform,
                    placeholder: "Enter Platform",
                    isError: state?.error?.platform?.length > 0,
                    selectOptions: PlatformData?.data?.map((i) => {
                      return { label: i?.platform, value: i?.platform };
                    }),
                    select: "select",
                  },
                  {
                    label: "BDD Features",
                    key: "bdd_features",
                    value: state?.bdd_features,
                    helperText: state?.error?.bdd_features,
                    placeholder: "Enter BDD Features",
                    isError: state?.error?.bdd_features?.length > 0,
                    isMulti: true,
                  },
                ]}
                handleChange={updateState}
              />
            </Box>
          </div>
        </>
      )}
    </div>
  );
};
