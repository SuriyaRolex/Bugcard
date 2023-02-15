import React from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  GridView,
  ListView,
  NavTitle,
  TopNavBar,
  ApplicationDrawer,
  CreateInstanceDrawer,
} from "../../components";
import { openDrawer } from "../../redux/slices/drawer";
import { AppRoutes } from "../../router/routes";
import { useNavigate } from "react-router-dom";
import {
  useGetAllCreateInstanceQuery,
  useGetProjectQuery,
} from "../../redux/services";
import { refreshProjectInstanceListing } from '../../redux/slices/utils';
import { useParams } from "react-router-dom";
import { ProjectInstancesNotFound } from "./projectInstancesNotFound";
import { ProjectInstanceLoading } from "./projectInstanceLoading";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    backgroundImage: "url('/images/jpg/signInSignUpBg.png')",
    height: "100%",
    backgroundSize: "cover",
  },
  cardbox: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "90px",
  },
}));

export const ProjectInstances = () => {
  // Gerneral hooks
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const canIRefresh = useSelector((state) => state.utils.refreshProjectInstanceListing);

  // Component States
  let { project_id } = useParams();

  const [search, setSearch] = React.useState("");

  const [gridView, setGridView] = React.useState(false);
  const [
    state,
    // setState TODO: Un comment when we implement the infinite scroll
  ] = React.useState({ start: 0, length: 200 });

  //Redux  Hooks for API Integration
  const {
    isLoading,
    isError,
    data,
    refetch: getAllCreateInstance,
  } = useGetAllCreateInstanceQuery({ project_id, ...state });

  const {
    isLoading: isProjectDetailLoading,
    data: projectDetail,
    isError: projectDetailError,
  } = useGetProjectQuery({ id: project_id });

  const handleView = () => {
    setGridView(!gridView);
  };

  const addApplications = (instance) => {
    dispatch(
      openDrawer({
        component: (
          <ApplicationDrawer instance={instance} project_id={project_id} />
        ),
        title: "Create Applications",
        positiveActName: "save",
      })
    );
  };

  const viewInstance = (instance) => {
    navigate(
      `${AppRoutes.projectInstanceDetailParent}${project_id}/${instance.id}`
    );
  };

  const onListBtnClick = (instance) => {
    if (instance.applications_count === 0) {
      addApplications(instance);
    } else {
      viewInstance(instance);
    }
  };

  const onAddInstanceButtonClicked = () => {
    dispatch(
      openDrawer({
        component: <CreateInstanceDrawer id={project_id} navigate={navigate} />,
        title: "Create Instance",
        positiveActName: "save",
      })
    );
  };

  const giveMeTopNavbarPrimaryText = () => {
    if (isProjectDetailLoading) {
      return "Loading...";
    } else if (projectDetailError) {
      return "Automatly";
    } else {
      return projectDetail.data.name;
    }
  };

  // refresh the list 
  React.useEffect(() => {
    if (canIRefresh) {
      getAllCreateInstance();
      dispatch(refreshProjectInstanceListing());
    }
    // eslint-disable-next-line
  }, [canIRefresh]);

  return (
    <>
      {/* Top Navbar*/}
      <TopNavBar
        showActionBtn={true}
        actionBtnName={"+ Add Instance"}
        actionBtnOnClick={onAddInstanceButtonClicked}
        showTopLeftNav={true}
        primaryText={giveMeTopNavbarPrimaryText()}
        secondaryText={"Project"}
      />

      {/* Project Instances */}
      <div className={classes.root}>
        {/* Header */}
        <NavTitle
          title={`Instance`}
          handleView={handleView}
          btntext="Add projects"
          searchprojects="search"
          search={search}
          setSearch={setSearch}
        />

        {/* No Projects Found */}
        {!isLoading && !isError && data.createInstance === null && (
          <ProjectInstancesNotFound
            onAddInstanceButtonClicked={onAddInstanceButtonClicked}
          />
        )}
        {/*Loader*/}
        {isLoading && (
          <ProjectInstanceLoading
            project_id={project_id}
            view={gridView ? "gridView" : "listView"}
          />
        )}

        {/* Instance List along with search filter */}
        {!isLoading && !isError && data.createInstance?.length > 0 && (
          <Grid
            container
            spacing={{ xs: 2, md: 2 }}
            columns={{ xs: 1, sm: 8, md: 12 }}
            sx={{ padding: "20px" }}
          >
            {data.createInstance &&
              data.createInstance.map((instance, index) => {
                // Props for the <GridView /> and <ListView />
                let props = {
                  images: "/images/homeScreenLogo.png",
                  title: instance.name,
                  onBtnClick: () => onListBtnClick(instance),
                  btnHelperText: instance.applications_count
                    ? `${instance.applications_count} application(s)`
                    : ``,
                  btnVarient:
                    instance.applications_count > 0 ? "outlined" : "text",
                  btnName:
                    instance.applications_count > 0
                      ? "view"
                      : "+ Add Applications",
                  onBtnView: () => viewInstance(instance),
                  btnViewText: instance.applications_count > 0 ? "" : "view",
                };

                // Component based on Grid and List View
                let list = (
                  <Grid
                    key={index}
                    item
                    xs={gridView ? 2 : 12}
                    sm={gridView ? 4 : 12}
                    md={gridView ? 3 : 12}
                    className={classes.listi}
                  >
                    {gridView && <GridView {...props} />}
                    {!gridView && <ListView {...props} />}
                  </Grid>
                );
                if (search.trim().length > 0) {
                  if (
                    instance.name.toLowerCase().includes(search.toLowerCase())
                  ) {
                    return list;
                  } else {
                    return <></>;
                  }
                } else {
                  return list;
                }
              })}
          </Grid>
        )}
      </div>
    </>
  );
};
