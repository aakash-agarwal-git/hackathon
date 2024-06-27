const cron = require("node-cron");
const userCategory = require("../models/userCategoryModel");
const moment = require("moment");
const { default: mongoose } = require("mongoose");
const { config, callApi } = require("../utils/axios");

function scheduleCronJob() {
  // Expiry
  cron.schedule("* * 1 * *", async () => {
    try {
      console.log("Running a task every minute");
      const findCategories = await userCategory.find(
        {
          expiry: {
            $gte: moment().subtract("1", "h").add("330", "m"),
            $lte: moment().add("330", "m"),
          },
        },
        { _id: 1 }
      );
      console.log("🚀 ~ cron.schedule ~ findCategories:", findCategories);
      const categoryIds = findCategories.map((el) => el._id);
      //   const deleteData = await userCategory.deleteMany({
      //     _id: { $in: categoryIds },
      //   });
      //   console.log("🚀 ~ cron.schedule ~ deleteData:", deleteData);
    } catch (error) {
      console.log("🚀 ~ cron.schedule ~ error:", error);
    }
  });

  // All Time Cron
  cron.schedule("* * 9 * *", async () => {
    try {
      console.log("Running a task every minute");
      const findCategories = await userCategory.aggregate([
        {
          $match: {
            preferredTime: null,
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
      console.log("🚀 ~ cron.schedule ~ findCategories:", findCategories);
      const articlesArray = [];
      for (let i = 0; i < findCategories.length; i++) {
        const createConfig = config({
          method: "get",
          query: `category=${findCategories[i].result.name}&country=in&apiKey=7f05e14c810145d9a23ad79687926a2e`,
        });
        result = await callApi(createConfig);
        articlesArray.push(result.articles[0]);
      }
      result = articlesArray.flat();
      console.log("🚀 ~ cron.schedule ~ articlesArray:", articlesArray);
      console.log("🚀 ~ cron.schedule ~ result:", result);
    } catch (error) {
      console.log("🚀 ~ cron.schedule ~ error:", error);
    }
  });

  // User Defined Cron
  cron.schedule("* 1 * * *", async () => {
    try {
      console.log("Running a task every minute");
      const findCategories = await userCategory.aggregate([
        {
          $match: {
            preferredTime: {
              $gte: new Date(moment().subtract("1", "h").add("330", "m")),
              $lte: new Date(moment().add("330", "m")),
            },
          },
        },
        {
          $group: {
            _id: {
              userId: "$userId",
              categoryId: "$categoryId",
            },
            data: {
              $push: "$$ROOT",
            },
          },
        },
        {
          $lookup: {
            from: "categorymasters",
            let: { categoryId: "$_id.categoryId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$_id", "$$categoryId"],
                  },
                },
              },
            ],
            as: "categoriesResult",
          },
        },
        {
          $unwind: {
            path: "$categoriesResult",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "users",
            let: { userId: "$_id.userId" },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $eq: ["$userId", "$$userId"],
                  },
                },
              },
            ],
            as: "userResult",
          },
        },
        {
          $unwind: {
            path: "$userResult",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $group: {
            _id: "$_id",
            data: { $first: "$data" },
            categoriesResult: { $first: "$categoriesResult" },
            userResult: { $first: "$userResult" },
          },
        },
      ]);
      console.log(
        "🚀 ~ cron.schedule ~ findCategories:",
        JSON.stringify(findCategories)
      );
      const articlesArray = [];
      for (let i = 0; i < findCategories.length; i++) {
        const createConfig = config({
          method: "get",
          query: `category=${findCategories[i].categoriesResult.name}&country=in&apiKey=7f05e14c810145d9a23ad79687926a2e`,
        });
        result = await callApi(createConfig);
        articlesArray.push(result.articles[0]);
      }
      result = articlesArray.flat();
      console.log("🚀 ~ cron.schedule ~ articlesArray:", articlesArray);
      console.log("🚀 ~ cron.schedule ~ result:", result);
    } catch (error) {
      console.log("🚀 ~ cron.schedule ~ error:", error);
    }
  });
}

module.exports = {
  scheduleCronJob,
};
