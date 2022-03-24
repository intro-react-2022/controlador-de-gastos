import axios from "axios";

const usuarios_DB = [
  {
    nombre: "Helena Grisky",
    correo: "griskyh@gmail.com",
    contrasenia: "1234",
    imagen: "https://randomuser.me/api/portraits/med/women/28.jpg",
  },
  {
    nombre: "Josué Laque",
    correo: "josue@aeditip.com",
    contrasenia: "1234",
    imagen: "https://randomuser.me/api/portraits/med/men/23.jpg",
  },
  {
    nombre: "Jorge Fatama",
    correo: "jorge@aeditip.com",
    contrasenia: "1234",
    imagen: "https://randomuser.me/api/portraits/med/men/30.jpg",
  },
  // { nombre: "Jorge Fatama", correo: "jorge@aeditip.com", contrasenia: "1234",  imagen: "https://randomuser.me/api/portraits/med/men/6.jpg" },
];

export const iniciarSesion = (correo, contrasenia) => {
  const ocurrenciasUsuario = usuarios_DB.filter((x) => {
    return x.correo === correo;
  });
  if (ocurrenciasUsuario.length > 0) {
    if (ocurrenciasUsuario.length > 1) {
      return {
        ok: false,
        payload: {},
        message:
          "Ocurrió un error en la Base de Datos. Contact al administrador",
      };
    } else {
      //caso ideal, una sola ocurrencia
      const usuarioEncontrado = ocurrenciasUsuario[0];
      if (usuarioEncontrado.contrasenia === contrasenia) {
        return {
          ok: true,
          payload: { ...usuarioEncontrado },
          message: "Inicio desesión exitoso",
        };
      } else {
        //contraseña incorrecta
        return {
          ok: false,
          payload: {},
          message: "Contraseña incorrecta",
        };
      }
    }
  } else {
    return {
      ok: false,
      payload: {},
      message: "El correo ingresado es incorrecto",
    };
  }
};

export const iniciarSesionBackend = async (correo, contrasenia) => {
  const body = {
    correo: correo,
    contrasenia: contrasenia,
  };
  try {
    const response = await axios.post(
      "http://localhost:2800/usuario/auth",
      body
    );
    //console.log("Login=>", response);
    if (response && response.data) {
      return response.data;
    } else {
      return { ok: false, payload: {}, message: "Error inesperado" };
    }
  } catch (error) {
    console.error("login error: ", error);
    return { ok: false, payload: {}, message: "Error en servidor" };
  }
};
