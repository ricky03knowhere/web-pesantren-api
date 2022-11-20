"use strict";

const { biayaFactory } = require("../factories/dataFactory");

module.exports = {
  up: (models, mongoose) => {
    return models.Biaya.bulkWrite(biayaFactory).then((res) => {
      // Prints "1"
      console.log(res.insertedCount);
    });
  },

  down: (models, mongoose) => {
    return models.Biaya.bulkWrite([
      {
        deleteOne: {},
      },
    ]).then((res) => {
      // Prints "1"
      console.log(res.deletedCount);
    });
  },
};
