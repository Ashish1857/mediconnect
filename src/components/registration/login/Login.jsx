import React from "react";
import Header from "../../shared/Header";
import "./Login.css";

const Login = () => {
  return (
    <div className="page-container">
      <Header />
      <div className="login-container">
        <div className="login-content">
          <h2>Login to Your Account</h2>
          <form className="login-form">
            {/* Your form inputs and labels here */}
            <input type="email" placeholder="Email Address" />
            <input type="password" placeholder="Password" />
            <button type="submit">Login</button>
          </form>
          <div className="login-footer">
            Don't have an account? <a href="/signup">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
