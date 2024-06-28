const axios = require("axios");
const moment = require("moment");

async function sendNotification(data) {
  const communicationUrl = process.env.COMMUNICATION_SERVICE_URL;
  const communicationToken =  process.env.SMS_TOKEN;
  const commonParameters = {
    parameter: {
      title: {},
      body: {
        URL:data.URL,
      },
    },
  };

  let body = {};

  body = {
    ...commonParameters,
    sms: {
      templateKey: "customer_review_proposal_sms",
      mobile: data.mobile,
    },
  };
  const response = await axios.post(`${communicationUrl}`, body, {
    headers: {
      "Content-Type": "application/json",
      token: communicationToken,
      json: true,
    },
  });
  return response.data;
}

module.exports = sendNotification;