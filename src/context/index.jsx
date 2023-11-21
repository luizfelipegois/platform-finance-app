import { createContext, useState } from "react";

export const Context = createContext({});

export const Provider = ({ children }) => {
  const [tokenAuthentication, setTokenAuthentication] = useState(null);
  const values = {
    tokenAuthentication
  };

  return (
    <Context.Provider value={values}>
      {children}
    </Context.Provider>
  )
};
