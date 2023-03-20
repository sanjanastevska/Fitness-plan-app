const validateRole = (role) => (req, res, next) => {
  if (req.user.role === role) {
    return next();
  }
  return res
    .status(403)
    .json({ message: "You don't have permission to access this route" });
};

module.exports = { validateRole };
