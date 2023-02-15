import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { gitTokenAPI } from "./services/oauth/gitLab/authToken";
import {
  authAPI,
  usersAPI,
  projectAPI,
  createInstanceAPI,
  gitLabAPI,
  gitlabIntegrationAPI,
  applicationAPI,
  reportAPI,
  boilerplateAPI,
  getOsAPI,
  getVersionAPI,
} from "./services";
import {
  authReducer,
  backdropReducer,
  dialogReducer,
  drawerReducer,
  utilsReducer,
} from "./slices";

const ReduxStore = configureStore({
  reducer: {
    [authAPI.reducerPath]: authAPI.reducer,
    [usersAPI.reducerPath]: usersAPI.reducer,
    [projectAPI.reducerPath]: projectAPI.reducer,
    [createInstanceAPI.reducerPath]: createInstanceAPI.reducer,
    [gitLabAPI.reducerPath]: gitLabAPI.reducer,
    [gitTokenAPI.reducerPath]: gitTokenAPI.reducer,
    [gitlabIntegrationAPI.reducerPath]: gitlabIntegrationAPI.reducer,
    [applicationAPI.reducerPath]: applicationAPI.reducer,
    [reportAPI.reducerPath]: reportAPI.reducer,
    [boilerplateAPI.reducerPath]: boilerplateAPI.reducer,
    [getOsAPI.reducerPath]: getOsAPI.reducer,
    [getVersionAPI.reducerPath]:getVersionAPI.reducer,
    auth: authReducer,
    backdrop: backdropReducer,
    dialog: dialogReducer,
    utils: utilsReducer,
    drawer: drawerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authAPI.middleware)
      .concat(projectAPI.middleware)
      .concat(createInstanceAPI.middleware)
      .concat(gitLabAPI.middleware)
      .concat(gitTokenAPI.middleware)
      .concat(getOsAPI.middleware)
      .concat(getVersionAPI.middleware)
});

export const AppRedux = ({ children }) => {
  return <Provider store={ReduxStore}>{children}</Provider>;
};
