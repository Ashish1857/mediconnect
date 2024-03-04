import React, { useState } from "react";
import Navbar from "./navbar/NavBar";

const Tabs = [
  {
    title: "Book Consult",
    isActive: false,
    path: "/consultations",
  },
  {
    title: "Order Medicine",
    isActive: false,
    path: "/order",
  },
  {
    title: "Lab Test",
    isActive: false,
    path: "/labreports",
  },
  {
    title: "Contact Us",
    isActive: false,
    path: "#",
  },
];

const Header = (props) => {
  const { handleShowLogin } = props;
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div>
      <Navbar Tabs={Tabs} handleShowLogin={handleShowLogin} />
    </div>
  );
};

export default Header;
