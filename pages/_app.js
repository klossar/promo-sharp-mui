import React from "react";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "../src/context";

// Import global styles
import "../src/assets/css/material-dashboard-react.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <MaterialUIControllerProvider>
      <Component {...pageProps} />
    </MaterialUIControllerProvider>
  );
}