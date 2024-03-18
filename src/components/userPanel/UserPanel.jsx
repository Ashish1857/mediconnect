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

const UserPanel = ({ isOpen, onClose, userName }) => {
  if (!isOpen) {
    return null;
  }
  const handleMyProfile = () => {
    console.log("Navigating to My Profile");
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
            <ListItem button onClick={handleMyProfile}>
              <ListItemIcon>
                <AccountCircleIcon color="action" />
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItem>
            <ListItem button onClick={handleSavedAddresses}>
              <ListItemIcon>
                <HomeIcon color="action" />
              </ListItemIcon>
              <ListItemText primary="Saved Addresses" />
            </ListItem>
            <Divider />
            <ListItem button onClick={handleLogout}>
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
