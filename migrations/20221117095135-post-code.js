"use strict";

module.exports = {
  async up(models, mongoose) {
    await mongoose.creataTable(
      "postCodes",
      {
        provinsi: {
          type: String,
        },
        kota: {
          type: String,
        },
        kecamatan: {
          type: String,
        },
        desa: {
          type: String,
        },
      },
      {
        timestamps: {
          createdAt: "created_at",
          updatedAt: "updated_at",
        },
      }
    );
  },
  async down(models, mongoose) {
    await mongoose.dropTable("postCode");
  },
};
