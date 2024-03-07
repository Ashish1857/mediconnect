import "./App.css";
import Home from "./components/home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "react-phone-input-2/lib/style.css";
import Header from "./components/shared/Header";
import React, { useState } from "react";
import LoginModal from "./components/registration/loginModal/LoginModal";
import {Order} from "./components/orderMedicine/Order";
import {OrderWithPres} from "./components/orderMedicine/OrderWithPres";
import {OrderWithoutPres} from "./components/orderMedicine/OrderWithoutPres";
import CheckoutPage from './components/orderMedicine/CheckoutPage';
import Product from './components/orderMedicine/ProductDetailPage';
import Payment from './components/orderMedicine/PaymentPage';

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

          <Router>
          <Header handleShowLogin={handleShowLogin} />
          <LoginModal show={showLogin} onClose={handleCloseLogin} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/order" element={<Order />} />
              <Route path="/orderWithPres" element={<OrderWithPres />} />
              <Route path="/orderWithoutPres" element={<OrderWithoutPres/>} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/product" element={<Product />} />
              <Route path="/payment" element={<Payment />} />
            </Routes>
            
          </Router>
        </div>
      </div>
    </div>
  );
}

export default App;
