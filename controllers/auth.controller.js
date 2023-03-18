const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");
const AuthService = require("../services/auth.service");

const hashPassword = async (plainPassword) => {
  const salt = await bcrypt.genSalt(5);
  return await bcrypt.hash(plainPassword, salt);
};

const register = async (req, res, next) => {
  const data = req.body;
  try {
    const hashedPassword = await hashPassword(data.password);
    const dob = moment(data.dob, "DD.MM.YYYY").toDate();

    const existingUserEmail = await AuthService.checkEmailExists(data.email);
    if (existingUserEmail) {
      return res.status(400).json({
        message: "Bad request. User exists with the provided email.",
      });
    }

    const user = await AuthService.register({
      ...data,
      password: hashedPassword,
      dob: dob,
    });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "30min" }
    );

    return res.status(200).json({
      user,
      message: "User is created",
      token: token,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
  await next;
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await AuthService.login({ email });

    const isPasswordMatch =
      user && (await bcrypt.compare(password, user.password));

    if (!user || !isPasswordMatch) {
      return res.status(404).json({
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "30min" }
    );

    return res.status(200).json({
      user,
      message: "User logged in.",
      token: token,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
  await next;
};

module.exports = {
  register,
  login,
};
