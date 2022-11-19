"use strict";

const { userFactory } = require("../factories/dataFactory");

module.exports = {
  up: (models, mongoose) => {
    // console.log("userFactory ==>> ", userFactory());
    return models.User.bulkWrite(userFactory()).then((res) => {
      // Prints "1"
      console.log(res.insertedCount);
    });
  },

  down: (models, mongoose) => {
    return models.User.bulkWrite([
      {
        deleteOne: {},
      },
    ]).then((res) => {
      // Prints "1"
      console.log(res.deletedCount);
    });
  },
};
