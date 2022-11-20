"use strict";

const { ekstrakulikulerFactory } = require("../factories/dataFactory");

module.exports = {
  up: (models, mongoose) => {
    return models.Ekstrakulikuler.bulkWrite(ekstrakulikulerFactory).then(
      (res) => {
        // Prints "1"
        console.log(res.insertedCount);
      }
    );
  },

  down: (models, mongoose) => {
    return models.Ekstrakulikuler.bulkWrite([
      {
        deleteOne: {},
      },
    ]).then((res) => {
      // Prints "1"
      console.log(res.deletedCount);
    });
  },
};
