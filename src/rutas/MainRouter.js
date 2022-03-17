import React, { useEffect, useReducer, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Historico from "../pages/Historico";
import Login from "../pages/Login";
import Transacciones from "../pages/Transacciones";
import Perfil from "../pages/Perfil";

import DefaultPage from "../pages/DefaultPage";
const UsuarioReducer = (state, action) => {
  /* console.log("UsuarioReducer state", state);
  console.log("UsuarioReducer action", action); */
  const { type, payload } = action;
  switch (type) {
    case "LOGIN":
      return { ...state, ...payload };
    case "LOGOUT":
      return {};
    default:
      return state;
  }
};
const initializer = () => {
  const usuarioEncontrado = sessionStorage.getItem("usuario");
  console.log("usuario antes del parse", usuarioEncontrado);
  if (usuarioEncontrado !== "undefined") {
    return JSON.parse(usuarioEncontrado);
  } else {
    return {};
  }
};
const MainRouter = (props) => {
  const [state, dispatch] = useReducer(UsuarioReducer, {}, initializer);

  useEffect(() => {
    sessionStorage.setItem("usuario", JSON.stringify(state));

    console.log("Nuevo state", JSON.stringify(state));
  }, [state]);

  const [usuarioLogueado, setUsuarioLogueado] = useState({
    nombres: "Jin",
    apellidos: "Serrano",
  });
  const hangleGetUsuario = (usuario) => {
    setUsuarioLogueado(usuario);
    dispatch({
      type: "LOGIN",
      payload: usuario,
    });
  };
  const handleLogOut = () => {
    dispatch({
      type: "LOGOUT",
    });
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login onLogin={hangleGetUsuario} />} />
        <Route
          path="/perfil"
          element={<Perfil usuario={state} onLogout={handleLogOut} />}
        />
        <Route
          path="/transacciones"
          element={<Transacciones usuario={state} onLogout={handleLogOut} />}
        />
        <Route
          path="/historico"
          element={<Historico usuario={state} onLogout={handleLogOut} />}
        />
        <Route path="*" element={<DefaultPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default MainRouter;
