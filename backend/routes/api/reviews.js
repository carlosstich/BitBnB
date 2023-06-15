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



module.exports = router;
