const UserService = require("../services/user.service");

const getUser = async (req, res, next) => {
  const data = req.body;
  try {
    const user = await UserService.getUser(data);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
  await next;
};

module.exports = {
  getUser,
};
