const AWS = require("aws-sdk");
const OTP_TABLE = process.env.DYNAMO_TABLE_NAME;
const db = new AWS.DynamoDB.DocumentClient();
const SesGateway = require("./SesGateway.js");

const getResponse = (statusCode, payload) => ({
  statusCode,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
  body: JSON.stringify(payload),
});

exports.request = async (event, context) => {
  try {
    const { email } = JSON.parse(event.body);
    const otp = Math.floor(1000 + Math.random() * 9000);
    await db
      .put({
        TableName: OTP_TABLE,
        Item: {
          email,
          otp,
          createdAt: new Date().getTime(),
        },
      })
      .promise();
    await SesGateway.sendOtpEmail({ email, otp });
    return getResponse(200, { otp });
  } catch (e) {
    console.log(e);
    return e;
  }
};

exports.verify = async (event, context) => {
  try {
    let verified;
    const { email, otp } = JSON.parse(event.body);
    const record = await db
      .get({
        TableName: OTP_TABLE,
        Key: {
          email,
        },
      })
      .promise();
    if (record.Item && record.Item.otp === otp) {
      await db
        .delete({
          TableName: OTP_TABLE,
          Key: {
            email,
          },
        })
        .promise();
      verified = true;
    } else {
      verified = false;
    }
    return getResponse(200, { verified });
  } catch (e) {
    console.log(e);
    return e;
  }
};
