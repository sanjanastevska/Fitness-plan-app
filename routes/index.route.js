const router = require("express").Router();
const { authMiddleware } = require("../middlewares/auth.middleware");
const authRouter = require("./auth.route");
const plansRouter = require("./plans.route");
// const reviewsRouter = require("./reviews.route");

router.use("/auth", authRouter);
router.use("/plans", authMiddleware, plansRouter);
// router.use("/reviews", reviewsRouter);

module.exports = router;
