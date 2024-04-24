import React, { useState, createRef, useEffect } from "react";

const OtpInput = ({ otp, setOtp }) => {
  const [inputRefs, setInputRefs] = useState([]);
  const inputsCount = 6;

  useEffect(() => {
    setInputRefs((refs) =>
      Array(inputsCount)
        .fill()
        .map((_, i) => refs[i] || createRef())
    );
  }, [inputsCount]);

  const handleChange = (index) => (event) => {
    const value = event.target.value;
    setOtp((otpValues) => {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      return newOtpValues;
    });

    if (value.length === 1 && index < inputsCount - 1) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleKeyDown = (index) => (event) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData("text").slice(0, inputsCount);
    if (pasteData.length === inputsCount) {
      setOtp([...pasteData]);
      inputRefs[inputsCount - 1].current.focus();
    }
  };

  return (
    <div onPaste={handlePaste}>
      {Array.from({ length: inputsCount }).map((_, index) => (
        <input
          key={index}
          ref={inputRefs[index]}
          type="text"
          maxLength="1"
          value={otp[index] || ""}
          onChange={handleChange(index)}
          onKeyDown={handleKeyDown(index)}
          style={{
            width: "40px",
            padding: "10px",
            margin: "0 6px",
            fontSize: "18px",
            textAlign: "center",
          }}
        />
      ))}
    </div>
  );
};

export default OtpInput;
