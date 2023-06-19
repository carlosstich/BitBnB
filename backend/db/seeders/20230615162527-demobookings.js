'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  

}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Bookings"
    return queryInterface.bulkInsert(
      options,
      [
        {
          spotId: 1,
          userId: 1,
          startDate: '2023-06-01',
          endDate: '2023-06-04',
          },
        {
          spotId: 2,
          userId: 2,
          startDate: '2023-06-01',
          endDate: '2023-06-05',
          },
        {
        spotId: 1,
        userId: 1,
        startDate: '2023-06-01',
        endDate: '2023-06-03',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Bookings', null, {});
  },
};
