import {
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import { padding } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import * as React from "react";
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
import "./Transacciones.scss";
import BarraNavegacion from "../componentes/BarraNavegacion/BarraNavegacion";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { UserContext } from "../globals/contexts/userContext";
import { useNavigate } from "react-router";
import FilePresentIcon from "@mui/icons-material/FilePresent";
import ImportarDialog from "../componentes/Dialogs/ImportarDialog";
import NuevoHistoricoDialog from "../componentes/Dialogs/NuevoHistoricoDialog";
import { insertarActividadConTransacciones } from "../conection/actividades";
const paddingInferior = {
  marginBottom: "18px",
  marginTop: "2px",
};
const transaccionesEjemplo = [
  { id: 10, descripcion: "payment", monto: 100, esIngreso: true },
  { id: 11, descripcion: "Flower", monto: 20, esIngreso: false },
  { id: 12, descripcion: "salary", monto: 300, esIngreso: true },
  { id: 13, descripcion: "Book", monto: 10, esIngreso: false },
  { id: 14, descripcion: "Camera", monto: 10, esIngreso: true },
];
const Transacciones = (props) => {
  // const { onLogout } = props;
  let navigate = useNavigate();
  const [usuarioContext, setUsuarioContext] = React.useContext(UserContext);
  React.useEffect(() => {
    if (!usuarioContext.idUsuario) {
      navigate("/");
    }
  }, []);

  const [currentId, setCurrentId] = React.useState(0);
  const [transacciones, setTransacciones] = React.useState([]);

  //dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // states del formulario en dialog
  const [descripcion, setDescripcion] = React.useState("");
  const [cantidad, setCantidad] = React.useState(0);
  const handleEliminar = (evt, idTransaccion) => {
    console.log("ID", idTransaccion);
    setTransacciones(
      transacciones.filter((transaccion) => transaccion.id !== idTransaccion)
    );
  };
  const handleGuardar = () => {
    const nuevoId = currentId + 1;
    const nuevoItem = {
      id: nuevoId,
      descripcion: descripcion,
      monto: +cantidad,
      esIngreso: tipoTransaccion === "Ingreso",
    };
    setCurrentId(nuevoId);
    setTransacciones([nuevoItem, ...transacciones]);
    setOpen(false);
    setDescripcion("");
    setCantidad(0);
    setTipoTransaccion("Egreso");
  };
  //radios
  const [tipoTransaccion, setTipoTransaccion] = React.useState("Egreso");
  const handleChangeTipoTransaccion = (event, value) => {
    //alert(value);
    setTipoTransaccion(value);
  };
  const handleChangeDescripcion = (event) => {
    setDescripcion(event.target.value);
  };
  const handleChangeCantidad = (e) => {
    setCantidad(e.target.value);
  };
  //states de totales
  const [totalIngreso, setTotalIngreso] = React.useState(0);
  const [totalEgreso, setTotalEgreso] = React.useState(0);
  const [balanceTotal, setBalanceTotal] = React.useState(0);
  //const [currentId, setCurrentId] = React.useState(0);
  React.useEffect(() => {
    console.log("transacciones", transacciones);
    const totIn = transacciones
      .filter((x) => x.esIngreso)
      .reduce((acum, curr) => {
        acum += curr.monto;

        return acum;
      }, 0);
    const totEg = transacciones
      .filter((x) => !x.esIngreso)
      .reduce((acum, curr) => {
        acum += curr.monto;
        return acum;
      }, 0);
    setTotalIngreso(totIn);
    setTotalEgreso(totEg);
  }, [transacciones]);
  React.useEffect(() => {
    setBalanceTotal(totalIngreso - totalEgreso);
  }, [totalIngreso, totalEgreso]);

  const [openImport, setOpenImport] = React.useState(false);
  const [openCrearHistorico, setOpenCrearHistorico] = React.useState(false);
  const handleSaveImportar = (valorFinal) => {
    //// aciones
    //opcional validaciones
    if (typeof valorFinal !== "undefined") {
      let newID = currentId;
      const transaccionesConId = valorFinal.map((x) => {
        newID++;
        return { ...x, id: newID };
      });
      setCurrentId(newID);
      const nuevasTransacciones = [...transacciones, ...transaccionesConId];
      console.log("nuevas transacciones", nuevasTransacciones);
      setTransacciones(nuevasTransacciones);
    } else {
      console.log("Hubo un error");
    }
    handleCloseImportar();
  };
  const handleOpenImportar = () => {
    console.log("open");
    setOpenImport(true);
  };
  const handleCloseImportar = () => {
    setOpenImport(false);
  };
  const handleSaveHistorico = async (descripcion) => {
    console.log("historico", descripcion);
    setOpenCrearHistorico(false);
    //guardar las transacciones con el nombre del historico
    const body = {
      idUsuario: usuarioContext.idUsuario,
      denominacion: descripcion,
      monto: balanceTotal,
      transacciones: transacciones,
    };
    const { ok, message, payload } = await insertarActividadConTransacciones(
      body
    );
    console.log("payload", payload);
    if (ok) {
      navigate("/historico");
    } else {
      alert(message);
    }
    //ir a historico
  };
  const deleteAllTransactions = () => {
    setTransacciones([]);
  };
  return (
    <React.Fragment>
      {usuarioContext.idUsuario && (
        <React.Fragment>
          <BarraNavegacion
            //onCerarSesion={handleOnLogout}
            //onCambioDeVista={handleCambiarDeVista}
            titulo={"Controlador de gastos AEDITIP / Transacciones"}
            onLogout={() => {
              setUsuarioContext({
                type: "LOGOUT",
              });
            }}
          >
            <div className="contenedor-transacciones">
              <div className="seccion-izquierda">
                <div className="seccion-cabecera">
                  <h2>Historial de transacciones</h2>
                  <Button
                    startIcon={<FilePresentIcon />}
                    variant="contained"
                    onClick={handleOpenImportar}
                    size="small"
                  >
                    Importar
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleClickOpen}
                    size="small"
                  >
                    Nueva Transacción
                  </Button>
                </div>
                <Paper
                  elevation={3}
                  style={{
                    borderRadius: "18px",
                    padding: "10px 15px",
                    backgroundColor: "rgb(240, 247, 255)",
                    minHeight: "60vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent:
                      transacciones.length === 0 ? "center" : "flex-start",
                    width: "100%",
                  }}
                >
                  {transacciones.length === 0 && <p>Aún no hay registros</p>}
                  {transacciones.map(
                    ({ id, monto, esIngreso, descripcion }, index) => (
                      <Paper
                        key={index}
                        elevation={4}
                        style={{
                          width: "100%",
                          margin: "10px 0",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "0 10px",
                          minHeight: "40px",
                          borderRight: esIngreso
                            ? "7px solid green"
                            : "7px solid red",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            right: "-15px",
                            top: "-13px",
                            cursor: "pointer",
                          }}
                          onClick={(evt) => {
                            handleEliminar(evt, id);
                          }}
                        >
                          <RemoveCircleIcon color="error" />
                        </div>
                        <div>{descripcion}</div>
                        <div>{`${
                          esIngreso ? "+ $" + monto : "- $" + monto
                        }`}</div>
                      </Paper>
                    )
                  )}
                </Paper>
              </div>
              <div className="seccion-derecha">
                <div className="seccion-cabecera">
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={deleteAllTransactions}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => {
                      setOpenCrearHistorico(true);
                    }}
                  >
                    <SaveIcon />
                  </IconButton>
                </div>
                <h2 className="seccion-derecha-titulo">Balance actual</h2>
                <Paper style={styles.contSecDerechaMonto}>
                  <div className="balance-monto balance-ingreso">
                    {totalIngreso}
                  </div>
                  <Divider style={{ width: "80%" }} />
                  <div className="balance-monto balance-egreso">
                    {totalEgreso}
                  </div>
                </Paper>
                <Paper style={styles.contSecDerechaMonto}>
                  <h3 className="total-label">Total ($)</h3>
                  <div
                    className={`balance-monto ${
                      balanceTotal >= 0 ? "balance-ingreso" : "balance-egreso"
                    }`}
                  >
                    {balanceTotal}
                  </div>
                </Paper>
              </div>
            </div>
          </BarraNavegacion>
          <ImportarDialog
            open={openImport}
            onSave={handleSaveImportar}
            onClose={handleCloseImportar}
          />
          {/** Dialog nombre del historico */}
          <NuevoHistoricoDialog
            open={openCrearHistorico}
            onSave={handleSaveHistorico}
            onClose={() => {
              setOpenCrearHistorico(false);
            }}
          />
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Nueva transacción"}
            </DialogTitle>
            <DialogContent>
              {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText> */}
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="stretch"
              >
                <FormLabel id="demo-radio-buttons-group-label">
                  Descripción
                </FormLabel>
                <TextField
                  style={paddingInferior}
                  required
                  id="outlined-required"
                  size="small"
                  //label="Denominación de la transacción"
                  value={descripcion}
                  onChange={handleChangeDescripcion}
                />
                <FormLabel id="demo-radio-buttons-group-label">Monto</FormLabel>
                <TextField
                  style={paddingInferior}
                  required
                  id="outlined-required"
                  size="small"
                  //label="Monto"
                  value={cantidad}
                  onChange={handleChangeCantidad}
                />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Tipo de Transaccion
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    onChange={handleChangeTipoTransaccion}
                    value={tipoTransaccion}
                  >
                    <FormControlLabel
                      value="Egreso"
                      control={<Radio />}
                      label="Egreso"
                    />{" "}
                    <FormControlLabel
                      value="Ingreso"
                      control={<Radio />}
                      label="Ingreso"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} variant="contained">
                Cancelar
              </Button>
              <Button
                onClick={handleGuardar}
                autoFocus
                variant="contained"
                color="secondary"
              >
                Guardar
              </Button>
            </DialogActions>
          </Dialog>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
export default Transacciones;
const styles = {
  contSecDerechaMonto: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "25px 30px",
    padding: "15px 0",
    borderRadius: "16px",
  },
};
