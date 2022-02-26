import { Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import BarraNavegacion from "../componentes/BarraNavegacion/BarraNavegacion";
import SaveIcon from "@mui/icons-material/Save";
const Perfil = (props) => {
  const handleCerrarSesion = () => {
    if (props.onCerarSesion) {
      props.onCerarSesion();
    }
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

              //defaultValue="Hello World"
            />
            <TextField
              style={paddingInferior}
              required
              id="outlined-required"
              size="small"
              label="Documento de Identidad"
              //defaultValue="Hello World"
            />
            <TextField
              style={paddingInferior}
              required
              id="outlined-required"
              label="Dirección"
              size="small"
              //defaultValue="Hello World"
            />
            <TextField
              style={paddingInferior}
              required
              id="outlined-required"
              label="Teléfono"
              size="small"
              //defaultValue="Hello World"
            />
            <TextField
              style={paddingInferior}
              required
              id="outlined-required"
              size="small"
              label="Sector laboral"
              //defaultValue="Hello World"
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

              //defaultValue="Hello World"
            />
            <TextField
              style={paddingInferior}
              required
              id="outlined-required"
              label="Fecha e Nacimiento"
              size="small"

              //defaultValue="Hello World"
            />
            <TextField
              style={paddingInferior}
              required
              id="outlined-required"
              label="Email"
              size="small"

              //defaultValue="Hello World"
            />
            <TextField
              style={paddingInferior}
              required
              id="outlined-required"
              label="Ocupación"
              size="small"

              //defaultValue="Hello World"
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
        <Button
          variant="outlined"
          onClick={handleCerrarSesion}
          style={{ marginRight: "5px" }}
        >
          Editar
        </Button>
        <Button
          variant="contained"
          onClick={handleCerrarSesion}
          startIcon={<SaveIcon />}
          //disabled
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
