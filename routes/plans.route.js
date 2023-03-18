const plansRouter = require("express").Router();
const { Role } = require("../constants");
const PlansController = require("../controllers/plans.controller");
const { isCoach } = require("../middlewares/coach.middleware");
const { validateData } = require("../middlewares/validator.middleware");
const {
  planSchemaValidation,
} = require("../utils/validations/plans.validation");

plansRouter
  .get("/:id", PlansController.getPlan)
  .post(
    "/create",
    validateData(planSchemaValidation),
    isCoach(Role.Coach),
    PlansController.createPlan
  )
  .patch("/update/:id", isCoach(Role.Coach), PlansController.editPlan)
  .delete("/:id", isCoach(Role.Coach), PlansController.deletePlan);

module.exports = plansRouter;
