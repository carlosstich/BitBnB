const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { thisReviewCorrect } = require("./validators");

const {
  setTokenCookie,
  requireAuth,
  restoreUser,
} = require("../../utils/auth");
const { Review, User, Spot, ReviewImage } = require("../../db/models");

const router = express.Router();

//Get all the reveiwws from a current USer



router.get("/current", requireAuth, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = req.user.id;
    const reviews = await Review.findAll({
      where: { userId: userId },
      include: [
        { model: User },
        { model: Spot },
        { model: ReviewImage }
      ]
    });

    res.status(200).json({ Reviews: reviews });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Edit a spot
router.put('/:reviewId', requireAuth, thisReviewCorrect, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const ourReviewId = req.params.reviewId;
  const { review, stars } = req.body;

  //see if we can find the review
  const searchReview = await Review.findByPk(ourReviewId);
  if (!searchReview) {
    res.status(404).json({ error: "Review couldnt be found" })
  }

  //check if the current user owns this review
  if (searchReview.userId !== req.user.id) {
    return res.status(401).json({ error: " you dont own this review"})
  }

  searchReview.review = review;
  searchReview.stars = stars
  await searchReview.save();
  res.status(200).json({ searchReview})

} )


module.exports = router;
