"use strict";
module.exports = async (mongoose) => {
  const newSchema = new mongoose.Schema(
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
  const PostCode = await mongoose.model("PostCode", newSchema);
  return PostCode;
};
