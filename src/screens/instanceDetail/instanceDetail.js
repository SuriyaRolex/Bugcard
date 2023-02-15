import React from "react";
import { makeStyles } from "@mui/styles";
import {
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import {
  HealthList,
  ProgressBar,
  UpDownCalculation,
  ApplicationDrawer,
} from "../../components";
import { InstanceApplication } from "./instanceApplicationNotFound";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { TopNavBar } from "../../components";
import { useDispatch } from "react-redux";
import { openDrawer } from "../../redux/slices/drawer";
import { useParams } from "react-router-dom";
import {
  useLazyGetAllApplicationsQuery,
  useGetCreateInstanceQuery,
  useCurrentUsageQuery,
} from "../../redux/services";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    backgroundImage: "url('/images/jpg/signInSignUpBg.png')",
    height: "auto",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
  instancebg: {
    textAlign: "center",
    backgroundImage: "url('/images/instance.svg')",
    height: "215px",
    backgroundSize: "cover",
  },
  progressbar: {
    marginTop: "-100px",
  },
  container: {
    width: "100%",
    maxWidth: "75%",
  },
  aicon: {
    fontSize: "17px",
    margin: "-5px 5px",
  },
  issues: {
    padding: "0px 6px",
  },
}));

export const InstanceDetail = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  // Component States
  let { project_id, id } = useParams();

  const [getAllApplications, ...AllGetAllApplicationsParams] =
    useLazyGetAllApplicationsQuery();
  const { isLoading: isProjectDetailLoading, data: projectDetail } =
    useGetCreateInstanceQuery({ project_id: project_id, server_id: id });
  const { isLoading: CurrentUsageLoading, data: CurrentUsageData } =
    useCurrentUsageQuery({ project_id: project_id, server_id: id });

  // eslint-disable-next-line
  const [healthCheck, setHealthCheck] = React.useState(false);
  const [tableData, setTableData] = React.useState([]);
  const [UpDown, setUpDown] = React.useState({ up: 0, down: 0 });
  const [loadingData, setLoadingData] = React.useState(false);
  const onAddApplicationButtonClicked = () => {
    dispatch(
      openDrawer({
        component: (
          <ApplicationDrawer instance={{ id: id }} project_id={project_id} />
        ),
        title: "Create Application",
        positiveActName: "save",
      })
    );
  };

  React.useEffect(() => {
    (async () => {
      setLoadingData(true);
      let dataGetAllApplications = await getAllApplications({
        project_id: project_id,
        server_id: id,
      });
      // console.log(dataGetAllApplications,"dataGetAllApplications dataGetAllApplications dataGetAllApplications dataGetAllApplications")
      setTableData(
        dataGetAllApplications?.data?.data?.map((i) => ({
          secondarytext: i?.name,
          infotext: i?.is_health_ok ? "No issue" : "Outage",
          btntext: "Monitor",
          route: `/application/${i?.project_id}/${i?.server_id}/${i?.id}?tab=1`,
        }))
      );
      let up = dataGetAllApplications?.data?.data.map((i) => {
        return i?.is_health_ok;
      }).length;
      setUpDown({
        up: up,
        down: dataGetAllApplications?.data?.data?.length - up,
      });
      setLoadingData(false);
    })();
    // eslint-disable-next-line
  }, [project_id, id, AllGetAllApplicationsParams[0]?.isLoading]);

  // for refer :
  // [
  //     { secondarytext: " Colabo Front End", infotext: "Up and running", btntext: "Monitor", route: "/application/:project_id/:instance_id/:application_id" },
  //     { secondarytext: " Colabo Back End", infotext: "Maintenance", btntext: "Monitor" },
  //     { secondarytext: " Colabo Server", infotext: "Notice", btntext: "Monitor" },
  //     { secondarytext: " Colabo Server", infotext: "Incident", btntext: "Monitor" },
  //     { secondarytext: " Colabo Server", infotext: "Outage", btntext: "Monitor", btnCLick: btnCLick }
  // ]

  return (
    <>
      <TopNavBar
        showActionBtn={true}
        actionBtnName={"+ Add Application"}
        actionBtnOnClick={onAddApplicationButtonClicked}
        showTopLeftNav={true}
        primaryText={
          isProjectDetailLoading ? "Loading..." : projectDetail?.data?.name
        }
        secondaryText={"Instance"}
      />
      <div className={classes.root}>
        {/* //Health-BG */}
        <Box className={classes.instancebg} sx={{ padding: "50px" }}></Box>

        {/* //ProgressBar */}
        <Box className={classes.progressbar}>
          <Container
            className={classes.container}
            sx={{ width: "100%", maxWidth: "95%" }}
          >
            <Box sx={{ display: "flex" }}>
              <Grid
                container
                spacing={{ xs: 2, md: 2 }}
                columns={{ xs: 1, sm: 8, md: 12 }}
                sx={{ padding: "20px" }}
              >
                <Grid item xs={2} sm={4} md={3}>
                  <ProgressBar
                    title={CurrentUsageLoading ? "loading..." : "CPU"}
                    progress={CurrentUsageData?.cpu_usage}
                  />
                </Grid>
                <Grid item xs={2} sm={4} md={3}>
                  <ProgressBar
                    title={CurrentUsageLoading ? "loading..." : "Disk"}
                    progress={CurrentUsageData?.disk_usage}
                  />
                </Grid>
                <Grid item xs={2} sm={4} md={3}>
                  <ProgressBar
                    title={CurrentUsageLoading ? "loading..." : "Memory"}
                    progress={CurrentUsageData?.mem_usage}
                  />
                </Grid>
                <Grid item xs={2} sm={4} md={3}>
                  <UpDownCalculation
                    title={CurrentUsageLoading ? "loading..." : "Application"}
                    calculation={0}
                    numberDown={UpDown?.down}
                    numberUp={UpDown?.up}
                    numUp="up"
                    numDown="Down"
                  />
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>

        {/* //addInstance */}
        <Box sx={{ padding: "35px 35px" }}>
          {AllGetAllApplicationsParams[0].isLoading ? (
            <CircularProgress color="inherit" />
          ) : (
            <>
              {AllGetAllApplicationsParams[0]?.data?.totalRecords ? (
                <Box sx={{ paddingTop: "10px" }}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography
                      variant="subtitle1"
                      gutterBottom
                      component="div"
                      sx={{ fontFamily: "crayond_semibold" }}
                    >
                      Applicatons
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      gutterBottom
                      component="div"
                      sx={{ fontFamily: "crayond_regular", color: "#848484" }}
                    >
                      <span className={classes.issues}>
                        <CheckCircleIcon
                          sx={{ color: "#00B17E" }}
                          className={classes.aicon}
                        />
                        No issue
                      </span>
                      <span className={classes.issues}>
                        <HandymanOutlinedIcon
                          color="primary"
                          className={classes.aicon}
                        />
                        Incident
                      </span>
                      <span className={classes.issues}>
                        <AnnouncementIcon
                          sx={{ color: "#0063E7" }}
                          className={classes.aicon}
                        />
                        Notice
                      </span>
                      <span className={classes.issues}>
                        <ReportProblemIcon
                          sx={{ color: "#F9BB40" }}
                          className={classes.aicon}
                        />
                        Maintenance
                      </span>
                      <span className={classes.issues}>
                        <RemoveCircleIcon
                          sx={{ color: "#FF4141" }}
                          className={classes.aicon}
                        />
                        Outage
                      </span>
                    </Typography>
                  </Box>
                  <HealthList
                    loading={
                      AllGetAllApplicationsParams[0]?.isLoading ?? loadingData
                    }
                    healthData={
                      AllGetAllApplicationsParams[0]?.isLoading ? [] : tableData
                    }
                  />
                </Box>
              ) : (
                <Box sx={{ paddingTop: "15px" }}>
                  {" "}
                  <Typography
                    variant="h6"
                    sx={{ textAlign: "start", padding: "0px 20px" }}
                  >
                    Applications
                  </Typography>
                  <InstanceApplication
                    onAddApplicationButtonClicked={
                      onAddApplicationButtonClicked
                    }
                  />
                </Box>
              )}
            </>
          )}
        </Box>
      </div>
    </>
  );
};
