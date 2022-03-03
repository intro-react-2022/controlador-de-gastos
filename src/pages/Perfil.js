import { Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import BarraNavegacion from "../componentes/BarraNavegacion/BarraNavegacion";
import SaveIcon from "@mui/icons-material/Save";
import SelectorFechas from "../componentes/SelectorFechas/SelectorFechas";
const Perfil = (props) => {
  const [modoEdicion, setModoEdicion] = useState(false);
  const [nombres, setNombres] = useState("");
  const [documento, setDocumento] = useState("");

  const handleChangeNombres = (event) => {
    setNombres(event.target.value);
  };
  const handleChangeDocumento = (event) => {
    setDocumento(event.target.value);
  };
  /// Fecha
  const [fechaNacimiento, setFechaNacimiento] = useState(null);
  const handleChangeFechaNacimiento = (fechaActual) => {
    setFechaNacimiento(fechaActual);
  };
  //Botones
  const handleModoEdicionOn = () => {
    setModoEdicion(true);
  };
  const handleSave = () => {
    alert("Se guardaron los cambios");
    setModoEdicion(false);
  };
  return (
    <div>
      <Typography variant="h2" gutterBottom component="div">
        Perfil
      </Typography>

      <Paper elevation={3}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              padding: "15px",
            }}
          >
            <TextField
              style={paddingInferior}
              required
              id="outlined-required"
              label="Nombres"
              size="small"
              onChange={handleChangeNombres}
              //defaultValue="Hello World"
              disabled={!modoEdicion}
              value={nombres}
            />
            <TextField
              style={paddingInferior}
              required
              id="outlined-required"
              size="small"
              label="Documento de Identidad"
              //defaultValue="Hello World"
              disabled={!modoEdicion}
              value={documento}
            />
            <TextField
              style={paddingInferior}
              required
              id="outlined-required"
              label="Dirección"
              size="small"
              disabled={!modoEdicion}
            />
            <TextField
              style={paddingInferior}
              required
              id="outlined-required"
              label="Teléfono"
              size="small"
              disabled={!modoEdicion}
            />
            <TextField
              style={paddingInferior}
              required
              id="outlined-required"
              size="small"
              label="Sector laboral"
              disabled={!modoEdicion}
            />
          </div>
          <div
            style={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              padding: "15px",
            }}
          >
            <TextField
              style={paddingInferior}
              required
              id="outlined-required"
              label="Apellidos"
              size="small"
              disabled={!modoEdicion}
            />
            {/*      <TextField
              style={paddingInferior}
              required
              id="outlined-required"
              label="Fecha e Nacimiento"
              size="small"

              //defaultValue="Hello World"
            /> */}
            <SelectorFechas
              style={paddingInferior}
              label="Fecha de Nacimiento"
              size="small"
              onChange={handleChangeFechaNacimiento}
              value={fechaNacimiento}
              disabled={!modoEdicion}
            />
            <TextField
              style={paddingInferior}
              required
              id="outlined-required"
              label="Email"
              size="small"
              disabled={!modoEdicion}
            />
            <TextField
              style={paddingInferior}
              required
              id="outlined-required"
              label="Ocupación"
              size="small"
              disabled={!modoEdicion}
            />
          </div>
        </div>
      </Paper>

      {/*  <Button variant="outlined" onClick={handleCerrarSesion}>
        {" "}
        Cerrar sesión
      </Button> */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          padding: "20px 0",
        }}
      >
        {!modoEdicion && (
          <Button
            variant="outlined"
            onClick={handleModoEdicionOn}
            style={{ marginRight: "5px" }}
          >
            Editar
          </Button>
        )}
        <Button
          variant="contained"
          onClick={handleSave}
          startIcon={<SaveIcon />}
          disabled={!modoEdicion}
        >
          Guardar
        </Button>
      </div>
    </div>
  );
};
export default Perfil;
const paddingInferior = {
  marginBottom: "18px",
};
