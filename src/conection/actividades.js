import axios from "axios";

export const listarActividades = async (idUsuario) => {
  const response = await axios.get(
    `http://localhost:2800/actividad/${idUsuario}`
  );
  //console.log("Login=>", response);
  if (response && response.data) {
    return response.data;
  } else {
    return { ok: false, payload: [], message: "Error inesperado" };
  }
};
export const insertarActividadConTransacciones = async (body) => {
  try {
    const response = await axios.post(`http://localhost:2800/actividad`, body);
    //console.log("Login=>", response);
    if (response && response.data) {
      return response.data;
    } else {
      return { ok: false, payload: [], message: "Error inesperado" };
    }
  } catch (error) {
    return {
      ok: false,
      payload: [],
      message: "Error inesperado o de servidor",
    };
  }
};
export const editarActividad = async (idActividad, denominacion) => {
  try {
    const response = await axios.put(`http://localhost:2800/actividad`, {
      idActividad,
      denominacion,
    });
    //console.log("Login=>", response);
    if (response && response.data) {
      return response.data;
    } else {
      return { ok: false, payload: [], message: "Error inesperado" };
    }
  } catch (error) {
    return {
      ok: false,
      payload: [],
      message: "Error inesperado o de servidor",
    };
  }
};
export const eliminarActividad = async (idActividad) => {
  try {
    const response = await axios.delete(`http://localhost:2800/actividad`, {
      idActividad:idActividad,
    });
    //console.log("Login=>", response);
    if (response && response.data) {
      return response.data;
    } else {
      return { ok: false, payload: [], message: "Error inesperado" };
    }
  } catch (error) {
    return {
      ok: false,
      payload: [],
      message: "Error inesperado o de servidor",
    };
  }
};
