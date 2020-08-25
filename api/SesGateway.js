const AWS = require("aws-sdk");
const ses = new AWS.SES();

exports.sendOtpEmail = async ({ email, otp }) => {
  try {
    var params = {
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Body: {
          Text: {
            Charset: "UTF-8",
            Data: `Hey there,
Your one time password is ${otp}
Best Regards.`,
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "Your One-time password",
        },
      },
      Source: process.env.EMAIL_FROM,
    };
    const response = await ses.sendEmail(params).promise();
    return response;
  } catch (e) {
    console.log(e);
    return e;
  }
};
