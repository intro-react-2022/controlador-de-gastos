//import logo from "./logo.svg";
import "./App.css";
//import { Fragment } from "react";
import PageWrapper from "./componentes/PageWrapper/PageWrapper";
import { Paper, TextField, Button } from "@mui/material";
import Login from "./pages/Login";
import { Fragment, useState } from "react";
import Perfil from "./pages/Perfil";
import Transacciones from "./pages/Transacciones";
import Historico from "./pages/Historico";
import BarraNavegacion from "./componentes/BarraNavegacion/BarraNavegacion";
function App() {
  const [paginaActual, setPaginaActual] = useState("login");

  const handleOnLogin = () => {
    setPaginaActual("perfil");
  };
  const handleOnLogout = () => {
    setPaginaActual("login");
  };
  return (
    <Fragment>
      {paginaActual === "login" ? (
        <Login onLogin={handleOnLogin} />
      ) : (
        <Fragment>
          <BarraNavegacion>
            {paginaActual === "perfil" && (
              <Perfil onCerarSesion={handleOnLogout} />
            )}
            {paginaActual === "transacciones" && <Transacciones />}
            {paginaActual === "historico" && <Historico />}
          </BarraNavegacion>
        </Fragment>
      )}
    </Fragment>
  );
}

export default App;
