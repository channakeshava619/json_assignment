const Joi = require("joi");

const userSchema = Joi.object({
  UserName: Joi.string(),
  UserID: Joi.string(),
  Category: Joi.string(),
  Gender: Joi.string(),
  Age: Joi.number(),
  MobileNo: Joi.number(),
  Interactions: [
    Joi.array().items({
      DateOfInteraction: Joi.string(),
      InteractionID: Joi.string(),
      Purpose: Joi.string(),
      Channel: Joi.string(),
    }),
  ],
});

module.exports = userSchema;
