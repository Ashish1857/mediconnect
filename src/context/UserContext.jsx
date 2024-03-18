import React, { createContext, useState, useContext, useEffect } from "react";
import { isRegisteredUser } from "../utils/api";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    console.log("in context api");
    let mobileNumber = localStorage.getItem("mobileNumber");
    if (mobileNumber) {
      isRegisteredUser(mobileNumber).then((data) => {
        setUser(data);
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};
