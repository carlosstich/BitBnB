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
            "Welcome to our charming and cozy oasis in the heart of New Orleans! Nestled in the vibrant Marigny neighborhood, just blocks from the famous French Quarter and Frenchmen Street, this beautifully renovated one-bedroom apartment offers the perfect blend of classic Southern comfort and modern amenities. Step inside to find a spacious living area adorned with local art, a fully-equipped kitchen for your culinary adventures, and a private courtyard where you can sip your morning coffee to the sound of distant jazz. Enjoy complimentary Wi-Fi, a Smart TV, and luxurious linens as you relax in a space thoughtfully designed to be your home away from home. Whether you're here for the music, the food, or the rich cultural tapestry, our place offers convenient access to the best of the Big Easy. Book now and let your NOLA adventure begin!",
          price: 200,
          avgRating: 4,
          previewImage: "/images/nick.png"
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
            "Experience the soul of New Orleans in our delightful Garden District abode! This two-bedroom gem features an open-concept living space, antique furnishings, and a modern kitchen perfect for the budding chef. Step out onto the wrap-around balcony for stunning views of historic mansions and ancient oaks, or take a short stroll to Magazine Street, famous for its eclectic shops and gourmet eateries. Our home is also just a quick streetcar ride away from the bustling French Quarter. With amenities like high-speed Wi-Fi, a washer/dryer, and a curated local guidebook, you’ll have everything you need for a memorable stay in the Crescent City.",
          price: 500,
          avgRating: 4,
          previewImage: "/images/nick2.png"
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
            "Immerse yourself in the cultural richness of New Orleans by staying in our stylish loft located in the Warehouse District. This contemporary space boasts industrial design elements, exposed brick walls, and floor-to-ceiling windows that let in an abundance of natural light. Just steps away from world-class galleries, the WWII Museum, and some of the city’s trendiest bars and restaurants, our loft offers the ideal base for explorers and business travelers alike. Take advantage of amenities like a rooftop pool, a state-of-the-art gym, and secure parking. Come stay with us and discover the modern side of New Orleans, while still being only minutes away from its historic heart.",
          price: 300,
          avgRating: 3,
          previewImage: "/images/nick3.png"
        },
        {
          ownerId: 4,
          address: "1604 lakewood dr",
          city: "Slidell",
          state: "Louisiana",
          country: "United States",
          lat: 30.960226,
          lng: -90.058854,
          name: "Historic Jazz Quarter Loft",
          description:
            "Discover the charm of Slidell, Louisiana, from our cozy one-bedroom apartment, ideally situated between the vibrant culture of New Orleans and the tranquil beauty of the Gulf Coast. Whether you're in town for business, outdoor adventures, or simply seeking a peaceful retreat, 'Bayou Haven' provides the perfect home base. Stay in the suburbs of New orleans. real fun",
          price: 150,
          avgRating: 3,
          previewImage: "/images/slidell.png"
        },
        {
          ownerId: 5,
          address: "101 Bourbon St",
          city: "New Orleans",
          state: "Louisiana",
          country: "United States",
          lat: 29.958443,
          lng: -90.064411,
          name: "Bourbon Street Hideout",
          description: `
            Indulge in a private guest suite that sets the stage for your perfect romantic getaway, family weekend, or an unforgettable exploration of the wonders of NOLA with friends.\n
            \n
            Step into your retreat through a lush green walkway, and be greeted by a bright, clean, and vibrantly decorated suite. The inviting living room showcases original hardwood floors, a Roku Smart TV, high-speed internet, and a spacious, comfortable couch that effortlessly transforms into a queen bed if needed. Need to catch up on work? A small desk with a charging station is at your disposal. Or simply unwind and admire the tropical backyard view while surrounded by captivating original local art.\n
            \n
            Enter the tastefully appointed bedroom featuring a brand new, 5-star hotel-quality queen pillow-top mattress adorned with four fluffy pillows and silky breathable sheets. For added convenience, you'll find a luggage rack, storage bench, two wooden chairs, and a solid cedar wardrobe to keep your clothes neat and fresh. For added peace of mind, a key is provided to lock any valuables.\n
            \n
            The suite offers both heating and air conditioning units, along with ceiling fans in each room, and original wooden windows that can be opened to let in the delightful southern breeze. Revel in the ceramic-tiled kitchen and bathroom, while the living room and bedroom boast beautiful original hardwood oak flooring.\n
            \n
            The well-equipped kitchen invites you to unleash your culinary creativity, featuring a wonderful gas stove, full side-by-side fridge/freezer, microwave, coffee maker, and an array of pots, pans, and cooking utensils, ensuring you have everything you need to prepare a traditional southern meal.\n
          `,
          price: 250,
          avgRating: 5,
          previewImage: "/images/nick4.png"
        },
        {
          ownerId: 6,
          address: "202 Bayou Rd",
          city: "Baton Rouge",
          state: "Louisiana",
          country: "United States",
          lat: 30.451468,
          lng: -91.187147,
          name: "Bayou Cottage",
          description:
            "Embrace style and history at this centrally-located gem. It’s exactly 5 blocks from the historic French Quarter! Unwind in a charming, half of a historic shotgun designed for your comfort. Enjoy a fully equipped kitchen, gas stove, full-size fridge, and all cooking essentials. Refresh in the spacious bathroom with a large, invigorating shower and plush towels. Sink into the cozy couch, perfect for TV or book time. Rejuvenate on the plush queen-size bed. Perfect blend of comfort and cozy charm!",
          price: 180,
          avgRating: 4.5,
          previewImage: "/images/nick5.png"
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Spots', null, {});
  },
};
