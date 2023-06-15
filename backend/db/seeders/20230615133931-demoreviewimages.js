'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "ReviewImages";
    return queryInterface.bulkInsert(
      "ReviewImages",
      [
        {
          reviewId: 1,
          url: "carlosstich.com",
        },
        {
          reviewId: 2,
          url: "carlosstich.com",
        },
        {
          reviewId: 1,
          url: "carlosstich.com",
        },
      ],
      options
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ReviewImages', null, {});
  }
};
