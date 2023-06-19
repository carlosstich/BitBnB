const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { thisReviewCorrect, thisBookingRequest } = require("./validators");

const {
  setTokenCookie,
  requireAuth,
  restoreUser,
} = require("../../utils/auth");
const { Review, User, Spot, ReviewImage, Booking, SpotImage } = require("../../db/models");

const router = express.Router();


router.delete("/:imageId", requireAuth, async (req, res) => {
    try {
      const imageId = req.params.imageId;
      const userId = req.user.id;

      const reviewImage = await ReviewImage.findByPk(imageId);

      if (!reviewImage) {
        return res.status(404).json({ message: "Review Image couldn't be found" });
      }
      const review = await Review.findByPk(reviewImage.reviewId);

      if (!review) {
        return res.status(404).json({ message: "Review couldn't be found" });
      }

      // Check if the review belongs to the current user
      if (review.userId !== userId) {
        return res.status(401).json({ error: "You do not own this review" });
      }

      await reviewImage.destroy();

      res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });



module.exports = router;
