import React from "react";
import "./PageWrapper.scss";
const PageWrapper = (props) => {
  const { children } = props;
  return <div className="contenedor-principal">{children}</div>;
};
export default PageWrapper;
