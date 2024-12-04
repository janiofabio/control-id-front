import React from "react";
import { Refine } from "@pankod/refine-core";
import {
  Layout,
  ThemeProvider,
  LightTheme,
  CssBaseline,
} from "@pankod/refine-mui";
import routerProvider from "@pankod/refine-react-router-v6";
import dataProvider from "@pankod/refine-simple-rest";
import { MuiInferencer } from "@pankod/refine-inferencer/mui";

const API_URL = "https://localhost:1337/api"; 

const App: React.FC = () => {
  return (
    <ThemeProvider theme={LightTheme}>
      <CssBaseline />
      <Refine
        routerProvider={routerProvider}
        dataProvider={dataProvider(API_URL)}
        Layout={Layout}
        resources={[
          {
            name: "companies",
            list: MuiInferencer,
            show: MuiInferencer,
            create: MuiInferencer,
            edit: MuiInferencer,
            canDelete: true,
          },
        ]}
      />
    </ThemeProvider>
  );
};

export default App;
