import React, { useState } from "react";
import BaseForm from "./BaseForm";

const RequestOtpPage = () => {
  const [otpRequested, setOtpRequested] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");

  const handleRequestOTP = (email) => {
    //TBD invoke API
    setOtpRequested(true);
    setEmail(email);
  };

  const handleVerifyOTP = (otp) => {
    //TBD invoke API
    setOtpVerified(true);
    setVerificationMessage("OTP Succesfully verified");
  };

  const handleStartAgain = () => {
    setOtpRequested(false);
    setOtpVerified(false);
    setEmail("");
    setVerificationMessage("");
  };

  return (
    <>
      {!otpRequested && (
        <BaseForm
          label="Please enter your email"
          placeholder="Enter email"
          buttonLabel="Request OTP"
          onClick={handleRequestOTP}
        />
      )}
      {otpRequested && !otpVerified && (
        <>
          <BaseForm
            label="Thank you, we have sent an OTP to your email, please enter it here"
            placeholder="Enter OTP"
            buttonLabel="Verify"
            onClick={handleVerifyOTP}
          />
          <button onClick={handleStartAgain}>Start Again</button>
        </>
      )}
      {otpVerified && (
        <>
          <p>{verificationMessage}</p>
          <button onClick={handleStartAgain}>Start Again</button>
        </>
      )}
    </>
  );
};

export default RequestOtpPage;
