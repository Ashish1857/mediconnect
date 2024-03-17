import React, { useEffect, useState, useRef } from "react";
import "./LoginModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import PhoneInput from "react-phone-input-2";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import CircularProgress from "@mui/material/CircularProgress";
import SignUpForm from "../signup/SignUp";
import { isRegisteredUser } from "../../../utils/api";
// const step = {
//   1: "enterMobile",
//   2: "enterOtp",
// };

const LoginModal = ({ show, onClose }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [isValidNumber, setIsValidNumber] = useState(false);

  const initialOtpState = ["", "", "", "", "", ""];
  const [otpInputs, setOtpInputs] = useState(initialOtpState);
  const inputsRef = useRef(initialOtpState.map(() => React.createRef()));

  const [isLoading, setIsLoading] = useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const userLocalStorageKey = "userMobileNumber";

  // Create a ref for each input
  for (let i = 0; i < 7; i++) {
    inputsRef[i] = React.createRef();
  }

  const handleOtpChange = (event, index) => {
    const newOtpInputs = [...otpInputs];
    newOtpInputs[index] = event.target.value;
    setOtpInputs(newOtpInputs);

    // Focus next input on value entry
    if (event.target.value && index < 6) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace") {
      if (otpInputs[index]) {
        // Clear the current input
        handleOtpChange({ target: { value: "" } }, index);
      } else if (index > 0) {
        // Clear the previous input and move focus
        handleOtpChange({ target: { value: "" } }, index - 1);
        inputsRef.current[index - 1].focus();
      }
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

  const handleOnChange = (value, country, e, formattedValue) => {
    setMobileNumber(formattedValue);
  };

  const handleGetOtp = () => {
    setCurrentStep(2);
    goToNextStep();
  };
  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const verifyOtp = () => {
    setIsLoading(true);
    if (otpInputs.join("") === "123456") {
      setIsUserAuthenticated(true);
      isRegisteredUser(mobileNumber).then((user) => {
        if (!user.error) {
          localStorage.setItem("mobileNumber", mobileNumber);
          window.location.reload();
          onClose();
        } else {
          setShowSignUp(true);
        }
      });
      setIsLoading(false);
    } else {
      // OTP is incorrect - handle error
    }
  };

  useEffect(() => {
    console.log(`Phone number for validation: ${mobileNumber}`);
    const phoneNumber = parsePhoneNumberFromString(mobileNumber);

    // Check if the phone number is valid
    if (phoneNumber) {
      console.log(`Is phone number valid? ${phoneNumber.isValid()}`);
      setIsValidNumber(phoneNumber.isValid());
    } else {
      setIsValidNumber(false);
    }
  }, [mobileNumber]);

  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="login-modal">
        <button
          onClick={() => {
            onClose();
            setCurrentStep(1);
          }}
          className="close-modal"
        >
          <FontAwesomeIcon icon={faClose} />
        </button>

        {currentStep === 1 && (
          <div>
            <h2>Let's Begin...</h2>
            <div className="phone-input-container">
              <PhoneInput
                country={"us"}
                value={mobileNumber}
                onChange={handleOnChange}
                inputClass="phone-input-field"
                dropdownClass="flag-dropdown"
                buttonClass="get-otp-button"
                containerClass="phone-input-container"
                inputProps={{
                  required: true,
                  autoFocus: true,
                }}
              />
              <button
                className="get-otp-button"
                onClick={handleGetOtp}
                disabled={!isValidNumber}
              >
                Get OTP
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="otp-container">
            {isLoading ? (
              <CircularProgress />
            ) : (
              <>
                {!showSignUp && (
                  <>
                    <h2>We have sent you One Time Password to your Mobile..</h2>
                    <p>Please Enter OTP</p>
                    <div className="otp-inputs">
                      {otpInputs.map((_, index) => (
                        <input
                          key={index}
                          type="text"
                          maxLength="1"
                          className="otp-input"
                          value={otpInputs[index]}
                          onChange={(e) => handleOtpChange(e, index)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          ref={(el) => (inputsRef.current[index] = el)} // Assign refs dynamically
                        />
                      ))}
                    </div>
                    {!isLoading && !showSignUp && (
                      <div className="otp-actions">
                        <button
                          className="otp-button"
                          onClick={handleResendOtp}
                        >
                          Resend OTP
                        </button>
                        <button className="otp-button" onClick={verifyOtp}>
                          Verify OTP
                        </button>
                      </div>
                    )}
                  </>
                )}
                {showSignUp && (
                  <div>
                    <SignUpForm mobileNumber={mobileNumber} />
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
