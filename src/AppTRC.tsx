import { DevtoolsProvider, DevtoolsPanel } from "@refinedev/devtools";
/* eslint-disable prefer-const */
import { AuthBindings, Refine } from "@refinedev/core";

import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  useNotificationProvider,
  RefineSnackbarProvider,
} from "@refinedev/mui";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { ColorModeContextProvider } from "./contexts/color-mode/";

import routerBindings, {
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { Router } from "./routes/Routes";
import { BrowserRouter } from "react-router-dom";

import { resources } from "./resources/resources";
import { AuthProvider, axiosInstance } from "./providers/auth/authProvider";
import { DataProvider } from "./providers/strapi-v4";
//import { useTranslation } from "react-i18next";
import {
  API_URL_CONTROLID,
  TOKEN_KEY,
} from "./providers/constants";
//import i18n from "./providers/i18n/i18n";

function App() {
  /*
  let userRole: AuthBindings | unknown;
  const token = localStorage.getItem(TOKEN_KEY);

  if (AuthProvider) {
    // eslint-disable-next-line no-inner-declarations
    async function setUserRole() {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      userRole = await AuthProvider.getPermissions(token as string);
    }
    setUserRole();
  }

  const { t } = useTranslation();
  const i18nProvider = {
    translate: (key: string, params: object) => t(key, params),
    changeLocale: (lang: string) => i18n.changeLanguage(lang),
    getLocale: () => i18n.language,
  };
  
  let Auth = "";
  let Core = "";
  let Blog = "";
  let Ticket = "";
  switch (userRole) {
    case "Authenticated":
      {
        Auth = API_URL_AUTH;
        Core = API_URL_CORE;
        Blog = API_URL_BLOG;
        Ticket = API_URL_TICKET;

      }
      break;
    case "Admin":
      {
        Auth = API_URL_AUTH;
        Core = API_URL_CORE_ADMIN;
        Blog = API_URL_BLOG_ADMIN;
        Ticket = API_URL_TICKET_ADMIN;
      }
      break;
    case "Super Admin":
      {
        Auth = API_URL_AUTH;
        Core = API_URL_CORE_SADMIN;
        Blog = API_URL_BLOG_SADMIN;
        Ticket = API_URL_TICKET_SADMIN;
      }
      break;
    case "Suport Agents":
      {
        Auth = API_URL_AUTH;
        Core = API_URL_CORE_SADMIN;
        Blog = API_URL_BLOG_SADMIN;
        Ticket = API_URL_TICKET_SADMIN;
      }
      break;
    default:
      {
        Auth = API_URL_AUTH;
        Core = API_URL_CORE;
        Blog = API_URL_BLOG;
        Ticket = API_URL_TICKET;
      }
      break;
  }
  */
  let ControliD = "";
  ControliD = API_URL_CONTROLID;
 // console.log(Auth, userRole);
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                authProvider={AuthProvider}
                dataProvider={{
                  //default: DataProvider(Auth, axiosInstance),
                  //core: DataProvider(Core, axiosInstance),
                  //blog: DataProvider(Blog, axiosInstance),
                  //ticket: DataProvider(Ticket, axiosInstance),
                  controlid: DataProvider(ControliD, axiosInstance),
                }}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                i18nProvider={i18nProvider}
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  projectId: "5JPgtg-Bg3vca-KGNLUq",
                }}
              >
                <Router />
                <RefineKbar />
                <UnsavedChangesNotifier />
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
