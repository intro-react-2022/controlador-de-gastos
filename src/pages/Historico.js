import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BarraNavegacion from "../componentes/BarraNavegacion/BarraNavegacion";
import SelectorFechas from "../componentes/SelectorFechas/SelectorFechas";
import TablaDatos from "../componentes/Tabla/TablaDatos";
import "./Historico.scss";
import { listarActividades } from "../conection/actividades";
const headers = ["Fecha", "Hora", "Descripcion", "Monto ($)", "Acciones"];
const Historico = (props) => {
  const { usuario } = props;
  const [actividades, setActividades] = useState([]);
  /// Fecha
  const [fechaNacimiento, setFechaNacimiento] = useState(null);
  const handleChangeFechaNacimiento = (fechaActual) => {
    setFechaNacimiento(fechaActual);
  };
  const llamarDatos = async () => {
    const { ok, payload, message } = await listarActividades(usuario.idUsuario);
    if (!ok) {
      alert(message);
    } else {
      setActividades(payload);
    }
  };
  useEffect(() => {
    llamarDatos();
  }, []);
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
      <TablaDatos headers={headers} rows={actividades} />
    </BarraNavegacion>
  );
};
const marginIzquierda = {
  marginLeft: "15px",
};
export default Historico;
