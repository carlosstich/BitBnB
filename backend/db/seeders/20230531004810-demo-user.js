'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
  options.tableName = "Users"
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableName = 'Users';
    return queryInterface.bulkInsert(tableName, [
      {
        email: 'demo@user.io',
        userName: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@user.io',
        userName: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        userName: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], options);
  },

  down: async (queryInterface, Sequelize) => {
    const tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(tableName, {
      userName: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, options);
  }
};
