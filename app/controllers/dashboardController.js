const { config, callApi } = require("../utils/axios");
const moment = require("moment");
const userCategory = require("../models/userCategoryModel");

const findNews = async (req, res) => {
  try {
    let result = await getNewsFeed(req.body);
    return res.status(200).send({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getNewsFeed = async (input) => {
  const { type, userId } = input;
  let createConfig;
  let result = [];
  if (type === "POPULARITY") {
    createConfig = config({
      method: "get",
      query: `sortBy=popularity&country=in&apiKey=7f05e14c810145d9a23ad79687926a2e`,
    });
    result = await callApi(createConfig);
  } else if (type === "TODAY") {
    const today = moment().format("YYYY-MM-DD");
    createConfig = config({
      method: "get",
      query: `from=${today}&country=in&apiKey=7f05e14c810145d9a23ad79687926a2e`,
    });
    result = await callApi(createConfig);
  } else if (type === "FOR_YOU") {
    const findUser = await userCategory.find({ userId });
    const articlesArray = [];
    findUser.map(async (el) => {
      createConfig = config({
        method: "get",
        query: `category=${el.name}&country=in&apiKey=7f05e14c810145d9a23ad79687926a2e`,
      });
      result = await callApi(createConfig);
      articlesArray.push(result);
    });
    result = articlesArray;
  }
  return result;
};

module.exports = {
  findNews,
};
