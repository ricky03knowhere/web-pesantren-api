"use strict";

const { kegiatanFactory } = require("../factories/dataFactory");

module.exports = {
  up: (models, mongoose) => {
    return models.Kegiatan.bulkWrite(kegiatanFactory).then((res) => {
      // Prints "1"
      console.log(res.insertedCount);
    });
  },

  down: (models, mongoose) => {
    return models.Kegiatan.bulkWrite([
      {
        deleteOne: {},
      },
    ]).then((res) => {
      // Prints "1"
      console.log(res.deletedCount);
    });
  },
};
