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
  /* const handleIrATransacciones=()=>{
    setPaginaActual("transacciones");
  }
  const handleIrAHistórico=()=>{
    setPaginaActual("historico");
  }
  const handleIrAPerfil=()=>{
    setPaginaActual("perfil");
  } */
  const handleCambiarDeVista = (vista) => {
    if (!vista) {
      return;
    }
    if (["perfil", "transacciones", "historico"].includes(vista)) {
      setPaginaActual(vista);
    }
  };
  return (
    <Fragment>
      {paginaActual === "login" ? (
        <Login onLogin={handleOnLogin} />
      ) : (
        <Fragment>
          <BarraNavegacion
            onCerarSesion={handleOnLogout}
            onCambioDeVista={handleCambiarDeVista}
            titulo={"Controlador de gastos AEDITIP"}
          >
            {paginaActual === "perfil" && <Perfil />}
            {paginaActual === "transacciones" && <Transacciones />}
            {paginaActual === "historico" && <Historico />}
          </BarraNavegacion>
        </Fragment>
      )}
    </Fragment>
  );
}

export default App;
