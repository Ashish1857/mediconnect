import React, { createContext, useState, useContext, useEffect } from "react";
import { isRegisteredUser } from "../utils/api";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [areUserDetailsLoaded, setUserDetailsLoadedState] = useState(false);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    setUserDetailsLoadedState(() => false);
    console.log("in context api");
    let mobileNumber = localStorage.getItem("mobileNumber");
    if (mobileNumber) {
      isRegisteredUser(mobileNumber).then((data) => {
        setUserDetailsLoadedState(() => true);
        setUser(data);
      });
    }
    setUserDetailsLoadedState(() => true);
  }, []);
  return (
    <UserContext.Provider value={{ user, areUserDetailsLoaded }}>
      {children}
    </UserContext.Provider>
  );
};
