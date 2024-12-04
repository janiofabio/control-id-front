import React, { useEffect, useState } from "react";
import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
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

// Importar páginas relacionadas às empresas
import {
  CompanyCreate,
  CompanyEdit,
  CompanyList,
  CompanyShow,
} from "./pages/companies";

// Importação do EventEmitter para resolver o aviso de MaxListenersExceededWarning
import { EventEmitter } from "events";
EventEmitter.defaultMaxListeners = 20;

// Componente para o novo menu lateral
const Sidebar: React.FC<{ onMenuSelect: (menu: string) => void }> = ({ onMenuSelect }) => (
  <div style={{ width: "250px", backgroundColor: "#f0f0f0", padding: "20px", position: "fixed", left: 0, top: 0, height: "100vh" }}>
    <h3>Menu</h3>
    <ul>
      <li onClick={() => onMenuSelect("Dashboard")}>Dashboard</li>
      <li onClick={() => onMenuSelect("Monitoramento de Acessos")}>Monitoramento de Acessos</li>
      <li onClick={() => onMenuSelect("Monitoramento de Veículos")}>Monitoramento de Veículos</li>
      <li onClick={() => onMenuSelect("Monitoramento de Alarmes")}>Monitoramento de Alarmes</li>
      <li onClick={() => onMenuSelect("Planta Baixa")}>Planta Baixa</li>
      <li>Cadastros
        <ul>
          <li onClick={() => onMenuSelect("Pessoas")}>Pessoas</li>
          <li onClick={() => onMenuSelect("Visitantes")}>Visitantes</li>
          <li onClick={() => onMenuSelect("Grupos")}>Grupos</li>
          <li onClick={() => onMenuSelect("Empresas")}>Empresas</li>
          <li onClick={() => onMenuSelect("Tipos de Créditos")}>Tipos de Créditos</li>
          <li onClick={() => onMenuSelect("Gerenciamento de Créditos")}>Gerenciamento de Créditos</li>
          <li onClick={() => onMenuSelect("Cartões Provisórios")}>Cartões Provisórios</li>
          <li onClick={() => onMenuSelect("Veículos")}>Veículos</li>
        </ul>
      </li>
      <li onClick={() => onMenuSelect("Estacionamentos")}>Estacionamentos</li>
      <li onClick={() => onMenuSelect("Acesso")}>Acesso</li>
      <li onClick={() => onMenuSelect("Relatórios")}>Relatórios</li>
      <li onClick={() => onMenuSelect("Configurações")}>Configurações</li>
    </ul>
  </div>
);

// Componente Dashboard para exibir lista de empresas
const Dashboard: React.FC<{ companies: any[] }> = ({ companies }) => (
  <div style={{ marginLeft: "270px" }}>
    <h1>Dashboard</h1>
    <h2>Companies List</h2>
    <ul>
      {companies.map((company) => (
        <li key={company.id}>
          <strong>{company.attributes.companyName}</strong> - {company.attributes.description}
        </li>
      ))}
    </ul>
  </div>
);

function App() {
  const [companies, setCompanies] = useState<any[]>([]);
  const [selectedMenu, setSelectedMenu] = useState<string>("Dashboard");

  useEffect(() => {
    if (selectedMenu === "Empresas") {
      fetchCompanies();
    }
  }, [selectedMenu]);

  const fetchCompanies = async () => {
    try {
      const response = await fetch(`${API_URL}/companies`);
      if (!response.ok) {
        throw new Error("Failed to fetch companies");
      }
      const data = await response.json();
      if (data && data.data) {
        setCompanies(data.data);
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  const handleMenuSelect = (menu: string) => {
    setSelectedMenu(menu);
  };

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
                resources={[
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
                      element={<NavigateToResource resource="users" />}
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

                <Sidebar onMenuSelect={handleMenuSelect} />
                {selectedMenu === "Empresas" && <Dashboard companies={companies} />}

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