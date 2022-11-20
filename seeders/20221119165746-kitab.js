"use strict";

const { kitabFactory } = require("../factories/dataFactory");

module.exports = {
  up: (models, mongoose) => {
    return models.Kitab.bulkWrite(kitabFactory).then((res) => {
      // Prints "1"
      console.log(res.insertedCount);
    });
  },

  down: (models, mongoose) => {
    return models.Kitab.bulkWrite([
      {
        deleteOne: {},
      },
    ]).then((res) => {
      // Prints "1"
      console.log(res.deletedCount);
    });
  },
};
