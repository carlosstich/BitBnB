'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object

}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = "SpotImages"
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          url: "carlosstich.com",
          preview: true,
        },
        {
          spotId: 1,
          url: "carlosstich.com",
          preview: true,
        },
        {
          spotId: 1,
          url: "carlosstich.com",
          preview: true,
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('SpotImages', null, {});
  }
};
