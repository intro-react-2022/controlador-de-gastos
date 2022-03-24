export const UsuarioReducer = (state, action) => {
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

  export const usuarioInitializer = () => {
    const usuarioEncontrado = sessionStorage.getItem("usuario");
    console.log("usuario antes del parse", usuarioEncontrado);
    if (usuarioEncontrado !== "undefined") {
      return JSON.parse(usuarioEncontrado);
    } else {
      return {};
    }
  };