import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import { Avatar } from "@mui/material";

const Navbar = (props) => {
  const { Tabs, handleShowLogin } = props;
  const { user } = useUser();
  return (
    <header className="navbar">
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="navbar-logo">
          <img src="/logo.png" alt="MediConnect Logo" />
          <h1>MediConnect</h1>
        </div>
      </Link>

      <nav className="navbar-navigation">
        <ul>
          {Tabs.map((tab) => (
            <li key={tab.title}>
              <Link to={tab.path}>{tab.title}</Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="navbar-login">
        {user ? (
          <>
            <div className="user-name">
              {user.firstName}, {user.lastName}
            </div>
            <Avatar />
          </>
        ) : (
          <button onClick={handleShowLogin}>Login</button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
