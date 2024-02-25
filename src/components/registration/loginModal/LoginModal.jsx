import React, { useEffect, useState } from "react";
import "./LoginModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import PhoneInput from "react-phone-input-2";

const LoginModal = ({ show, onClose }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [currentStep, setCurrentStep] = useState("enterMobile");
  const initialOtpState = ["", "", "", "", "", ""];
  const [otpInputs, setOtpInputs] = useState(initialOtpState);

  const handleOtpChange = (event, index) => {
    const newOtpInputs = [...otpInputs];
    newOtpInputs[index] = event.target.value;
    setOtpInputs(newOtpInputs);

    // Auto-focus next input after typing a digit
    if (event.target.nextSibling && event.target.value) {
      event.target.nextSibling.focus();
    }
  };

  const handleOtpSubmit = () => {
    const otp = otpInputs.join("");
    // Submit OTP
    console.log("Submitting OTP:", otp);
  };

  const handleResendOtp = () => {
    // Handle OTP resend logic
    console.log("Resending OTP");
    setOtpInputs(initialOtpState);
  };

  const onChangeMobile = (e) => {
    console.log(e);
  };

  const handleMobileNumberSubmit = () => {
    // Here you could implement validation or API call
    setCurrentStep("enterOtp");
  };

  useEffect(() => {
    console.log(mobileNumber);
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="login-modal">
        <button onClick={onClose} className="close-modal">
          <FontAwesomeIcon icon={faClose} />
        </button>

        {currentStep === "enterMobile" && (
          <div>
            <h2>Let's Begin...</h2>
            <div className="phone-input-container">
              <PhoneInput
                country={"us"}
                value={mobileNumber}
                onChange={onChangeMobile}
                inputClass="phone-input-field"
                dropdownClass="flag-dropdown"
                buttonClass="get-otp-button"
              />
              <button
                className="get-otp-button"
                onClick={handleMobileNumberSubmit}
              >
                Get OTP
              </button>
            </div>
          </div>
        )}

        {currentStep === "enterOtp" && (
          <div className="otp-container">
            <h2>We have sent you One Time Password to your Mobile..</h2>
            <p>Please Enter OTP</p>
            {/* Timer here if you need one */}
            <div className="otp-inputs">
              {Array.from({ length: 4 }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="otp-input"
                  onChange={(e) => handleOtpChange(e, index)}
                  onFocus={(e) => e.target.select()}
                />
              ))}
            </div>
            <div className="otp-actions">
              <button className="otp-button" onClick={handleResendOtp}>
                Resend OTP
              </button>
              <button className="otp-button" onClick={handleOtpSubmit}>
                Verify OTP
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
