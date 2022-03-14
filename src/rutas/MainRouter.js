import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Historico from "../pages/Historico";
import Login from "../pages/Login";
import Transacciones from "../pages/Transacciones";
import Perfil from "../pages/Perfil";

import DefaultPage from "../pages/DefaultPage";

const MainRouter = (props) => {
  const [usuarioLogueado,setUsuarioLogueado]=useState({});
  const hangleGetUsuario=(usuario)=>{
    setUsuarioLogueado(usuario);
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login onLogin={hangleGetUsuario}/>} />
        <Route path="/perfil" element={<Perfil usuario={usuarioLogueado}/>} />
        <Route path="/transacciones" element={<Transacciones usuario={usuarioLogueado}/>} />
        <Route path="/historico" element={<Historico usuario={usuarioLogueado}/>} />
        <Route path="*" element={<DefaultPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default MainRouter;
