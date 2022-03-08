import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Historico from "../pages/Historico";
import Login from "../pages/Login";
import Transacciones from "../pages/Transacciones";
import Perfil from "../pages/Perfil";

import DefaultPage from "../pages/DefaultPage";

const MainRouter = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/transacciones" element={<Transacciones />} />
        <Route path="/historico" element={<Historico />} />
        <Route
          path="*"
          element={
            <DefaultPage/>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default MainRouter;
