import React from "react";
import "./LoginModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const LoginModal = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="login-modal">
        <button onClick={onClose} className="close-modal">
          <FontAwesomeIcon icon={faClose} />
        </button>
        <h2>Login to Your Account</h2>
        <form>
          <input type="email" placeholder="Email Address" required />
          <input type="password" placeholder="Password" required />
          <button className="login-button" type="submit">
            Login
          </button>
        </form>
        <div className="modal-footer">
          Don't have an account? <a href="/signup">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
