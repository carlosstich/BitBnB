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
const { Review, User, Spot, ReviewImage, Booking } = require("../../db/models");

const router = express.Router();

// //Get all bookings
// router.get('/:userId', requireAuth, async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     const bookings = await Booking.findAll({
//       where: { userId },
//       include: { model: Spot },
//     });

//     res.status(200).json({ Bookings: bookings });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

//get current users bookings
router.get("/current", requireAuth, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = req.user.id;
    const bookings = await Booking.findAll({
      where: { userId: userId },
    });

    res.status(200).json({ Bookings: bookings });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//edit a booking
router.put("/:bookingId", requireAuth, thisBookingRequest, async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const currentUser = req.user;
    const { startDate, endDate } = req.body;

    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking couldn't be found" });
    }

    if (booking.userId !== currentUser.id) {
      return res
        .status(401)
        .json({ message: "Unauthorized: You don't own this booking" });
    }

    if (booking.endDate < new Date()) {
      return res
        .status(403)
        .json({ message: "Past bookings can't be modified" });
    }

    const spotId = booking.spotId;
    const existingBookings = await Booking.findAll({
      where: {
        spotId,
      },
    });

    const conflictingBooking = existingBookings.find((existingBooking) => {
      if (
        (existingBooking.startDate <= endDate &&
          existingBooking.endDate >= startDate) ||
        (existingBooking.endDate >= startDate &&
          existingBooking.startDate <= endDate)
      ) {
        return true;
      }
      return false;
    });

    if (conflictingBooking) {
      return res.status(403).json({
        message: "Sorry, this spot is already booked for the specified dates",
        errors: {
          startDate: "Start date conflicts with an existing booking",
          endDate: "End date conflicts with an existing booking",
        },
      });
    }
    booking.startDate = startDate;
    booking.endDate = endDate;
    await booking.save();
    res.status(200).json(booking);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Delete that book
router.delete("/:bookingId", requireAuth, async (req, res) => {
  const bookingId = req.params.bookingId;
  const userId = req.user.id;
  const booking = await Booking.findByPk(bookingId, { include: Spot });

  if (!booking) {
    return res.status(404).json({ message: "Booking couldn't be found" });
  }

  if (booking.userId !== userId && booking.Spot.ownerId !== userId) {
    return res
      .status(403)
      .json({ message: "Unauthorized to delete this booking" });
  }

  if (booking.startDate <= new Date()) {
    return res
      .status(403)
      .json({ message: "Bookings that have been started can't be deleted" });
  }

  await booking.destroy();

  res.status(200).json({ message: "Successfully deleted" });
});

module.exports = router;
