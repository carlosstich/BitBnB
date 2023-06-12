'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: "insertaURLhere.com",
        preview: true
      },
      {
        spotId: 2,
        url: "insertaURLhere.com",
        preview: false
      },
      {
        spotId: 3,
        url: "insertaURLhere.com",
        preview: false
      },
    ], {});
  },
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SpotImages', null, {});
  }
};
