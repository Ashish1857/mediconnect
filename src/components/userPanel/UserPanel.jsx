import React from "react";
import "./UserPanel.css";
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from "@mui/icons-material/Home";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import CloseIcon from "@mui/icons-material/Close";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { Link, useNavigate } from "react-router-dom";

const UserPanel = ({ isOpen, onClose, userName }) => {
  const navigate = useNavigate();

  if (!isOpen) {
    return null;
  }
  const handleMyProfile = () => {
    navigate("/profile");
  };

  const handleSavedAddresses = () => {
    console.log("Navigating to Saved Addresses");
  };

  const handleLogout = () => {
    localStorage.removeItem("mobileNumber");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="user-panel-backdrop">
      <div className="user-panel">
        <IconButton onClick={onClose} className="close-user-panel">
          <CloseIcon />
        </IconButton>
        <div className="user-panel-content">
          <List component="nav">
            <ListItem button={true} onClick={handleMyProfile}>
              <ListItemIcon>
                <AccountCircleIcon color="action" />
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItem>
            <ListItem button={true} onClick={handleSavedAddresses}>
              <ListItemIcon>
                <HomeIcon color="action" />
              </ListItemIcon>
              <ListItemText primary="Saved Addresses" />
            </ListItem>
            <ListItem button={true} component={Link} to="/healthVault">
              <ListItemIcon>
                <LocalHospitalIcon color="action" />
              </ListItemIcon>
              <ListItemText primary="Health Vault" />
            </ListItem>
            <Divider />
            <ListItem button={true} onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppIcon color="action" />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;
