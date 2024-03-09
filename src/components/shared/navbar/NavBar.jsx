import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const { Tabs, handleShowLogin } = props;
  return (
    <header className="navbar">
      <div className="navbar-logo">
        <img src="/logo.png" alt="MediConnect Logo" />
        <h1>MediConnect</h1>
      </div>

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
        <button onClick={handleShowLogin}>Login</button>
      </div>
    </header>
  );
};

export default Navbar;
