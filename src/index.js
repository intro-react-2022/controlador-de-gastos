import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
//import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "@mui/material/styles";
import mainTheme from "./temas/mainTheme";
import MainRouter from "./rutas/MainRouter";
import { UserProvider } from "./globals/contexts/userContext";

ReactDOM.render(
  <ThemeProvider theme={mainTheme}>
    <UserProvider initialValue={{}}>
      <MainRouter />
    </UserProvider>
  </ThemeProvider>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
