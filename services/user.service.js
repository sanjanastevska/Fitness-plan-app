const prisma = require("../prisma/prisma-client");

const getUser = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  return user;
};

module.exports = { getUser };
