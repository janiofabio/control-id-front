import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { MuiInferencer } from "@pankod/refine-inferencer/mui";
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
  UserCreate,
  UserEdit,
  UserList,
  UserShow,
} from "./pages/people";

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



function App() {
  console.log("1 - App component rendered");

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
                /*resources={[
                  {
                    name: "blog-posts",
                    list: "/blog-posts",
                    create: "/blog-posts/create",
                    edit: "/blog-posts/edit/:id",
                    show: "/blog-posts/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "categories",
                    list: "/categories",
                    create: "/categories/create",
                    edit: "/categories/edit/:id",
                    show: "/categories/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "users",
                    list: "/users",
                    create: "/users/create",
                    edit: "/users/edit/:id",
                    show: "/users/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                  {
                    name: "companies",
                    list: "/companies",
                    create: "/companies/create",
                    edit: "/companies/edit/:id",
                    show: "/companies/show/:id",
                    meta: {
                      canDelete: true,
                    },
                  },
                ]}
                */
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

                        <ThemedLayoutV2 Header={Header}>
                          {console.log("3 - ThemedLayoutV2 with Header rendered")}
                          <Outlet />
                        </ThemedLayoutV2>


                      </Authenticated>
                    }
                  >
                    {console.log("4 - Main routes rendered")}
                    <Route
                      index
                      element={<NavigateToResource resource="companies" />}
                    />
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
                    <Route path="/users">
                      <Route index element={<UserList />} />
                      <Route path="create" element={<UserCreate />} />
                      <Route path="edit/:id" element={<UserEdit />} />
                      <Route path="show/:id" element={<UserShow />} />
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
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        {console.log("5 - Authenticated outer rendered")}
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    {console.log("6 - Auth routes rendered")}
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
                {console.log("7 - RefineKbar rendered")}
                <UnsavedChangesNotifier />
                {console.log("8 - UnsavedChangesNotifier rendered")}
                <DocumentTitleHandler />
                {console.log("9 - DocumentTitleHandler rendered")}
              </Refine>
              <DevtoolsPanel />
              {console.log("10 - DevtoolsPanel rendered")}
            </DevtoolsProvider>
          </RefineSnackbarProvider>

        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
