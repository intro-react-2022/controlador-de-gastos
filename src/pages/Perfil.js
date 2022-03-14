import { Button, Paper, TextField, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import BarraNavegacion from "../componentes/BarraNavegacion/BarraNavegacion";
import SaveIcon from "@mui/icons-material/Save";
import SelectorFechas from "../componentes/SelectorFechas/SelectorFechas";
import AlertDialog from "../componentes/Dialogs/AlertDialog";
const Perfil = (props) => {
  const { usuario } = props;

  const [modoEdicion, setModoEdicion] = useState(false);
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [documentoIdentidad, setDocumentoIdentidad] = useState("");
  //const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [ocupacion, setOcupacion] = useState("");
  const [sectorLaboral, setSectorLaboral] = useState("");
  const [telefono, setTelefono] = useState("");

  const handleChangeNombres = (event) => {
    setNombres(event.target.value);
  };
  const handleChangeApellidos = (event) => {
    setApellidos(event.target.value);
  };
  const handleChangeDireccion = (event) => {
    setDireccion(event.target.value);
  };
  const handleChangeDocumento = (event) => {
    setDocumentoIdentidad(event.target.value);
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
    // alert("Se guardaron los cambios");
    setOpenW(true);
    //setModoEdicion(false);
  };
  const handleContinuar = () => {
    setOpenW(false);
    setOpenC(true);
    setModoEdicion(false);
  };
  //dialogs
  const [openWarningDialog, setOpenW] = useState(false);
  const [openConfirmationDialog, setOpenC] = useState(false);

  useEffect(() => {
    if (usuario) {
      const {
        nombres,
        apellidos,
        correo,
        direccion,
        documentoIdentidad,
        ocupacion,
        sectorLaboral,
        telefono,
        fechaNacimiento,
      } = usuario;
      setNombres(nombres);
      setApellidos(apellidos);
      setCorreo(correo);
      setDireccion(direccion);
      setDocumentoIdentidad(documentoIdentidad);
      setOcupacion(ocupacion);
      setSectorLaboral(sectorLaboral);
      setTelefono(telefono);
      setFechaNacimiento(fechaNacimiento);
    }
  }, [usuario]);

  return (
    <BarraNavegacion titulo={"Controlador de gastos AEDITIP / Perfil"}>
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
              onChange={handleChangeDocumento}
              //defaultValue="Hello World"
              disabled={!modoEdicion}
              value={documentoIdentidad}
            />
            <TextField
              style={paddingInferior}
              required
              id="outlined-required"
              label="Dirección"
              size="small"
              onChange={handleChangeDireccion}
              disabled={!modoEdicion}
              value={direccion}
            />
            <TextField
              style={paddingInferior}
              required
              id="outlined-required"
              label="Teléfono"
              size="small"
              disabled={!modoEdicion}
              //onChange={handle}

              value={telefono}
            />
            <TextField
              style={paddingInferior}
              required
              id="outlined-required"
              size="small"
              label="Sector laboral"
              disabled={!modoEdicion}
              value={sectorLaboral}
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
              value={apellidos}
              onChange={handleChangeApellidos}
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
              value={correo}
            />
            <TextField
              style={paddingInferior}
              required
              id="outlined-required"
              label="Ocupación"
              size="small"
              disabled={!modoEdicion}
              value={ocupacion}
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
      <AlertDialog
        abrir={openWarningDialog}
        onClose={() => {
          setOpenW(false);
        }}
        message={"¿Desea guardar los cambios?"}
        tipoAlerta="warning"
        button1={{
          label: "Cancelar",
          funcion: () => {
            setOpenW(false);
          },
        }}
        button2={{
          label: "Continuar",
          funcion: handleContinuar,
        }}
      />
      <AlertDialog
        abrir={openConfirmationDialog}
        onClose={() => {
          setOpenC(false);
        }}
        message={"¡Cambios guardados exitosamente!"}
        tipoAlerta="exito"
        button2={{
          label: "Continuar",
          funcion: () => {
            setOpenC(false);
          },
        }}
      />
    </BarraNavegacion>
  );
};
export default Perfil;
const paddingInferior = {
  marginBottom: "18px",
};
