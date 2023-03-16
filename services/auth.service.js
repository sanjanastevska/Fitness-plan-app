const prisma = require("../prisma/prisma-client");

const login = async (data) => {
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  return user;
};

const register = async (data) => {
  const user = await prisma.user.create({
    data: {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      dob: data.dob,
      role: data.role,
      height: data.height,
      weight: data.weight,
    },
  });
  return user;
};

const checkEmailExists = async (email) => {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user !== null;
};

module.exports = {
  login,
  register,
  checkEmailExists,
};
