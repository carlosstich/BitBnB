'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        spotId: 1,
        review: "Absolutely love this spot. The lighting is just perfect, especially during the golden hour. It's like a photographer's dream come true!",
        stars: 5.0,
      },
      {
        userId: 2,
        spotId: 1,
        review: "This place exceeded my expectations! I can’t wait to come back. The ambiance was lovely and the staff were really welcoming.",
        stars: 5.0,
      },
      {
        userId: 3,
        spotId: 2,
        review: "I wish I could live here. The atmosphere is serene and just disconnects you from the hustle and bustle of everyday life.",
        stars: 5.0,
      },
      {
        userId: 4,
        spotId: 2,
        review: "The spot was not bad, but it was a bit noisy during my visit. Perhaps I'll try coming at a different time.",
        stars: 3.5,
      },
      {
        userId: 5,
        spotId: 3,
        review: "The view from this place is just amazing. You can see the whole city, and the sunset was just breathtaking.",
        stars: 4.5,
      },
      {
        userId: 6,
        spotId: 3,
        review: "Good spot for a short stay. The amenities were decent, and the location was convenient. Could use a bit more cleaning though.",
        stars: 4.0,
      },
      {
        userId: 4,
        spotId: 4,
        review: "The spot was very clean and well-maintained. The management really takes care of the place and it shows.",
        stars: 5.0,
      },
      {
        userId: 3,
        spotId: 4,
        review: "I felt that the spot was a bit overpriced for what you get. It's nice but doesn't quite justify the high price tag.",
        stars: 3.0,
      },
      {
        userId: 2,
        spotId: 5,
        review: "Excellent service from start to finish. The staff went out of their way to make sure we were comfortable.",
        stars: 5.0,
      },
      {
        userId: 1,
        spotId: 5,
        review: "Great spot, very cozy and welcoming. I enjoyed my time here and would definitely come again in the future.",
        stars: 4.5,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {});
  },
};
