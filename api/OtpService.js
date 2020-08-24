const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();
const OTP_TABLE = "email_otp";
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
    return {
      statusCode: 200,
      body: JSON.stringify({ otp }),
    };
  } catch (e) {
    console.log(e);
    return e;
  }
};

exports.verify = async (event, context) => {
  try {
    const { email, otp } = JSON.parse(event.body);
    const record = await db
      .get({
        TableName: OTP_TABLE,
        Key: {
          email,
        },
      })
      .promise();
    console.log(record);
    if (record.Item && record.Item.otp === otp) {
      await db
        .delete({
          TableName: OTP_TABLE,
          Key: {
            email,
          },
        })
        .promise();
      return {
        statusCode: 200,
        body: JSON.stringify({ verified: true }),
      };
    } else
      return {
        statusCode: 400,
        body: JSON.stringify({ verified: false }),
      };
  } catch (e) {
    console.log(e);
    return e;
  }
};
