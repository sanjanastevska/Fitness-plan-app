const Joi = require("joi");

const planSchemaValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().max(200).required(),
  startDate: Joi.string()
    .pattern(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
    .required(),
  endDate: Joi.string()
    .pattern(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
    .required(),
});

const editPlanSchemaValidation = Joi.object({
  title: Joi.string().optional(),
  description: Joi.string().max(200).optional(),
  startDate: Joi.string()
    .pattern(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
    .optional(),
  endDate: Joi.string()
    .pattern(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/)
    .optional(),
  userId: Joi.string(),
});

module.exports = {
  planSchemaValidation,
  editPlanSchemaValidation,
};
