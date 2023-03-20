const createReview = async (req, res, next) => {
  try {
    return res.status(200).json({
      message: "Review is submitted.",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
  await next;
};

module.exports = {
  createReview,
};
