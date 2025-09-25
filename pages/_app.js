import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "../src/context";

// Material Dashboard 2 React themes
import theme from "../src/assets/theme";

export default function MyApp({ Component, pageProps }) {
  return (
    <MaterialUIControllerProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </MaterialUIControllerProvider>
  );
}