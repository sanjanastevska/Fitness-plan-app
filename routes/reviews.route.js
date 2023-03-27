const reviewsRouter = require("express").Router();
const { Role } = require("../constants");
const ReviewController = require("../controllers/review.controller");
const { validateRole } = require("../middlewares/role.middleware");

reviewsRouter
  .get("/", validateRole(Role.Coach), ReviewController.getAllReviews)
  .get("/:planId", validateRole(Role.Subscriber), ReviewController.getReviews)
  .post(
    "/create",
    validateRole(Role.Subscriber),
    ReviewController.createReview
  );

module.exports = reviewsRouter;
