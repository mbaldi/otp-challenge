const client = require("axios");

const REQUEST_ENDPOINT = `https://p6mk0wglk9.execute-api.us-east-1.amazonaws.com/dev/otp/request`;
const VERIFY_ENDPOINT = `https://p6mk0wglk9.execute-api.us-east-1.amazonaws.com/dev/otp/verify`;

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
