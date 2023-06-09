'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews"
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        spotId: 1,
        "review": "Love this spot. Great lighting!",
        "stars": 5.0
      },
      {
        userId: 2,
        spotId: 1,
        "review": "Would reccomend this place \nCan’t wait to come back!",
        "stars": 5.0
      },
      {
        userId: 3,
        spotId: 2,
        "review": "I wish i could live here",
        "stars": 5.0
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews', null, {});
  }
};
