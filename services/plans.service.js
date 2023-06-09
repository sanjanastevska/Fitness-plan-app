const prisma = require("../prisma/prisma-client");

const getPlan = async (data) => {
  const plan = await prisma.plan.findUnique({
    where: {
      id: data.id,
    },
  });

  return plan;
};

const getExpiredPlan = async ({ planId, userId }) => {
  const plan = await prisma.plan.findFirst({
    where: {
      id: planId,
      endDate: {
        lte: new Date(),
      },
      subscribers: {
        some: {
          userId,
        },
      },
    },
    include: {
      Reviews: true,
      User: true,
    },
  });

  return plan;
};

const getActivePlan = async ({ id }) => {
  const plan = await prisma.plan.findFirst({
    where: {
      id,
      startDate: {
        lte: new Date(),
      },
      endDate: {
        gte: new Date(),
      },
    },
  });

  return plan;
};

const getActivePlansByCoach = async ({ coachId }) => {
  const plans = await prisma.plan.findMany({
    where: {
      userId: coachId,
      startDate: {
        lte: new Date(),
      },
      endDate: {
        gte: new Date(),
      },
    },
  });

  return plans;
};

const getAllActivePlans = async () => {
  const plans = await prisma.plan.findMany({
    where: {
      startDate: {
        lte: new Date(),
      },
      endDate: {
        gte: new Date(),
      },
    },
  });

  return plans;
};

const allSubscribtions = async ({ subscriberId }) => {
  const plans = await prisma.subscription.findMany({
    where: {
      userId: subscriberId,
    },
    select: {
      plan: true,
    },
  });

  return plans;
};

const createPlan = async (data) => {
  const plan = await prisma.plan.create({
    data: {
      title: data.title,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      User: {
        connect: {
          id: data.userId,
          role: data.role,
        },
      },
    },
  });

  return plan;
};

const editPlan = async (data) => {
  const plan = await prisma.plan.update({
    where: {
      id: data.id,
    },
    data: {
      ...data,
    },
  });

  return plan;
};

const deletePlan = async (id) => {
  await prisma.plan.delete({
    where: id,
  });
};

const checkTakenTitle = async (title) => {
  const plan = await prisma.plan.findFirst({
    where: title,
  });
  return plan !== null;
};

const getSubscribtions = async (planId) => {
  const subscribtions = await prisma.subscription.findMany({
    where: {
      planId: planId,
    },
    select: {
      userId: true,
    },
  });

  return subscribtions;
};

const subscribeToPlan = async (planId, subscriberId) => {
  const plan = await prisma.subscription.create({
    data: {
      user: {
        connect: { id: subscriberId },
      },
      plan: {
        connect: { id: planId },
      },
    },
  });
  return plan;
};

module.exports = {
  getPlan,
  getExpiredPlan,
  getActivePlan,
  createPlan,
  editPlan,
  deletePlan,
  checkTakenTitle,
  getSubscribtions,
  subscribeToPlan,
  getAllActivePlans,
  getActivePlansByCoach,
  allSubscribtions,
};
