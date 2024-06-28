const { config, callApi } = require("../utils/axios");
const moment = require("moment");
const userCategory = require("../models/userCategoryModel");
const { searchYouTube } = require("../utils/youtube");

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
  } else if (type === "ALL") {
    createConfig = config({
      method: "get",
      query: `country=in&apiKey=7f05e14c810145d9a23ad79687926a2e`,
    });
    result = await callApi(createConfig);
  } else if (type === "FOR_YOU") {
    const findUser = await userCategory.aggregate([
      {
        $match: {
          userId,
        },
      },
      {
        $group: {
          _id: "$categoryId",
          data: {
            $first: "$$ROOT",
          },
        },
      },
      {
        $lookup: {
          from: "categorymasters",
          let: { categoryId: "$data.categoryId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ["$_id", "$$categoryId"],
                },
              },
            },
          ],
          as: "result",
        },
      },
      {
        $unwind: {
          path: "$result",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    const articlesArray = [];
    if (findUser.length) {
      for (let i = 0; i < findUser.length; i++) {
        createConfig = config({
          method: "get",
          query: `category=${findUser[i].result.name}&country=in&apiKey=7f05e14c810145d9a23ad79687926a2e`,
        });
        result = await callApi(createConfig);
        articlesArray.push(result.articles);
      }
      result = articlesArray.flat();
    }
  }
  return result;
};

const findYoutubeShorts = async (req, res) => {
  try {
    let result = await getYoutubeShorts(req.query);
    return res.status(200).send({ result });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

const getYoutubeShorts = async (input) => {
  try {
    const result = await searchYouTube(input.word);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  findNews,
  findYoutubeShorts,
};
