import { Button, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import PageWrapper from "../componentes/PageWrapper/PageWrapper";
import { iniciarSesion } from "../conection/auth";

const paddingInferior = {
  marginBottom: "18px",
  //backgroundColor:"#FFA450"
};

const Login = (props) => {
  //const { onLogin } = props;
  let navigate = useNavigate();

  const [credenciales, setCredenciales] = useState({});
  const handleClickIniciarSesion = () => {
    //alert("Inicio de sesión exitoso!");
    // const response = server.login("usuario", "password")
    //if (response) onLogin(); else{ alert("error")}
    const { ok, payload, message } = iniciarSesion(
      credenciales.correo,
      credenciales.contrasenia
    );
    console.log("Usuario", payload);
    if (ok) {
      // aqui se ejecuta
      navigate("/perfil");
    } else {
      alert(message);
    }
  };
  const handleRecuperarContrasenia = () => {
    alert("Se ha enviado intrucciones al correo indicado");
  };

  const handleCorreo = (e) => {
    setCredenciales({ ...credenciales, correo: e.target.value });
  };
  const handleContrasenia = (e) => {
    setCredenciales({ ...credenciales, contrasenia: e.target.value });
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
            onChange={handleCorreo}
          />
          <TextField
            style={paddingInferior}
            required
            id="outlined-required"
            label="Contraseña"
            defaultValue=""
            type="password"
            onChange={handleContrasenia}
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

          <Button variant="contained" onClick={handleClickIniciarSesion}>
            Iniciar sesión
          </Button>
        </Paper>
      </div>
    </PageWrapper>
  );
};
export default Login;
