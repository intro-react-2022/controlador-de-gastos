import { Button, Divider, IconButton, Paper } from "@mui/material";
import { padding } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "./Transacciones.scss";




const transacciones = [
  { desc: "payment", monto: 100, esIngreso: true },
  { desc: "Flower", monto: 20, esIngreso: false },
  { desc: "salary", monto: 300, esIngreso: true },
  { desc: "Book", monto: 10, esIngreso: false },
  { desc: "Camera", monto: 10, esIngreso: true },
];
const Transacciones = (props) => {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  return (
    <React.Fragment>
      <div className="contenedor-transacciones">
        <div className="seccion-izquierda">
          <div className="seccion-cabecera">
            <h2>Historial de transacciones</h2>
            <Button variant="contained" onClick={handleClickOpen}>Nueva Transacción</Button>
          </div>
          <Paper
            elevation={3}
            style={{
              borderRadius: "18px",
              padding: "10px 15px",
              backgroundColor: "rgb(240, 247, 255)",
            }}
          >
            Aqui van las transacciones
            {transacciones.map(({ monto, esIngreso, desc }, index) => (
              <Paper
                key={index}
                elevation={4}
                style={{
                  margin: "10px 0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "0 10px",
                  minHeight: "40px",
                  borderRight: esIngreso ? "7px solid green" : "7px solid red",
                }}
              >
                <div>{desc}</div>
                <div>{`${esIngreso ? "+ $" + monto : "- $" + monto}`}</div>
              </Paper>
            ))}
          </Paper>
        </div>
        <div className="seccion-derecha">
          <div className="seccion-cabecera">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <SaveIcon />
            </IconButton>
          </div>
          <h2>Balance actual</h2>
          <Paper
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "25px 30px",
              padding: "15px 0",
            }}
          >
            <div className="balance-monto balance-ingreso">400.00</div>
            <Divider />
            <div className="balance-monto balance-egreso">50.00</div>
          </Paper>
          <Paper
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "25px 30px",
              padding: "15px 0",
            }}
          >
            <h3 className="total-label">Total ($)</h3>
            <div className="balance-monto balance-ingreso">350.00</div>
          </Paper>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
export default Transacciones;
