const authRouter = require("express").Router();
const AuthController = require("../controllers/auth.controller");
const { validateData } = require("../middlewares/validator.middleware");
const {
  loginSchemaValidation,
  registerSchemaValidation,
} = require("../utils/validations/auth.validation");

authRouter
  .post("/login", validateData(loginSchemaValidation), AuthController.login)
  .post(
    "/register",
    validateData(registerSchemaValidation),
    AuthController.register
  );

module.exports = authRouter;
