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

//Add an image to a review based on the review;s id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { url } = req.body;

    const review = await Review.findByPk(reviewId);
    if (!review) {
      return res.status(404).json({ message: "Review couldn't be found" });
    }
    if (review.userId !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized - Review doesn't belong to the current user" });
    }
    const newImage = await ReviewImage.create({
      reviewId: reviewId,
      url: url
    });

    res.status(200).json(newImage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.delete('/:reviewId', requireAuth, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const ourReviewId = req.params.reviewId;

  const searchReview = await Review.findByPk(ourReviewId)

  if (!searchReview) {
    res.status(404).json({ message: "Review couldnt be found"})
  }
  if (searchReview.userId !== req.user.id) {
    res.status(401).json({ error: "you dont own this review"})
  }

  await searchReview.destroy()
  res.status(200).json({ message: "Successfully deleted"})
})

router.delete('/:reviewId/image', requireAuth, async (req, res) => {
  const { reviewId } = req.params;
  const userId = req.user.id; // Assuming the authenticated user's ID is stored in req.user

  // Check if the review with the specified ID exists
  const review = await Review.findByPk(reviewId, { include: ReviewImage });
  if (!review) {
    return res.status(404).json({ message: 'Review couldn\'t be found' });
  }

  // Check if the review belongs to the current user (authorization check)
  if (review.userId !== userId) {
    return res.status(403).json({ message: 'You are not authorized to delete the image for this review' });
  }

  // Check if the review has any images in the ReviewImages array
  if (review.ReviewImages.length === 0) {
    return res.status(404).json({ message: 'Review Image couldn\'t be found' });
  }

  // Delete the first image in the ReviewImages array (you can adjust the logic based on your requirements)
  const imageToDelete = review.ReviewImages[0];
  await imageToDelete.destroy();

  res.status(200).json({ message: 'Successfully deleted' });
});



module.exports = router;
