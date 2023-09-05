'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "SpotImages"
    return queryInterface.bulkInsert(
      options,
      [
        // Spot 1
        {"spotId": 1, "url": "/images/inside1.png", "preview": true},
        {"spotId": 1, "url": "/images/inside2.png", "preview": false},
        {"spotId": 1, "url": "/images/inside3.png", "preview": false},
        {"spotId": 1, "url": "/images/inside4.png", "preview": false},
        {"spotId": 1, "url": "/images/inside5.png", "preview": false},

        // Spot 2
        {"spotId": 2, "url": "/images/inside6.png", "preview": true},
        {"spotId": 2, "url": "/images/inside7.png", "preview": false},
        {"spotId": 2, "url": "/images/inside8.png", "preview": false},
        {"spotId": 2, "url": "/images/inside9.png", "preview": false},
        {"spotId": 2, "url": "/images/inside10.png", "preview": false},

        // Spot 3
        {"spotId": 3, "url": "/images/inside11.png", "preview": true},
        {"spotId": 3, "url": "/images/inside12.png", "preview": false},
        {"spotId": 3, "url": "/images/inside13.png", "preview": false},
        {"spotId": 3, "url": "/images/inside14.png", "preview": false},
        {"spotId": 3, "url": "/images/inside15.png", "preview": false},

        // Spot 4
        {"spotId": 4, "url": "/images/inside16.png", "preview": true},
        {"spotId": 4, "url": "/images/inside17.png", "preview": false},
        {"spotId": 4, "url": "/images/inside18.png", "preview": false},
        {"spotId": 4, "url": "/images/inside19.png", "preview": false},
        {"spotId": 4, "url": "/images/inside20.png", "preview": false},

        // Spot 5
        {"spotId": 5, "url": "/images/inside21.png", "preview": true},
        {"spotId": 5, "url": "/images/inside1.png", "preview": false},
        {"spotId": 5, "url": "/images/inside2.png", "preview": false},
        {"spotId": 5, "url": "/images/inside3.png", "preview": false},
        {"spotId": 5, "url": "/images/inside4.png", "preview": false},

        // Spot 6
        {"spotId": 6, "url": "/images/inside5.png", "preview": true},
        {"spotId": 6, "url": "/images/inside6.png", "preview": false},
        {"spotId": 6, "url": "/images/inside7.png", "preview": false},
        {"spotId": 6, "url": "/images/inside8.png", "preview": false},
        {"spotId": 6, "url": "/images/inside9.png", "preview": false},
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpotImages', null, {});
  }
};
