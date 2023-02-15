import React from 'react';
import { Grid, } from '@mui/material';
import { makeStyles } from "@mui/styles";
import { Error, GridView, ListView, AddProjectDrawer } from '../../components';
import { useDispatch, useSelector } from "react-redux";
import { NavTitle } from '../../components/navTitle';
import { useGetAllProjectsQuery } from '../../redux/services';
import { Projectsloading } from './projectsloading';
import { AppRoutes } from '../../router/routes';
import { ProjectsNotfound } from './projectsNotFound';
import { refreshProjectListing } from '../../redux/slices/utils';
import { CreateInstanceDrawer } from '../../components/createInstanceDrawer'
import { openDrawer } from "../../redux/slices/drawer"
import { useNavigate } from "react-router-dom";
import { TopNavBar } from "../../components";


const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
        backgroundImage: "url('/images/jpg/signInSignUpBg.png')", height: "100%",
        backgroundSize: "cover"

    }, cardbox: {
        display: "flex",
        justifyContent: "center",
        paddingTop: "90px"
    },

}))

export const Projects = (props) => {
    // General Hooks
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const canIRefresh = useSelector(state => state.utils.refreshProjectListing);

    // Component States
    const [gridView, setGridView] = React.useState(false);
    const [
        state, setState
        // setState TODO: Un comment when we implement the infinite scroll
    ] = React.useState({ data: "", start: 0, length: 200 });
    const [search, setSearch] = React.useState("");


    // Redux Hooks for API Integeration
    const { isLoading, isError, data, refetch: getAllProjects } = useGetAllProjectsQuery({ start: state.start, length: state.length });
   

    const handleView = () => { setGridView(!gridView) };
    React.useEffect(() => {
        if (canIRefresh) {
            getAllProjects();
            dispatch(refreshProjectListing());
        }
        // eslint-disable-next-line
    }, [canIRefresh]);

    const addInstance = (project) => {
        dispatch(openDrawer({
            component: <CreateInstanceDrawer id={project.id} navigate={navigate} />,
            title: "Create Project",
            positiveActName: "save",
        }))
    };

    const viewInstance = (project) => {
        navigate({
            pathname: `${AppRoutes.projectInstancesParent}${project?.id}`,
            state: {
                name: project.name,
                projectId: project?.id
            }

        })
    };


    const onAddProjectButtonClicked = () => {
        dispatch(openDrawer({
            component: <AddProjectDrawer />,
            title: "Create Project",
            positiveActName: "save"
        }))
    }

    const onListBtnClick = (project) => {
        if (project.server_count === 0) { addInstance(project) } else { viewInstance(project) }
    };
    const deleteBtn = (index) => {
        setState(data.projects.filter((_, i) => i !== index))

    }
    return <>
        {/* Top Navbar */}
        <TopNavBar showActionBtn={true} actionBtnName="+ Add Project" actionBtnOnClick={onAddProjectButtonClicked} />

        {/* Projects */}
        <div className={classes.root}>

            {/* Header */}
            {(!isLoading && !isError && data.projects?.length > 0) && <NavTitle title={`Projects (${data?.projects?.length})`} handleView={handleView} btntext='Add projects' addprojects={onAddProjectButtonClicked} searchprojects="search" search={search} setSearch={setSearch} />}


            {/* No Projects Found */}
            {(!isLoading && !isError && data.projects === null) &&
                <ProjectsNotfound onAddProjectButtonClicked={onAddProjectButtonClicked} />
            }

            {/*Loader*/}
            {isLoading && <Projectsloading view={gridView ? "gridView" : "listView"} />}

            {/*Error Message */}
            {isError && <Error error="OOPS someething went wrong" linktext='tryagain' link={AppRoutes.projects} />}

            {/* Project List along with search filter */}
            {(!isLoading && !isError && data.projects?.length > 0) && (

                <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 1, sm: 8, md: 12 }} sx={{ padding: "20px" }}>
                    {data.projects && data.projects.map((project, index) => {

                        // Props for the <GridView /> and <ListView />
                        let props = {
                            images: '/images/homeScreenLogo.png', id: project.id, btnHelperText: project.server_count ? `${project.server_count} instance(s)` : ``,
                            title: project.name, btnName: project.server_count > 0 ? "View" : "+ Add instance",
                            btnVarient: project.server_count > 0 ? "outlined" : "text", onBtnClick: () => onListBtnClick(project), handleDelete: () => deleteBtn(index)
                        };

                        // Component based on Grid and List View
                        let list = (
                            <Grid key={index} item xs={gridView ? 2 : 12} sm={gridView ? 4 : 12} md={gridView ? 3 : 12} className={classes.listi} >
                                {gridView && <GridView {...props} />}
                                {!gridView && <ListView {...props} />}
                            </Grid>
                        )

                        // Changing component based on search string
                        if (search.trim().length > 0) {
                            if (project.name.toLowerCase().includes(search.toLowerCase())) {
                                return list;
                            } else {
                                return <></>
                            }
                        } else { return list }
                    })
                    }
                </Grid>
            )}
        </div>
    </>
}