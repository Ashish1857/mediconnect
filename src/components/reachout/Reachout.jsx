import React, { useState } from "react";
import "./Reachout.css";
import { Button } from "@mui/material";

export const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      console.log(formData);
      setSubmitted(true);
    } catch (error) {
      setError("Failed to send message. Please try again later.");
    }
    setSubmitting(false);
  };

  return (
    <div className="contact-us-container">
      <h1 style={{ margin: 0 }}>Contact Us</h1>
      {submitted ? (
        <div className="success-message">
          Thank you! Your message has been sent.
        </div>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Your Message"
            required
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Sending..." : "Send Message"}
          </Button>
          {error && <div className="error-message">{error}</div>}
        </form>
      )}
    </div>
  );
};
