import React from "react";
import { LinearProgress } from "@mui/material";
import { LocalStorageKeys, refreshCacheAndReload, semverGreaterThan, VersionFetchURL } from "./utils";
// import { useRefreshQuery } from "./redux/services/auth";

export const AppAuth = (props) => {

  // const { isLoading } = useRefreshQuery();
  const isLoading = false;

  const checkForLatestBuild = () => {
    fetch(VersionFetchURL).then(res => res.json()).then((_) => {
      const isVersion = semverGreaterThan(_.version, localStorage.getItem(LocalStorageKeys.version));
      localStorage.setItem(LocalStorageKeys.version, _.version)
      if (isVersion) { refreshCacheAndReload() }
    }, (error) => { console.log('Error at Fetching Latest Version: ', error) })
  }

  React.useEffect(() => { checkForLatestBuild() });

  return <>
    {isLoading && <LinearProgress />}
    {props.children}
  </>
}