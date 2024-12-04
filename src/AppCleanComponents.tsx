import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { MuiListInferencer } from "@refinedev/inferencer/mui";
import { resources } from "./resources/resources";
import { AuthPage, ErrorComponent, notificationProvider, RefineSnackbarProvider, ThemedLayoutV2 } from "@refinedev/mui";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, { CatchAllNavigate, DocumentTitleHandler, NavigateToResource, UnsavedChangesNotifier } from "@refinedev/react-router-v6";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { authProvider, axiosInstance } from "./authProvider";
import { Header } from "./components/header";
import { API_URL } from "./constants";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { PersonCreate, PersonEdit, PersonList, PersonShow } from "./pages/people";

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
                                dataProvider={{
                                    getList: async ({ resource, pagination, filters, sorters }) => {
                                        const { current, pageSize } = pagination ?? {};
                                        const { data } = await axiosInstance.get(`/${resource}`, {
                                            params: {
                                                _page: current,
                                                _limit: pageSize,
                                            },
                                        });
                                        return { data: data.items, total: data.total };
                                    },
                                    getOne: async ({ resource, id }) => {
                                        const { data } = await axiosInstance.get(`/${resource}/${id}`);
                                        return { data };
                                    },
                                    create: async ({ resource, variables }) => {
                                        const { data } = await axiosInstance.post(`/${resource}`, variables);
                                        return { data };
                                    },
                                    update: async ({ resource, id, variables }) => {
                                        const { data } = await axiosInstance.put(`/${resource}/${id}`, variables);
                                        return { data };
                                    },
                                    deleteOne: async ({ resource, id }) => {
                                        const { data } = await axiosInstance.delete(`/${resource}/${id}`);
                                        return { data };
                                    },
                                }}
                                notificationProvider={notificationProvider}
                                routerProvider={routerBindings}
                                resources={resources}
                                options={{
                                    syncWithLocation: true,
                                    warnWhenUnsavedChanges: true,
                                    useNewQueryKeys: true,
                                }}
                            >
                                <Routes>
                                    <Route element={<Authenticated fallback={<CatchAllNavigate to="/login" />}> <ThemedLayoutV2 Header={Header}> <Outlet /> </ThemedLayoutV2> </Authenticated>}>
                                        <Route index element={<NavigateToResource resource="people" />} />
                                        <Route path="/people">
                                            <Route index element={<PersonList />} />
                                            <Route path="create" element={<PersonCreate />} />
                                            <Route path="edit/:id" element={<PersonEdit />} />
                                            <Route path="show/:id" element={<PersonShow />} />
                                        </Route>
                                        <Route path="*" element={<ErrorComponent />} />
                                    </Route>
                                    <Route element={<Authenticated fallback={<Outlet />}> <NavigateToResource /> </Authenticated>}>
                                        <Route path="/login" element={<AuthPage type="login" />} />
                                        <Route path="/register" element={<AuthPage type="register" />} />
                                        <Route path="/forgot-password" element={<AuthPage type="forgotPassword" />} />
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
