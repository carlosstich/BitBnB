"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  

}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Spots"
    return queryInterface.bulkInsert(
      options,
      [
        {
          ownerId: 1,
          address: "123 Frenchmen St",
          city: "New Orleans",
          state: "Louisiana",
          country: "United States",
          lat: 29.9610972,
          lng: -90.0570562,
          name: "French Quarter Casa",
          description:
            "Experience the charm of the French Quarter with this cozy pad",
          price: 200,
          avgRating: 4,
          previewImage: "imageurl"
        },
        {
          ownerId: 2,
          address: "456 Magazine St",
          city: "New Orleans",
          state: "Louisiana",
          country: "United States",
          lat: 29.943276,
          lng: -90.067732,
          name: " Garden District Mansion",
          description:
            "Indulge in luxury at this stunning thang",
          price: 500,
          avgRating: 4,
          previewImage: "imageurl"
        },
        {
          ownerId: 3,
          address: "789 Frenchmen St",
          city: "New Orleans",
          state: "Louisiana",
          country: "United States",
          lat: 29.960226,
          lng: -90.058854,
          name: "Historic Jazz Quarter Loft",
          description:
            "Immerse yourself in the rich jazz culture of New Orleans with a stay in this spot",
          price: 300,
          avgRating: 3,
          previewImage: "imageurl"
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Spots', null, {});
  },
};
