import React from "react";
import { makeStyles } from "@mui/styles";
import { TopNavBar } from "../../components";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import moment from 'moment';
import { Typography, Paper, CircularProgress } from "@mui/material";
import {
  useLazyAccessLogQuery,
  useLazyOutputLogQuery,
  useLazyErrorLogQuery,
  useLazyAccessDownloadLogQuery,
  useLazyErrorDownloadLogQuery,
  useLazyOutputDownloadLogQuery,
} from "../../redux/services";
import { closeBackdrop, openBackdrop } from "../../redux/slices/backdrop";
import FileSaver from "file-saver";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "70px",
    backgroundColor: "#f9f9f9",
  },
  ParentDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "90vh",
  },
  paperErr: {
    width: "90%",
    backgroundColor: "#ffffff",
    height: "90vh",
    overflow: "auto",
  },
  errLoading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "90%",
  },
  notAvailable: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "90%",
  },
  applicationSx: {
    fontSize: "16px",
    fontweight: "500",
    color: "#000",
    paddingTop: "12px",
    paddingLeft: "32px",
    paddingBottom: "12px",
  },
}));

export const ErrorLog = () => {
  const classes = useStyles();
  const location = useLocation();

  const dispatch = useDispatch();

  let { log_type, project_id, instance_id, application_id } = useParams();

  const [logData, setLogData] = React.useState("");
  const [isLoading, setisLoading] = React.useState(true);
  const [isError, setisError] = React.useState(false);
  // const [notFound, setNotFound] = React.useState(false);

  const [AccessLog, ...AccessLogParams] = useLazyAccessLogQuery();

  const [AccessDownloadLog, ...AccessDownloadLogParams] =
    useLazyAccessDownloadLogQuery();

  const [ErrorLog, ...ErrorLogParams] = useLazyErrorLogQuery();

  const [ErrorDownloadLog, ...ErrorDownloadLogParams] =
    useLazyErrorDownloadLogQuery();

  const [OutputLog, , ...OutputLogParams] = useLazyOutputLogQuery();

  const [OutputDownloadLog, ...OutputDownloadLogParams] =
    useLazyOutputDownloadLogQuery();

  const giveMeTopNavbarPrimaryText = () => {
    if (log_type === "accesslog") {
      return "Access Log";
    }

    if (log_type === "errorlog") {
      return "Error Log";
    }

    if (log_type === "outputlog") {
      return "Output Log";
    }
  };

  const onRefresh = async () => {
    if (log_type === "accesslog") {
      dispatch(openBackdrop("Collecting Data..."));

      let dataAccessLog = await AccessLog({
        application_id: application_id,
      });

      if (
        Array.isArray(dataAccessLog?.data?.access_log_data) &&
        dataAccessLog?.data?.access_log_data?.length > 0
      ) {
        setLogData(dataAccessLog?.data?.access_log_data);
      } else {
        setLogData([]);
      }

      setisError(AccessLogParams[0]?.isError);
      setisLoading(AccessLogParams[0]?.isLoading);
      dispatch(closeBackdrop());
    } else if (log_type === "errorlog") {
      dispatch(openBackdrop("Collecting Data..."));

      let dataErrorLog = await ErrorLog({ application_id: application_id });

      if (
        Array.isArray(dataErrorLog?.data?.error_log_data) &&
        dataErrorLog?.data?.error_log_data?.length > 0
      ) {
        setLogData(dataErrorLog?.data?.error_log_data);
      } else {
        setLogData([]);
      }

      setisError(ErrorLogParams[0]?.isError);
      setisLoading(ErrorLogParams[0]?.isLoading);
      dispatch(closeBackdrop());
    } else {
      dispatch(openBackdrop("Collecting Data..."));

      let dataOutputLog = await OutputLog({ application_id: application_id });

      if (
        Array.isArray(dataOutputLog?.data?.output_log_data) &&
        dataOutputLog?.data?.output_log_data?.length > 0
      ) {
        setLogData(dataOutputLog?.data?.output_log_data);
      } else {
        setLogData([]);
      }

      setisError(OutputLogParams[0]?.isError);
      setisLoading(OutputLogParams[0]?.isLoading);
      dispatch(closeBackdrop());
    }
  };

  const writeDataToFile = (apiDataArray) => {
    let textFile = "";

    // loop through the API data array
    apiDataArray.forEach((data) => {
      textFile += data + "\n";
    });

    return textFile;
  };

  const onDownloadFunc = async () => {
    if (log_type === "accesslog") {
      let dataDownloadLog = await AccessDownloadLog({
        application_id: application_id,
      });

      if (
        Array.isArray(dataDownloadLog?.data?.access_log_data) &&
        dataDownloadLog?.data?.access_log_data?.length > 0
      ) {
        const textFile = writeDataToFile(
          dataDownloadLog?.data?.access_log_data
        );

        const blob = new Blob([textFile], { type: "text/plain;charset=utf-8" });

        // save the text file using the FileSaver library
        FileSaver.saveAs(blob, "Automately (Access Log) - " + (moment().format('DD - MM - YYYY')) + ".log");
      } else {
        setLogData([]);
      }
    } else if (log_type === "errorlog") {
      let dataDownloadLog = await ErrorDownloadLog({
        application_id: application_id,
      });

      if (
        Array.isArray(dataDownloadLog?.data?.error_log_data) &&
        dataDownloadLog?.data?.error_log_data?.length > 0
      ) {
        const textFile = writeDataToFile(logData);

        const blob = new Blob([textFile], { type: "text/plain;charset=utf-8" });

        // save the text file using the FileSaver library
        FileSaver.saveAs(blob, "Automately (Error Log) - " + (moment().format('DD - MM - YYYY')) + ".log");
      } else {
        setLogData([]);
      }
    } else {
      let dataDownloadLog = await OutputDownloadLog({
        application_id: application_id,
      });

      if (
        Array.isArray(dataDownloadLog?.data?.output_log_data) &&
        dataDownloadLog?.data?.output_log_data?.length > 0
      ) {
        const textFile = writeDataToFile(logData);

        const blob = new Blob([textFile], { type: "text/plain;charset=utf-8" });

        // save the text file using the FileSaver library
        FileSaver.saveAs(blob, "Automately (Output Log) - " + (moment().format('DD - MM - YYYY')) + ".log");
      } else {
        setLogData([]);
      }
    }
  };

  const getLogData = async () => {
    if (log_type === "accesslog") {
      let dataAccessLog = await AccessLog({ application_id: application_id });

      if (dataAccessLog?.data?.type === "success") {
        if (
          Array.isArray(dataAccessLog?.data?.access_log_data) &&
          dataAccessLog?.data?.access_log_data?.length > 0
        ) {
          setLogData(dataAccessLog?.data?.access_log_data);
        } else {
          setLogData([]);
        }

        setisError(AccessLogParams[0]?.isError);
        setisLoading(AccessLogParams[0]?.isLoading);
      }
    } else {
      // setNotFound(true);
    }

    if (log_type === "errorlog") {
      let dataErrorLog = await ErrorLog({ application_id: application_id });

      if (dataErrorLog?.data?.type === "success") {
        if (
          Array.isArray(dataErrorLog?.data?.error_log_data) &&
          dataErrorLog?.data?.error_log_data?.length > 0
        ) {
          setLogData(dataErrorLog?.data?.error_log_data);
        } else {
          setLogData([]);
        }
      } else {
        // setNotFound(true);
      }

      setisError(ErrorLogParams[0]?.isError);
      setisLoading(ErrorLogParams[0]?.isLoading);
    }

    if (log_type === "outputlog") {
      let dataOutputLog = await OutputLog({ application_id: application_id });

      if (dataOutputLog?.data?.type === "success") {
        if (
          Array.isArray(dataOutputLog?.data?.output_log_data) &&
          dataOutputLog?.data?.output_log_data?.length > 0
        ) {
          setLogData(dataOutputLog?.data?.output_log_data);
        } else {
          setLogData([]);
        }
      } else {
        // setNotFound(true);
      }

      setisError(OutputLogParams[0]?.isError);
      setisLoading(OutputLogParams[0]?.isLoading);
    }
  };

  React.useEffect(() => {
    getLogData();
    // eslint-disable-next-line
  }, [log_type, application_id, project_id, instance_id]);

  return (
    <>
      <TopNavBar
        onDownload={onDownloadFunc}
        onRefresh={onRefresh}
        isDownloadRefreshRequired
        showActionBtn={false}
        showTopLeftNav={true}
        primaryText={giveMeTopNavbarPrimaryText()}
        secondaryText={"Applications"}
      />
      <div className={classes.root}>
          <Typography className={classes.applicationSx}>
            {location?.state}
          </Typography>
          <div className={classes.ParentDiv}>
            <Paper className={classes.paperErr}>
              {isLoading === true && isError === false && (
                <div className={classes.errLoading}>
                  <CircularProgress color="inherit" />
                </div>
              )}

              {!isLoading &&
                !isError &&
                logData?.length > 0 &&
                logData?.map((i, index) => {
                  return (
                    <>
                      <Typography
                        variant="subtitle1"
                        style={{
                          backgroundColor:
                            index % 2 === 0 ? "#f9f9f9" : "#ffffff",
                          marginLeft: "6px",
                        }}
                      >
                        {/* {index + " : " + i} */}
                        <span style={{ fontWeight: 900 }}>
                          {index + 1 + " : "}
                        </span>
                        <span>{i}</span>
                      </Typography>
                    </>
                  );
                })}

              {!isLoading && !isError && logData?.length === undefined && (
                <div className={classes.notAvailable}>
                  {"LOGS NOT AVAILABLE !"}
                </div>
              )}
            </Paper>
          </div>
        </div>
    </>
  );
};
