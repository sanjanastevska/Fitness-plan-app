const plansRouter = require("express").Router();
const { Role } = require("../constants");
const PlansController = require("../controllers/plans.controller");
const { validateRole } = require("../middlewares/role.middleware");
const { validateData } = require("../middlewares/validator.middleware");
const {
  planSchemaValidation,
} = require("../utils/validations/plans.validation");

plansRouter
  .get(
    "/:id/all-subscribers",
    validateRole(Role.Coach),
    PlansController.getAllSubscribersPerPlan
  )
  .get(
    "/all-subscribtions",
    validateRole(Role.Subscriber),
    PlansController.getAllSubscribtions
  )
  .get(
    "/active-plans",
    validateRole(Role.Subscriber),
    PlansController.getAllActivePlans
  )
  .get(
    "/active-plans/:coachId",
    validateRole(Role.Subscriber),
    PlansController.getActivePlansByCoach
  )
  .post(
    "/create",
    validateData(planSchemaValidation),
    validateRole(Role.Coach),
    PlansController.createPlan
  )
  //  to validate the data before edit
  .patch("/update/:id", validateRole(Role.Coach), PlansController.editPlan)
  .delete("/:id", validateRole(Role.Coach), PlansController.deletePlan)
  .post(
    "/:id/subscribe",
    validateRole(Role.Subscriber),
    PlansController.subscribeToPlan
  )
  .get("/:id", PlansController.getPlan);

module.exports = plansRouter;
