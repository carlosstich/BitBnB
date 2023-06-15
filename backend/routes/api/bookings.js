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
const { Review, User, Spot, ReviewImage, Booking } = require("../../db/models");

const router = express.Router();

router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Assuming you have a way to authenticate the current user and retrieve their ID
    // You can use the `userId` to fetch the bookings associated with the user
    const bookings = await Booking.findAll({
      where: { userId },
      include: [{ model: Spot }],
    });

    res.status(200).json({ Bookings: bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



module.exports = router;
