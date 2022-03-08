import React from "react";
import BarraNavegacion from "../componentes/BarraNavegacion/BarraNavegacion";

const Historico = (props) => {
  return (
    <BarraNavegacion
      //onCerarSesion={handleOnLogout}
      //onCambioDeVista={handleCambiarDeVista}
      titulo={"Controlador de gastos AEDITIP / Historico"}
    >
      Transacciones historicas
    </BarraNavegacion>
  );
};
export default Historico;
