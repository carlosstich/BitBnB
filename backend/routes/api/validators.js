const { check, validationResult } = require("express-validator");

const theseSpotsCorrect = [
  check("address").notEmpty().withMessage("Street address is required"),
  check("city").notEmpty().withMessage("City is required"),
  check("state").notEmpty().withMessage("State is required"),
  check("country").notEmpty().withMessage("Country is required"),
  check("lat").notEmpty().withMessage("Latitude is not valid"),
  check("lng").notEmpty().withMessage("Longitude is not valid"),
  check("name").notEmpty().withMessage("Name must be less than 50 characters"),
  check("description").notEmpty().withMessage("Description is required"),
  check("price").notEmpty().withMessage("Price per day is required"),
];

const thisReviewCorrect = [
  check("review").notEmpty().withMessage("Review text is required"),
  check("stars").notEmpty().isInt({min:1, max: 5}).withMessage("Stars must be an integer from 1 to 5")
]

module.exports = {
  theseSpotsCorrect,
  thisReviewCorrect
};
