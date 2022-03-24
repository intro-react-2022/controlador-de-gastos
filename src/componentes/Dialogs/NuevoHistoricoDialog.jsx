import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  TextField,
} from "@mui/material";
import * as React from "react";

const NuevoHistoricoDialog = (props) => {
  const { open, onClose, onSave } = props;
  const [descripcion, setDescripcion] = React.useState("");
  const handleClose = () => {
    onClose?.();
  };
  const handleSave = () => {
    onSave?.(descripcion);
  };
  const handleDescripcion = (e) => {
    setDescripcion(e.target.value);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Nueva transacción"}</DialogTitle>
      <DialogContent>
        <FormLabel id="demo-radio-buttons-group-label">
          Ingrese una descripción para guardar
        </FormLabel>
        <br />
        <TextField
          style={undefined}
          required
          id="outlined-required"
          label="Descripcion"
          //defaultValue="Hello World"
          onChange={handleDescripcion}
          value={descripcion}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined" color="secondary">
          Cancelar
        </Button>
        <Button
          onClick={handleSave}
          autoFocus
          variant="contained"
          color="secondary"
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default NuevoHistoricoDialog;
