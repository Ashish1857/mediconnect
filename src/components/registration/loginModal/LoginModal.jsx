import React, { useEffect, useState } from "react";
import "./LoginModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import PhoneInput from "react-phone-input-2";
import { parsePhoneNumberFromString } from "libphonenumber-js";

// const step = {
//   1: "enterMobile",
//   2: "enterOtp",
// };

const LoginModal = ({ show, onClose }) => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const initialOtpState = ["", "", "", "", "", ""];
  const [otpInputs, setOtpInputs] = useState(initialOtpState);
  const [isValidNumber, setIsValidNumber] = useState(false);
  const inputsRef = [];

  // Create a ref for each input
  for (let i = 0; i < 5; i++) {
    inputsRef[i] = React.createRef();
  }

  const handleOtpChange = (event, index) => {
    const value = event.target.value;

    // Set OTP value
    setOtpInputs((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;
      return newOtp;
    });

    // Focus next input on value entry
    if (value && index < 3) {
      console.log(index);
      inputsRef[index + 1].current.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace") {
      // If there is a digit in the current input, delete it.
      if (otp[index]) {
        setOtp((prevOtp) => {
          const newOtp = [...prevOtp];
          newOtp[index] = "";
          return newOtp;
        });
      }
      // If the current input is already empty, delete the digit in the previous input and move the focus.
      else if (index !== 0) {
        setOtp((prevOtp) => {
          const newOtp = [...prevOtp];
          newOtp[index - 1] = "";
          return newOtp;
        });
        // Move focus to previous input after state update
        setTimeout(() => inputsRef[index - 1]?.current.focus(), 0);
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
            <h2>We have sent you One Time Password to your Mobile..</h2>
            <p>Please Enter OTP</p>
            <div className="otp-inputs">
              {Array.from({ length: 4 }).map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="otp-input"
                  onChange={(e) => handleOtpChange(e, index)}
                  onFocus={(e) => e.target.select()}
                  value={otpInputs[index] || ""}
                  ref={inputsRef[index]}
                  onKeyDown={(e) => handleKeyDown(e, index)}
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
