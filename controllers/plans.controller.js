const moment = require("moment");
const PlanService = require("../services/plans.service");

const getPlan = async (req, res, next) => {
  try {
    const planId = req.params.id;

    const existingPlan = await PlanService.getPlan({
      id: planId,
    });

    if (!existingPlan) {
      return res.status(404).json({
        message: `The plan doesn't exist`,
      });
    }

    return res.status(200).json({
      message: "The fitness plan is fetched.",
      existingPlan,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  await next;
};

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
    const planId = req.params.id;
    const startDate =
      data.startDate && moment(data.startDate, "DD.MM.YYYY").toDate();
    const endDate = data.endDate && moment(data.endDate, "DD.MM.YYYY").toDate();

    const existingPlan = await PlanService.getPlan({
      id: planId,
    });

    if (!existingPlan) {
      return res.status(404).json({
        message: `The plan doesn't exist`,
      });
    }

    const plan = await PlanService.editPlan({
      id: planId,
      ...data,
      startDate,
      endDate,
    });

    return res.status(200).json({
      message: "The fitness plan is updated.",
      plan,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  await next;
};

const deletePlan = async (req, res, next) => {
  try {
    const planId = req.params.id;
    const subscriptions = await PlanService.getSubscribtions(planId);

    if (subscriptions.length > 0) {
      return res.status(400).json({
        message: `You're not able to delete this plan. The plan have ${subscriptions.length} subscribers.`,
      });
    }
    await PlanService.deletePlan({ id: planId });

    return res.status(200).json({ message: "The fitness plan is deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  await next;
};

const getAllSubscribtions = async (req, res, next) => {
  try {
    const subscribtions = await PlanService.allSubscribtions({
      subscriberId: req.user.id,
    });

    if (subscribtions.length === 0) {
      return res.status(404).json({
        message: "You haven't subscribed to any plan yet",
      });
    }

    return res.status(200).json({
      message: "All subscribtions fetched",
      subscribtions,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  await next;
};

const getAllActivePlans = async (req, res, next) => {
  try {
    const activePlans = await PlanService.getAllActivePlans();

    if (activePlans.length === 0) {
      return res.status(404).json({
        message: "No active plans available",
      });
    }

    return res.status(200).json({
      message: "All active plans fetched",
      activePlans,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  await next;
};

const getActivePlansByCoach = async (req, res, next) => {
  try {
    const activePlans = await PlanService.getActivePlansByCoach({
      coachId: req.params.coachId,
    });

    if (activePlans.length === 0) {
      return res.status(404).json({
        message: "Coach has no active plans available",
      });
    }

    return res.status(200).json({
      message: "Fitness plans by coach",
      activePlans,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  await next;
};

const getAllSubscribersPerPlan = async (req, res, next) => {
  try {
    const planId = req.params.id;
    const subscriptions = await PlanService.getSubscribtions(planId);

    return res.status(200).json({
      message: "All subscribtions fetched",
      subscriptions,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  await next;
};

const subscribeToPlan = async (req, res, next) => {
  try {
    const planId = req.params.id;
    const subscriberId = req.user.id;

    const existingSubscriptions = (
      await PlanService.getSubscribtions(planId)
    ).map((subscribtion) => subscribtion.userId);

    if (existingSubscriptions.includes(subscriberId)) {
      return res.status(400).json({
        message: "You've already subscribed to this plan",
      });
    }

    const activePlan = await PlanService.getActivePlan({ id: planId });

    if (!activePlan) {
      return res.status(400).json({
        message: "This plan is still not active",
      });
    }

    const subscription = await PlanService.subscribeToPlan(
      planId,
      subscriberId
    );
    return res.status(200).json({
      message: "You've subscribed successfully to this fitness plan",
      subscription,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  await next;
};

module.exports = {
  getPlan,
  createPlan,
  editPlan,
  deletePlan,
  getAllActivePlans,
  getActivePlansByCoach,
  getAllSubscribersPerPlan,
  subscribeToPlan,
  getAllSubscribtions,
};
