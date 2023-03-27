const ReviewService = require("../services/review.service");
const PlanService = require("../services/plans.service");

const getReviews = async (req, res) => {
  try {
    const planId = req.params.planId;
    const reviews = await ReviewService.getReviews({ planId });

    if (reviews.length === 0) {
      return res.status(404).json({
        message: "There are still no reviews for this plan.",
      });
    }

    return res.status(200).json({
      message: "Reviews fetched.",
      reviews,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const getAllReviews = async (req, res) => {
  try {
    const userId = req.user.id;
    const reviews = await ReviewService.getAllReviews({ userId });

    if (reviews.length === 0) {
      return res.status(404).json({
        message: "There are still no reviews for your posts",
      });
    }

    return res.status(200).json({
      message: "Reviews fetched.",
      reviews,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

const createReview = async (req, res) => {
  try {
    const { comment, rating, planId } = req.body;
    const subscriberId = req.user.id;

    const expiredPlan = await PlanService.getExpiredPlan({
      planId,
      userId: subscriberId,
    });

    console.log("expiredPlan", expiredPlan);

    if (!expiredPlan) {
      return res.status(403).json({
        message:
          "You are not subscribed to this plan or the plan is not expired",
      });
    }

    const review = await ReviewService.createReview({
      comment,
      rating,
      planId,
      subscriberId,
    });

    return res.status(200).json({
      message: "Review is submitted.",
      review,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getReviews,
  createReview,
  getAllReviews,
};
