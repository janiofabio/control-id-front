import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { RefineSnackbarProvider } from "@refinedev/mui";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { DataProvider } from "@refinedev/strapi-v4";
import { authProvider, axiosInstance } from "./authProvider";
import { Header } from "./components/header";
import { API_URL } from "./constants";
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "./pages/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "./pages/categories";
import {
  PersonCreateJin,
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
import {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { ErrorComponent } from "@refinedev/mui";

const queryClient = new QueryClient();

function App() {
  console.log("1 - App component rendered");

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <GitHubBanner />
        <RefineKbarProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                authProvider={authProvider}
                dataProvider={DataProvider(API_URL + `/api`, axiosInstance)}
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
                        {console.log("2 - Authenticated inner rendered")}
                        <Header />
                        <NavigateToResource resource="companies" />
                        <Route path="/blog-posts">
                          <Route index element={<BlogPostList />} />
                          <Route path="create" element={<BlogPostCreate />} />
                          <Route path="edit/:id" element={<BlogPostEdit />} />
                          <Route path="show/:id" element={<BlogPostShow />} />
                        </Route>
                        <Route path="/categories">
                          <Route index element={<CategoryList />} />
                          <Route path="create" element={<CategoryCreate />} />
                          <Route path="edit/:id" element={<CategoryEdit />} />
                          <Route path="show/:id" element={<CategoryShow />} />
                        </Route>
                        <Route path="/people">
                          <Route index element={<PersonList />} />
                          <Route path="createJin" element={<PersonCreateJin />} />
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
                        <Route path="*" element={<ErrorComponent />} />
                      </Authenticated>
                    }
                  />
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        {console.log("5 - Authenticated outer rendered")}
                        <NavigateToResource />
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
                      </Authenticated>
                    }
                  />
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </RefineKbarProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
