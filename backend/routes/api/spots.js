const express = require("express");
const bcrypt = require("bcryptjs");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { theseSpotsCorrect } = require("./validators");

const {
  setTokenCookie,
  requireAuth,
  restoreUser,
} = require("../../utils/auth");
const { Spot, Review, SpotImage } = require("../../db/models");

const router = express.Router();

router.get("/", async (req, res) => {
  const spots = await Spot.findAll();
  res.status(200).json({ Spots: spots });
  });

router.get("/current", requireAuth, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const userId = req.user.id;
    const spots = await Spot.findAll({
      where: { ownerId: userId },
    });

    res.status(200).json({ Spots: spots });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:spotId", async (req, res) => {

  const options = {
    include: [
        {
            model: SpotImage,
            attributes: ['id', 'url', 'preview']
        },
    ]};

  try {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(req.params.spotId, options
    );
    if (!spot) {
      return res.status(404).json({ message: "Spot couldnt be found" });
    }
    res.status(200).json({ Spot: spot });
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
});

router.put("/:spotId", requireAuth, theseSpotsCorrect, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  //Chekc if spot
  //grab this spot
  const spotId = req.params.spotId;
  const spot = await Spot.findByPk(spotId);
  const { address, city, state, country, lat, lng, name, description, price } =
    req.body;

  if (!spot) {
    return res.status(404).json({ message: "Spot count be found" });
  }
  if (spot.ownerId !== req.user.id) {
    return res.status(401).json({ error: "Current user doesnt own spot" });
  }
  spot.address = address;
  spot.city = city;
  spot.state = state;
  spot.country = country;
  spot.lat = lat;
  spot.lng = lng;
  spot.name = name;
  spot.description = description;
  spot.price = price;
  await spot.save();
  res.status(200).json({ spot });
});

router.post("/", requireAuth, theseSpotsCorrect, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const { address, city, state, country, lat, lng, name, description, price } = req.body;
  const record = await Spot.create({
    ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price,
  });
  res.status(201).json(record);
});


router.delete('/:spotId', requireAuth, async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId)

  if (!spot) {
    return res.status(404).json({ message: "Spot Couldnt be found "})
  }
  Spot.destroy({
    where: {
      id: spotId
    }
  })
  res.status(200).json({ message: "Successfully deleted"})
}
  catch (error) {
    res.status(500).json({ error: "Internal Server error"})
  }
})

router.get('/:spotId/reviews', async (req, res) => {
  const { spotId } = req.params
  const reviews = await Review.findAll( {
    where: {spotId: spotId}
  } )
  if (!reviews) {
    return res.status(404).json({ message: "Spot couldnt be found"})
  }
  res.status(200).json({ Review: reviews})

})


module.exports = router;
