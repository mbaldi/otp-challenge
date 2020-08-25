import React, { useState } from "react";
import BaseForm from "./BaseForm";
import { requestOtp, verifyOtp } from "../apiOperations";

const RequestOtpPage = () => {
  const [otpRequested, setOtpRequested] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");

  const handleRequestOTP = async (email) => {
    try {
      await requestOtp(email);
    } catch (e) {
      console.log(e);
    }
    setOtpRequested(true);
    setEmail(email);
  };

  const handleVerifyOTP = async (otp) => {
    let response = {};
    try {
      response = await verifyOtp(email, otp);
    } catch (e) {
      console.log(e);
    }
    setOtpVerified(true);
    setVerificationMessage(
      response.verified ? "OTP succesfully verified" : "Invalid OTP"
    );
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
      {otpRequested && (
        <>
          <BaseForm
            label="Thank you, we have sent an OTP to your email, please enter it here"
            placeholder="Enter OTP"
            buttonLabel="Verify"
            onClick={handleVerifyOTP}
          />
          {otpVerified && <p>{verificationMessage}</p>}
          <button onClick={handleStartAgain}>Start Again</button>
        </>
      )}
    </>
  );
};

export default RequestOtpPage;
