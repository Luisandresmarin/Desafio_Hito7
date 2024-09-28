import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState({ username: "" , password: "", token: false});
  const logOut = () => {setAuthUser({ username: "", password: "", token: false}); navigate("/");}

  return (
    <GlobalContext.Provider value={{ authUser, setAuthUser, logOut }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;