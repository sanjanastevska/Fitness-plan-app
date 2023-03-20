const reviewsRouter = require("express").Router();
const { Role } = require("../constants");
const ReviewController = require("../controllers/review.controller");
const { validateRole } = require("../middlewares/role.middleware");

reviewsRouter.post(
  validateRole(Role.Subscriber),
  ReviewController.createReview
);

module.exports = reviewsRouter;
