const validateData = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    console.log(error);
    const errorMessage = error.details
      .map((details) => details.message)
      .join(", ");
    return res
      .status(422)
      .json({ message: "Validation error", errors: errorMessage });
  }
  next();
};

module.exports = { validateData };
