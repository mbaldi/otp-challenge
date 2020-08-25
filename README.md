## Full Stack Challenge - Serverless AWS App

This repo contains a solution for the challenge described [here](https://www.notion.so/Full-Stack-Challenge-Serverless-AWS-App-c73f346b134948f1a578845fe4ab8ac0?v=a28570d5886d4bc5b521648092d7bac7)

[Live Demo](http://otp-challenge-ui.s3-website-us-east-1.amazonaws.com/)

## Tech Stack

- Backend
  - AWS API Gateway hosts the API
  - Endpoints are AWS Lambda functions
  - DynamoDB for OTP storage
  - SES for email delivery
- UI is a React single page app
  - Deployed to S3 bucket
- Backend & Deployment using Serverless Framework

## Requirements

- AWS account with permissions for All AWS services listed above
- AWS cli configured [Link](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html)
- Email address validated in SES
- Node.js v12
- Yarn [Link](https://yarnpkg.com/)
- Serverless Framework installed [Link](https://www.serverless.com/framework/docs/getting-started/)

## .env file

- Set `DYNAMO_TABLE_NAME` to a name of a DynamoDB table for OTP storage
  **Note: Severless can create the table for you. Just uncomment the `resources` section in `serverless.yaml` for the first deploy**
- Set `S3_BUCKET_NAME` to a name of an S3 bucket to deploy the UI App
- Replace `<<EMAIL_FROM>>` with an email address that's been verified in SES, this is used to send the emails. More info [here](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/verify-email-addresses.html)

## Deploy

```
$yarn install
$sls deploy
$sls client build
$sls client deploy --no-confirm

```

The cli log will output the url for the deployed app

## TODO

- UI Styling
- Form Validation
- Tests
