import { Button, Paper, TextField } from "@mui/material";
import React from "react";
import PageWrapper from "../componentes/PageWrapper/PageWrapper";

const paddingInferior = {
  marginBottom: "18px",
  //backgroundColor:"#FFA450"
};

const Login = (props) => {
  const { onLogin } = props;
  const handleClick = () => {
    //alert("Inicio de sesión exitoso!");
    // const response = server.login("usuario", "password")
    //if (response) onLogin(); else{ alert("error")}

    if (onLogin) {
      onLogin();
    }
  };
  const handleRecuperarContrasenia = () => {
    alert("Se ha enviado intrucciones al correo indicado");
  };

  return (
    <PageWrapper>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <Paper
          elevation={3}
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "40px 30px",
            //minHeight: "40vh",
            borderRadius: "16px",
            width: "300px",
          }}
        >
          <h3 style={paddingInferior}>{"Bienvenido(a)"}</h3>
          <TextField
            style={paddingInferior}
            required
            id="outlined-required"
            label="Usuario"
            //defaultValue="Hello World"
          />
          <TextField
            style={paddingInferior}
            required
            id="outlined-required"
            label="Contraseña"
            defaultValue=""
            type="password"
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <a
              href="#"
              style={paddingInferior}
              onClick={handleRecuperarContrasenia}
            >
              Recuperar contraseña
            </a>
          </div>

          <Button variant="contained" onClick={handleClick}>
            Iniciar sesión
          </Button>
        </Paper>
      </div>
    </PageWrapper>
  );
};
export default Login;
