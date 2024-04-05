import React, { useState } from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useUser } from "../../../context/UserContext";
import { Avatar, Badge } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from "../../orderMedicine/CartContext"; 
import UserPanel from "../../userPanel/UserPanel";

const Navbar = (props) => {
  const { tabs, handleShowLogin, setTabs } = props;
  const [isUserPanelOpen, setIsUserPanelOpen] = useState(false);
  const { user } = useUser();
  const { cartItems } = useCart(); 

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);


  const toggleUserPanel = () => {
    setIsUserPanelOpen(!isUserPanelOpen);
  };

  return (
    <header className="navbar">
      <Link to="/" style={{ textDecoration: "none" }} onClick={() => {
          let newTabs = tabs.map((tabdata) => {
            tabdata.isActive = false;
            return tabdata;
          });
          setTabs(newTabs);
        }}>
        <div className="navbar-logo">
          <img src="/logo.png" alt="MediConnect Logo" />
          <h1>MediConnect</h1>
        </div>
      </Link>

      <nav className="navbar-navigation">
        <ul>
          {Array.isArray(tabs) && tabs.map((tab) => (
            <li key={tab.title} className={tab.isActive ? "active" : ""}>
              <Link to={tab.path} onClick={() => {
                let newTabs = tabs.map((tabdata) => {
                  if (tabdata.title === tab.title) {
                    tabdata.isActive = true;
                  } else {
                    tabdata.isActive = false;
                  }
                  return tabdata;
                });
                setTabs(newTabs);
              }}>
                {tab.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      
      <div className="navbar-cart">
        <Link to="/checkout">
          <Badge
            badgeContent={totalItems}
            color="primary"
            sx={{ "& .MuiBadge-badge": { backgroundColor: "#1976d2" } }} 
          >
            <ShoppingCartIcon sx={{ color: "black" }} /> 
          </Badge>
        </Link>
      </div>

      <div className="navbar-login">
        {user ? (
          <div className="user-name-wrapper" onClick={toggleUserPanel}>
            <div className="user-name">
              {user.firstName}, {user.lastName}
            </div>
            <Avatar />
          </div>
        ) : (
          <button onClick={handleShowLogin}>Login</button>
        )}
      </div>
      <UserPanel
        isOpen={isUserPanelOpen}
        onClose={() => setIsUserPanelOpen(false)}
        userName={"Ashish"} // Replace with actual logic to get the user's name
      />
    </header>
  );
};

export default Navbar;
