import axios from "axios";

export const listarActividades=async(idUsuario)=>{
    const response = await axios.get(`http://localhost:2800/actividad/${idUsuario}`);
      //console.log("Login=>", response);
      if (response && response.data) {
        return response.data;
      } else {
        return { ok: false, payload: [], message: "Error inesperado" };
      }
}