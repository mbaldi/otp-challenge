const client = require("axios");

const REQUEST_ENDPOINT = `${process.env.REACT_APP_API_URL}/otp/request`;
const VERIFY_ENDPOINT = `${process.env.REACT_APP_API_URL}/otp/verify`;

export const requestOtp = async (email) => {
  const response = await client.post(REQUEST_ENDPOINT, {
    email,
  });
  return response.data;
};

export const verifyOtp = async (email, otp) => {
  const response = await client.post(VERIFY_ENDPOINT, {
    email,
    otp: parseInt(otp, 10),
  });
  return response.data;
};
