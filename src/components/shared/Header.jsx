import React, { useState } from "react";
import Navbar from "./NavBar";

const Tabs = [
  {
    title: "Book Consult",
    isActive: false,
  },
  {
    title: "Order Medicine",
    isActive: false,
  },
  {
    title: "Lab Test",
    isActive: false,
  },
  {
    title: "Contact Us",
    isActive: false,
  },
];

const Header = (props) => {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div>
      <Navbar Tabs={Tabs} />
    </div>
  );
};

export default Header;
