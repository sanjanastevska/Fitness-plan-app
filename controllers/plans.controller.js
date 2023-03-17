const moment = require("moment");
const PlanService = require("../services/plans.service");

const createPlan = async (req, res, next) => {
  const data = req.body;
  try {
    const { id: userId } = req.user;
    const startDate = moment(data.startDate, "DD.MM.YYYY").toDate();
    const endDate = moment(data.endDate, "DD.MM.YYYY").toDate();

    const existingPlan = await PlanService.checkPlanExists({
      title: data.title,
    });

    if (existingPlan) {
      return res.status(404).json({
        message: `Title ${data.title} is already taken.`,
      });
    }

    const plan = await PlanService.createPlan({
      ...data,
      startDate,
      endDate,
      userId,
    });

    return res.status(200).json({
      message: "New fitness plan created.",
      plan,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
  await next;
};

module.exports = {
  createPlan,
};
