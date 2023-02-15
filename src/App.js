import React from "react";
import { AppAuth } from "./App.auth";
import { AppTheme } from "./App.theme";
import { AppAlert } from "./App.alert";
import AppErrorBoundary from "./App.errorBoundry";
import RouterApp from "./router";
import ApolloClient from "./App.gqlclient";
import { AppDrawer } from "./App.drawer";
import { CssBaseline } from "@mui/material";
import { AppDialog } from "./App.dialog";
import { AppBackDrop } from "./App.backdrop";
import AppFirebase from "./App.firebase"; //For Push Notification thing
import { AppRedux } from "./redux";

const App = () => {
  return (
    <AppRedux>
      <ApolloClient>
        <AppErrorBoundary>
          <AppAuth>
            <AppTheme>
              <CssBaseline />
              <AppAlert>
                <AppDialog>
                  <AppDrawer>
                    <AppBackDrop>
                      <AppFirebase>
                        <RouterApp />
                      </AppFirebase>
                    </AppBackDrop>
                  </AppDrawer>
                </AppDialog>
              </AppAlert>
            </AppTheme>
          </AppAuth>
        </AppErrorBoundary>
      </ApolloClient>
    </AppRedux>
  );
}
export default App;