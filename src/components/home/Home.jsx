import React, { useState } from "react";
import Header from "../shared/Header";
import "./Home.css";
import FAQ from "../FAQ/FAQ";
import LoginModal from "../registration/loginModal/LoginModal";
import Carousel from "react-material-ui-carousel";
import { useUser } from "../../context/UserContext";
import { Card, CardContent } from "@mui/material";

const services = [
  {
    title: "Consult",
    description: "Connect with top medical professionals for consultations.",
    img: "/bookConsult.jpeg",
  },
  {
    title: "Medicine",
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
    img: "/trackHealth.png",
  },

  {
    title: "Health Vault",
    description: "Access your all prescriptions and orders.",
    img: "/Rx.png",
  },
  {
    title: "Order Medicine",
    description: "Get your Medicines delivered to your doorstep.",
    img: "/order-medicine.png",
  },
];

const Home = () => {
  const reduceServices = (acc, cur, index) => {
    const groupIndex = Math.floor(index / 3);
    if (!acc[groupIndex]) acc[groupIndex] = [];
    acc[groupIndex].push(cur);
    return acc;
  };
  const { user } = useUser();

  const reducedServices = services.reduce(reduceServices, []);

  return (
    <div className="home-container">
      {/* Welcome Section */}
      <section className="welcome-section">
        <h1 aria-label="Welcome Note" className="greeting">
          {user ? `Hi ${user.firstName}` : ""}
          {user && (
            <>
              <img height={40} width={40} src={"./hand-wave.png"} />
              ,&nbsp;
            </>
          )}
          Welcome to MediConnect
        </h1>
        <p>
          Your health matters. Connect with the best medical professionals and
          services.
        </p>
      </section>

      {/* Services Section */}
      <Card>
        <CardContent style={{ background: "#f4f4f4" }}>
          {/* <div className="services-list"> */}
          <h2>Our Services</h2>
          <Carousel>
            {reducedServices.map((item, index) => (
              <div style={{ display: "flex", margin: 0 }} key={index}>
                {item.map((service, index) => (
                  <div
                    key={service.title}
                    style={{ background: "white", flex: 1 }}
                  >
                    <h3
                      aria-label={service.title}
                      style={{ margin: "0.5rem auto" }}
                    >
                      {service.title}
                    </h3>
                    <img
                      src={service.img}
                      height={200}
                      width={250}
                      alt={"service-icn"}
                    />
                    <p
                      arial-label={service.description}
                      style={{
                        width: "80%",
                        textAlign: "center",
                        margin: "0.5rem auto",
                      }}
                    >
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </Carousel>
          {/* </div> */}
        </CardContent>
      </Card>
      <FAQ />
      <Card>
        <CardContent className="footer-section">
          <p>&copy; 2024 MediConnect. All rights reserved.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
