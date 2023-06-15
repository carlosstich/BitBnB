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
const { Spot } = require("../../db/models");
const { Review } = require("../../db/models");

const {
  setTokenCookie,
  requireAuth,
  restoreUser,
} = require("../../utils/auth");
const { Spot } = require("../../db/models");

const router = express.Router();

//Get all the reveiwws from a current USer



// router.get("/current", requireAuth, async (req, res) => {
//     if (!req.user) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }
//     const user = req.user.id;
//     const reviews = await Review.findAll({
//         where: {userId: user},
//         include: Spot,
//     })
//     res.status(200).json({ Reviews: reviews})
// });

// router.post('/:spotId/reviews', requireAuth, thisReviewCorrect, async (req, res) => {
//     if (!req.user) {
//         return res.status(401).json({ error: "Unauthorized" });
//       }
//       const spotID = req.params.spotId
//       const { review, stars } = req.body
//       const newSpot = await Review.create({
//         spotId: spotID, userId: req.user.id, review, stars
//       })
//       res.status(201).json(newSpot)

// })

module.exports = router;
