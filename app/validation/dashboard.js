const Joi = require("joi");

const news = Joi.object({
  type: Joi.string().trim().valid("FOR_YOU", "POPULARITY", "TODAY").required(),
  userId: Joi.string().trim().when("type", {
    is: "FOR_YOU",
    then: Joi.string().trim().required(),
  }),
});

module.exports = { news };
