"use strict";

const { postCodeFactory } = require("../factories/dataFactory");

module.exports = {
  up: (models, mongoose) => {
    return models.PostCode.bulkWrite(postCodeFactory(12)).then((res) => {
      // Prints "1"
      console.log(res.insertedCount);
    });
  },

  down: (models, mongoose) => {
    return models.PostCode.bulkWrite([
      {
        deleteOne: {},
      },
    ]).then((res) => {
      // Prints "1"
      console.log(res.deletedCount);
    });
  },
};
