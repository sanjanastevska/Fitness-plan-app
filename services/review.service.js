const prisma = require("../prisma/prisma-client");

const getReviewByUser = async ({ userId, planId }) => {
  const review = await prisma.reviews.findFirst({
    where: {
      planId,
      userId,
    },
  });

  return review;
};

const getReviews = async ({ planId }) => {
  const reviews = await prisma.reviews.findMany({
    where: {
      planId,
    },
    select: {
      comment: true,
      user: {
        select: {
          email: true,
        },
      },
      plan: true,
    },
  });

  return reviews;
};
const getAllReviews = async ({ userId }) => {
  const reviews = await prisma.reviews.findMany({
    where: {
      plan: {
        userId,
      },
    },
    select: {
      comment: true,
      plan: {
        select: {
          title: true,
        },
      },
    },
  });

  return reviews;
};

const createReview = async (data) => {
  const review = await prisma.reviews.create({
    data: {
      comment: data.comment,
      rating: data.rating,
      plan: {
        connect: { id: data.planId },
      },
      user: {
        connect: { id: data.subscriberId },
      },
    },
  });
  return review;
};

module.exports = { getReviews, getAllReviews, createReview, getReviewByUser };
