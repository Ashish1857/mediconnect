import React, { useState } from "react";
import "react-phone-input-2/lib/style.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import BookReport from "./components/ConsultationsAndLabReports/BookReport";
import Consultations from "./components/ConsultationsAndLabReports/Consultations";
import LabReports from "./components/ConsultationsAndLabReports/LabReports";
import Doctors from "./components/Doctors";
import Home from "./components/home/Home";
import CheckoutPage from "./components/orderMedicine/CheckoutPage";
import { Order } from "./components/orderMedicine/Order";
import { OrderSuccess } from "./components/orderMedicine/OrderSuccess";
import { OrderWithoutPres } from "./components/orderMedicine/OrderWithoutPres";
import Payment from "./components/orderMedicine/PaymentPage";
import Product from "./components/orderMedicine/ProductDetailPage";
import LoginModal from "./components/registration/loginModal/LoginModal";
import Header from "./components/shared/Header";
import { UserProvider } from "./context/UserContext";
import { ContactUs } from "./components/reachout/Reachout";
import { HealthVault } from "./components/orderMedicine/HealthVault";

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
      <UserProvider>
        <div className="container">
          <div className="content">
            <Router>
              <Header handleShowLogin={handleShowLogin} />
              <LoginModal show={showLogin} onClose={handleCloseLogin} />
              <div className="contentscreens">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/consultations" element={<Consultations />} />
                  <Route path="/doctor/:doctorid" element={<Doctors />} />
                  <Route path="/labreports" element={<LabReports />} />
                  <Route path="/report/:reportid" element={<BookReport />} />
                  <Route path="/order" element={<Order />} />
                  <Route path="/medicine" element={<OrderWithoutPres />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/product" element={<Product />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/contactUs" element={<ContactUs />} />
                  <Route path="/orderSuccess" element={<OrderSuccess />} />
                  <Route path="/healthVault" element={<HealthVault />} />
                </Routes>
              </div>
            </Router>
          </div>
        </div>
      </UserProvider>
    </div>
  );
}

export default App;
