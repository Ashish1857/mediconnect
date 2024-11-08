import React, { useState } from "react";
import Navbar from "./navbar/NavBar";

const Tabs = [
  {
    title: "Consult",
    isActive: false,
    path: "/consultations",
  },
  {
    title: "Medicine",
    isActive: false,
    path: "/medicine",
  },
  {
    title: "Lab Test",
    isActive: false,
    path: "/labreports",
  },
  {
    title: "Contact Us",
    isActive: false,
    path: "/contactUs",
  },
];

const Header = (props) => {
  const { handleShowLogin } = props;

  const [tabs, setTabs] = useState(Tabs);

  return (
    <div>
      <Navbar tabs={tabs} setTabs={setTabs} handleShowLogin={handleShowLogin} />
    </div>
  );
};

export default Header;
