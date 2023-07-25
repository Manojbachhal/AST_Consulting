import React, { useState, createContext } from "react";

export const myContext = createContext();

function Contextapi({ children }) {
  const [islogin, setLogin] = useState(false);
  return (
    <myContext.Provider value={{ islogin, setLogin }}>
      {children}
    </myContext.Provider>
  );
}

export default Contextapi;
