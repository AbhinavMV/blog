import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
const theme = createMuiTheme({
  palette: {
    primary: {
      light: grey[900],
      main: grey[900],
      dark: grey[900],
    },
  },
});
ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
