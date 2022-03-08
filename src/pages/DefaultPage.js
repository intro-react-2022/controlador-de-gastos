import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";
const DefaultPage = (props) => {
  let navigator = useNavigate();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <p>Ups, no hay nada por aquí</p>
      <Button color="secondary" variant="contained" onClick={() => {navigator("/")}}>
        Regresar al home
      </Button>
    </div>
  );
};
export default DefaultPage;
