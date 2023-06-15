"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object

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
          name: "French Quarter Charm",
          description:
            "Experience the charm of the French Quarter with this cozy and beautifully decorated apartment. Located just steps away from iconic landmarks, jazz clubs, and delicious Creole cuisine, this spot is perfect for immersing yourself in the vibrant culture of New Orleans. Enjoy the lively atmosphere during the day and unwind in the comfort of your private oasis at night.",
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
          name: "Luxurious Garden District Mansion",
          description:
            "Indulge in luxury at this stunning mansion located in the historic Garden District. Immerse yourself in the elegance and grandeur of the old-world charm combined with modern amenities. This spacious mansion features beautifully appointed rooms, a lush garden with a pool, and a rooftop terrace with panoramic views of the city. Experience the epitome of New Orleans luxury living during your stay.",
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
            "Immerse yourself in the rich jazz culture of New Orleans with a stay in this historic loft located in the heart of the Jazz Quarter. The loft features exposed brick walls, high ceilings, and vintage decor that reflects the spirit of the city. Step outside and find yourself surrounded by renowned jazz clubs, iconic bars, and mouthwatering Cajun and Creole restaurants. Live the true New Orleans experience at this charming loft.",
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
