import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { resources } from "./resources/resources";

import {
  AuthPage,
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  ThemedLayoutV2,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { DataProvider } from "@refinedev/strapi-v4";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider, axiosInstance } from "./authProvider";
import { Header } from "./components/header";
import { API_URL } from "./constants";
import { ColorModeContextProvider } from "./contexts/color-mode";

import { Dashboard } from "./pages/dashboards";

import {
  PersonCreate,
  PersonEdit,
  PersonList,
  PersonShow,
} from "./pages/people";

import { 
  GroupList,
  GroupCreate,
  GroupEdit,
  GroupShow,
} from "./pages/groups";  

import {
  CompanyCreate,
  CompanyEdit,
  CompanyList,
  CompanyShow,
} from "./pages/companies";

import {
  VisitorCreate,
  VisitorEdit,
  VisitorList,
  VisitorShow,
} from "./pages/visitors";

import { 
  AreaList,
  AreaCreate,
  AreaEdit,
  AreaShow,
} from "./pages/areas";

import { 
  DeviceList,
  DeviceCreate,
  DeviceEdit,
  DeviceShow,
} from "./pages/devices";

import { 
  ScheduleList,
  ScheduleCreate,
  ScheduleEdit,
  ScheduleShow,
} from "./pages/schedules";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                authProvider={authProvider}
                dataProvider={DataProvider(API_URL + `/api`, axiosInstance)}
                notificationProvider={notificationProvider}
                routerProvider={routerBindings}
                resources={resources}

                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "3xNlC8-nFajkN-4Aratq",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                          <ThemedLayoutV2 Header={Header}>
                            <Outlet />
                          </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="Dashboard" />}
                    />
                    <Route path="/people">
                      <Route index element={<PersonList />} />
                      <Route path="create" element={<PersonCreate />} />
                      <Route path="edit/:id" element={<PersonEdit />} />
                      <Route path="show/:id" element={<PersonShow />} />
                    </Route>
                    <Route path="/companies">
                      <Route index element={<CompanyList />} />
                      <Route path="create" element={<CompanyCreate />} />
                      <Route path="edit/:id" element={<CompanyEdit />} />
                      <Route path="show/:id" element={<CompanyShow />} />
                    </Route>      
                    <Route path="/visitors">
                      <Route index element={<VisitorList />} />
                      <Route path="create" element={<VisitorCreate />} />
                      <Route path="edit/:id" element={<VisitorEdit />} />
                      <Route path="show/:id" element={<VisitorShow />} />
                    </Route>
                    <Route path="/groups">
                      <Route index element={<GroupList />} />
                      <Route path="create" element={<GroupCreate />} />
                      <Route path="edit/:id" element={<GroupEdit />} />
                      <Route path="show/:id" element={<GroupShow />} />
                    </Route>      
                  <Route path="/areas">
                    <Route index element={<AreaList />} />
                    <Route path="create" element={<AreaCreate />} />
                    <Route path="edit/:id" element={<AreaEdit />} />
                    <Route path="show/:id" element={<AreaShow />} />
                  </Route>    
                  <Route path="/devices">
                    <Route index element={<DeviceList />} />
                    <Route path="create" element={<DeviceCreate />} />
                    <Route path="edit/:id" element={<DeviceEdit />} />
                    <Route path="show/:id" element={<DeviceShow />} />
                  </Route>    
                  <Route path="/schedules">
                    <Route index element={<ScheduleList />} />
                    <Route path="create" element={<ScheduleCreate />} />
                    <Route path="edit/:id" element={<ScheduleEdit />} />
                    <Route path="show/:id" element={<ScheduleShow />} />
                  </Route>    

                  <Route path="/dashboards" element={<Dashboard />} />
                  
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route
                      path="/login"
                      element={
                        <AuthPage
                          type="login"
                          formProps={{
                            defaultValues: {
                              email: "demo@refine.dev",
                              password: "demodemo",
                            },
                          }}
                        />
                      }
                    />
                    <Route
                      path="/register"
                      element={<AuthPage type="register" />}
                    />
                    <Route
                      path="/forgot-password"
                      element={<AuthPage type="forgotPassword" />}
                    />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;