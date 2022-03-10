import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

//Icons
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialog = (props) => {
  /// const [open, setOpen] = React.useState(false);
  const { abrir, onClose, tituloAlert, message, button1, button2, tipoAlerta } =
    props;

  const handleClose = () => {
    onClose?.();
  };
  const handdleClickButton1 = () => {
    button1.funcion?.();
  };
  const handdleClickButton2 = () => {
    button2.funcion?.();
  };
  return (
    <Dialog
      open={abrir}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      {tituloAlert && <DialogTitle>{tituloAlert}</DialogTitle>}
      <DialogContent>
        <div
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {tipoAlerta === "error" ? (
            <HighlightOffIcon
              color="error"
              // fontSize="large"
              style={{ fontSize: "55px" }}
            />
          ) : (
            <React.Fragment>
              {tipoAlerta === "exito" ? (
                <CheckCircleOutlineIcon
                  color="success"
                  // fontSize="large"
                  style={{ fontSize: "55px" }}
                />
              ) : (
                <WarningAmberIcon
                  color="warning"
                  // fontSize="large"
                  style={{ fontSize: "55px" }}
                />
              )}
            </React.Fragment>
          )}
          <DialogContentText id="alert-dialog-slide-description">
            {message || "Mensaje"}
          </DialogContentText>
        </div>
      </DialogContent>
      <DialogActions>
        {button1 && (
          <Button variant="outlined" onClick={handdleClickButton1}>
            {button1.label}
          </Button>
        )}
        {button2 && (
          <Button variant="contained" onClick={handdleClickButton2}>
            {button2.label}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
export default AlertDialog;
