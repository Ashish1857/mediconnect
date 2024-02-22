import React, { useEffect, useState } from "react";
import Header from "../shared/Header";
import "./Home.css";
import FAQ from "../FAQ/FAQ";
import LoginModal from "../registration/loginModal/LoginModal";
import Carousel from "react-material-ui-carousel";

const services = [
  {
    title: "Book Consult",
    description: "Connect with top medical professionals for consultations.",
    img: "/bookConsult.jpeg",
  },
  {
    title: "Order Medicine",
    description: "Get your Medicines delivered to your doorstep.",
    img: "/order-medicine.png",
  },
  {
    title: "Lab Test",
    description: "Book lab tests and get results online quickly.",
    img: "/lab-test.png",
  },
  {
    title: "Track Health",
    description: "Save your health data to track your BMI.",
    img: "/lab-test.png",
  },

  {
    title: "Health Vault",
    description: "Access your all prescriptions and orders.",
    img: "/lab-test.png",
  },
];

const Home = () => {
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

  const reduceRecipes = (acc, cur, index) => {
    const groupIndex = Math.floor(index / 3);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(cur);
    return acc;
  };

  const reducedServices = services.reduce(reduceRecipes, []);

  const printItems = () => {
    reducedServices.map((item) =>
      item.map((item2, index) => console.log(item2, index))
    );
  };

  return (
    <div className="home-container">
      <Header handleShowLogin={handleShowLogin} />

      <LoginModal show={showLogin} onClose={handleCloseLogin} />

      {/* Welcome Section */}
      <section className="welcome-section">
        <h1 aria-label="Welcome Note">Welcome to MediConnect</h1>
        <p>
          Your health matters. Connect with the best medical professionals and
          services.
        </p>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h2>Our Services</h2>
        {/* <div className="services-list"> */}
        <Carousel>
          {reducedServices.map((item) => (
            <div style={{ display: "flex" }}>
              {item.map((service, index) => (
                <div>
                  <h3 aria-label={service.title}>{service.title}</h3>
                  <img
                    src={service.img}
                    height={200}
                    width={250}
                    alt={"service-icn"}
                  />
                  <p arial-label={service.description}>{service.description}</p>
                </div>
              ))}
            </div>
          ))}
        </Carousel>
        {/* </div> */}
      </section>
      <FAQ />
      <footer className="footer-section">
        <p>&copy; 2024 MediConnect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
