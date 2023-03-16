const Joi = require("joi");

const passwordPattern =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$!%*^&])[A-Za-z\d@#$!%*^&]{8,}$/;

const loginSchemaValidation = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: ["com"] } })
    .required(),
  password: Joi.string().pattern(passwordPattern).required(),
});

const registerSchemaValidation = Joi.object({
  firstname: Joi.string().trim().required(),
  lastname: Joi.string().trim().required(),
  dob: Joi.string()
    .pattern(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: ["com"] } })
    .trim()
    .required(),
  password: Joi.string().trim().pattern(passwordPattern).required(),
  role: Joi.string().valid("Coach", "Subscriber"),
  weight: Joi.number().min(50).max(200),
  height: Joi.number().min(130),
});

module.exports = {
  loginSchemaValidation,
  registerSchemaValidation,
};
