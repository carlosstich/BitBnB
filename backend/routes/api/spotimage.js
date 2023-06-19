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

      // Find the spot image
      const spotImage = await SpotImage.findByPk(imageId);

      if (!spotImage) {
        return res.status(404).json({ message: "Spot Image couldn't be found" });
      }

      const spot = await Spot.findByPk(spotImage.spotId);

      if (!spot) {
        return res.status(404).json({ message: "Spot couldn't be found" });
      }

      if (spot.ownerId !== userId) {
        return res.status(401).json({ error: "You do not own this spot" });
      }

      await spotImage.destroy();

      res.status(200).json({ message: "Successfully deleted" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });



module.exports = router;
