const moment = require("moment");
const PlanService = require("../services/plans.service");

const createPlan = async (req, res, next) => {
  const data = req.body;
  try {
    const { id: userId } = req.user;
    const startDate = moment(data.startDate, "DD.MM.YYYY").toDate();
    const endDate = moment(data.endDate, "DD.MM.YYYY").toDate();

    const existingPlan = await PlanService.checkTakenTitle({
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

const editPlan = async (req, res, next) => {
  const data = req.body;
  try {
    const postId = req.params.id;
    const startDate =
      data.startDate && moment(data.startDate, "DD.MM.YYYY").toDate();
    const endDate = data.endDate && moment(data.endDate, "DD.MM.YYYY").toDate();

    const existingPlan = await PlanService.getPlan({
      id: postId,
    });

    if (!existingPlan) {
      return res.status(404).json({
        message: `The plan doesn't exist`,
      });
    }

    const plan = await PlanService.editPlan({
      id: postId,
      ...data,
      startDate,
      endDate,
    });

    return res.status(200).json({
      message: "The fitness plan is updated.",
      plan,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
  await next;
};

module.exports = {
  createPlan,
  editPlan,
};
