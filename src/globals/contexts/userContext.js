import { createContext, useEffect, useReducer } from "react";
import { usuarioInitializer, UsuarioReducer } from "../reducers/userReducer";

export const UserContext = createContext({});

export const UserProvider = (props) => {
  const { children, initialValue } = props;
  const [usuario, dispatch] = useReducer(
    UsuarioReducer,
    initialValue,
    usuarioInitializer
  );
  useEffect(() => {
    sessionStorage.setItem("usuario", JSON.stringify(usuario));
    console.log("Nuevo state", JSON.stringify(usuario));
  }, [usuario]);
  return (
    <UserContext.Provider value={[usuario, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
