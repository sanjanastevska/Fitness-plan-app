const prisma = require("../prisma/prisma-client");

const getPlan = async (data) => {
  const plan = await prisma.plan.findUnique({
    where: {
      id: data.id,
    },
  });

  return plan;
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
  console.log(id);
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

module.exports = {
  getPlan,
  createPlan,
  editPlan,
  deletePlan,
  checkTakenTitle,
};
