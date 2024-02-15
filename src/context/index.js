import React from "react";
import { SiteContextProvider } from "./site";

const GlobalContext = ({ children }) => {
  return (
    <>
      <SiteContextProvider>{children}</SiteContextProvider>;
    </>
  );
};

export default GlobalContext;