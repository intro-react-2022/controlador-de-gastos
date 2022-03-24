import SearchIcon from "@mui/icons-material/Search";
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { Fragment, useContext, useEffect, useState } from "react";
import BarraNavegacion from "../componentes/BarraNavegacion/BarraNavegacion";
import SelectorFechas from "../componentes/SelectorFechas/SelectorFechas";
import TablaDatos from "../componentes/Tabla/TablaDatos";
import "./Historico.scss";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { eliminarActividad, listarActividades } from "../conection/actividades";
import AlertDialog from "../componentes/Dialogs/AlertDialog";
///editar dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button, Divider, Grid, Paper } from "@mui/material";
import { UserContext } from "../globals/contexts/userContext";
import { useNavigate } from "react-router";

const paddingInferior = {
  marginBottom: "18px",
  marginTop: "2px",
};

const Historico = (props) => {
  // const { usuario ,onLogout } = props;
  let navigate = useNavigate();
  const [usuarioContext, setUsuarioContext] = useContext(UserContext);
  useEffect(() => {
    if (!usuarioContext.idUsuario) {
      navigate("/");
    }
  }, []);
  const [actividades, setActividades] = useState([]);
  /// Fecha
  const [fechaNacimiento, setFechaNacimiento] = useState(null);

  const handleVerActividad = (row) => {};
  const handleEditarActividad = (row) => {};
  const handleEliminarActividad = (row) => {};
  const headers = [
    { header: "Descripción", name: "denominacion" },
    { header: "Fecha", name: "fecha" },
    { header: "Hora", name: "hora" },
    { header: "Monto ($)", name: "monto" },
    {
      header: "Acciones",
      name: "acciones",
      render: (row) => {
        return (
          <Stack direction="row" spacing={2}>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              style={{ color: "green" }}
              onClick={(e) => {
                handleVerActividad(row.idActividad);
              }}
            >
              <VisibilityIcon />
            </IconButton>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              style={{ color: "darkblue" }}
              onClick={(e) => {
                handleEditar(row.idActividad);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              style={{ color: "red" }}
              onClick={(e) => {
                console.log("delete",row);
                handleEliminar(row.idActividad);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];
  const handleChangeFechaNacimiento = (fechaActual) => {
    setFechaNacimiento(fechaActual);
  };
  const llamarDatos = async () => {
    const { ok, payload, message } = await listarActividades(
      usuarioContext.idUsuario
    );
    if (!ok) {
      alert(message);
    } else {
      setActividades(
        payload.map((p) => {
          return {
            ...p,
            fecha: new Date(p.fecha).toLocaleDateString(),
            hora: new Date(p.fecha).toLocaleTimeString(),
          };
        })
      );
    }
  };
  const [updateTimes, setUpdateTimes] = useState(0);
  useEffect(() => {
    llamarDatos();
  }, [updateTimes]);

  //alertas
  const [idActual, setIdActual] = useState(undefined);
  const [openAlert, setOpenAlert] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState("error");
  const [boton1, setBoton1] = useState(undefined);
  const [boton2, setBoton2] = useState(undefined);
  const handleContinuar = async (idActividad) => {
    setOpenAlert(false);
    const { ok, message, payload } = await eliminarActividad(idActividad);
    console.log("eleiminar", payload);

    if (ok) {
      setTipoAlerta("exito");
      setMensajeAlerta(message);
      setUpdateTimes(updateTimes + 1);
    } else {
      setTipoAlerta("error");
      setMensajeAlerta(message);
    }

    setBoton1(undefined);
    setBoton2({
      label: "Aceptar",
      funcion: () => {
        setOpenAlert(false);
      },
    });
    //setOpenAlert(true);
  };
  const handleEliminar = (idActividad) => {
    
    //setIdActual(idActual);
    setOpenAlert(true);
    setTipoAlerta("error");
    setMensajeAlerta("¿Esta seguro de eliminar el hitórico de actividades?");
    setBoton1({
      label: "Cancelar",
      funcion: () => {
        setOpenAlert(false);
      },
    });
    setBoton2({
      label: "Continuar",
      funcion: () => {
        handleContinuar(idActividad);
      },
    });
  };
  //editar
  const [descripcion, setDescripcion] = useState("");
  const [openEditar, setOpenEditar] = useState(false);
  const handleChangeDescripcion = (e) => {
    setDescripcion(e.target.value);
  };
  const handleCloseEditar = () => {
    setOpenEditar(false);
  };
  const handleEditar = () => {
    setOpenEditar(true);
  };
  const handleOnGuardarEditar = () => {
    handleCloseEditar();
    //handleOnSuccess();
  };
  return (
    <Fragment>
      {usuarioContext.idUsuario && (
        <Fragment>
          <BarraNavegacion
            //onCerarSesion={handleOnLogout}
            //onCambioDeVista={handleCambiarDeVista}
            titulo={"Controlador de gastos AEDITIP / Historico"}
            onLogout={() => {
              setUsuarioContext({
                type: "LOGOUT",
              });
            }}
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
          <AlertDialog
            abrir={openAlert}
            onClose={() => {
              setOpenAlert(false);
              setIdActual(undefined);
            }}
            message={mensajeAlerta}
            tipoAlerta={tipoAlerta}
            button1={boton1}
            button2={boton2}
          />
          <Dialog
            open={openEditar}
            onClose={handleCloseEditar}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Editar histórico"}
            </DialogTitle>
            <DialogContent>
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="stretch"
              >
                <FormLabel id="demo-radio-buttons-group-label">
                  Fecha y hora
                </FormLabel>
                <SelectorFechas
                  style={marginIzquierda}
                  label="Fecha"
                  size="small"
                  value={new Date()}
                  disabled
                />
                <FormLabel id="demo-radio-buttons-group-label">Monto</FormLabel>
                <TextField
                  style={paddingInferior}
                  required
                  id="outlined-required"
                  size="small"
                  //label="Denominación de la transacción"
                  value={""}
                  disabled
                />
                <FormLabel id="demo-radio-buttons-group-label">
                  Descripción
                </FormLabel>
                <TextField
                  style={paddingInferior}
                  required
                  id="outlined-required"
                  size="small"
                  onChange={handleChangeDescripcion}
                  multiline
                  rows={4}
                />
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEditar} variant="contained">
                Cancelar
              </Button>
              <Button
                onClick={handleOnGuardarEditar}
                autoFocus
                variant="contained"
                color="secondary"
              >
                Guardar
              </Button>
            </DialogActions>
          </Dialog>
        </Fragment>
      )}
    </Fragment>
  );
};
const marginIzquierda = {
  marginLeft: "15px",
};
export default Historico;
