import "./App.css";
import Home from "./components/home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import Header from "./components/shared/Header";
import React, { useState } from "react";
import LoginModal from "./components/registration/loginModal/LoginModal";
import Consultations from "./components/ConsultationsAndLabReports/Consultations";
import Doctors from "./components/Doctors";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const handleShowLogin = () => {
    document.body.style.position = "fixed";
    document.body.style.top = `-${window.scrollY}px`;
    document.body.classList.add("body-no-scroll");

    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    const scrollY = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.classList.remove("body-no-scroll");
    window.scrollTo(0, parseInt(scrollY || "0") * -1);

    setShowLogin(false);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="content">
          <LoginModal show={showLogin} onClose={handleCloseLogin} />
          <Router>
            <Header handleShowLogin={handleShowLogin} />
            <div className="contentscreens">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/consultations" element={<Consultations />} />
                <Route path="/doctor/:doctorid" element={<Doctors />} />
              </Routes>
            </div>
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
