const axios = require("axios");

function config(data) {
  return {
    method: data.method,
    maxBodyLength: Infinity,
    url: `https://newsapi.org/v2/top-headlines?${data.query}`,
    headers: {},
  };
}

async function callApi(data) {
  try {
    const response = await axios.request(data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  config,
  callApi,
};
