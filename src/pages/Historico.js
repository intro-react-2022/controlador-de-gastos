import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import BarraNavegacion from "../componentes/BarraNavegacion/BarraNavegacion";
import SelectorFechas from "../componentes/SelectorFechas/SelectorFechas";
import TablaDatos from "../componentes/Tabla/TablaDatos";
import "./Historico.scss";
const headers=[
  "Fecha","Hora", "Descripcion", "Monto ($)", "Acciones"
];
const Historico = (props) => {
  const [actividades,setActividades]=useState([ {
    idUsuario: 1,
    idActividad: 1,
    denominacion: "Dia navideño",
    monto: 2405,
    fecha: new Date(),
  },{
    idUsuario: 1,
    idActividad: 1,
    denominacion: "Dia navideño",
    monto: 2405,
    fecha: new Date(),
  },{
    idUsuario: 1,
    idActividad: 1,
    denominacion: "Dia navideño",
    monto: 2405,
    fecha: new Date(),
  },{
    idUsuario: 1,
    idActividad: 1,
    denominacion: "Dia navideño",
    monto: 2405,
    fecha: new Date(),
  },
  {
    idUsuario: 1,
    idActividad: 2,
    denominacion: "Viaje a Rusia 2018",
    monto: 1800,
    fecha: new Date(),
  },
  {
    idUsuario: 1,
    idActividad: 3,
    denominacion: "Dia de San Calentin",
    monto: -320,
    fecha: new Date(),
  },]);
  /// Fecha
  const [fechaNacimiento, setFechaNacimiento] = useState(null);
  const handleChangeFechaNacimiento = (fechaActual) => {
    setFechaNacimiento(fechaActual);
  };
  return (
    <BarraNavegacion
      //onCerarSesion={handleOnLogout}
      //onCambioDeVista={handleCambiarDeVista}
      titulo={"Controlador de gastos AEDITIP / Historico"}
    >
      <Typography variant="h2" gutterBottom component="div">
        Historial de actividades
      </Typography>
      <div className="historial-controles">
        <SelectorFechas
          style={marginIzquierda}
          label="Fecha"
          size="small"
          onChange={handleChangeFechaNacimiento}
          value={fechaNacimiento}
          //disabled={!modoEdicion}
        />
        <TextField
          style={marginIzquierda}
          id="input-with-icon-textfield"
          label="TextField"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </div>
      <TablaDatos headers={headers} rows={actividades}/>
    </BarraNavegacion>
  );
};
const marginIzquierda = {
  marginLeft: "15px",
};
export default Historico;
