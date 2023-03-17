const prisma = require("../prisma/prisma-client");

const createPlan = async (data) => {
  console.log("DATA", data);
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

const checkPlanExists = async (title) => {
  const plan = await prisma.plan.findFirst({
    where: title,
  });
  return plan !== null;
};

module.exports = {
  createPlan,
  checkPlanExists,
};
