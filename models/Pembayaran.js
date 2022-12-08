"use strict";

const { Schema } = require("mongoose");

module.exports = (mongoose) => {
  const newSchema = new mongoose.Schema(
    {
      userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users",
      },
      type: {
        type: String,
      },
      price: {
        type: Number,
      },
      payDate: {
        type: Date,
        required: false,
      },
      dueDate: {
        type: Date,
        required: true,
      },
      status: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    {
      timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
      },
    }
  );
  const Pembayaran = mongoose.model("Pembayaran", newSchema);
  return Pembayaran;
};
