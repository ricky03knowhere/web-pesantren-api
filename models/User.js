"use strict";

const { Schema } = require("mongoose");

module.exports = async (mongoose) => {
  const newSchema = new mongoose.Schema(
    {
      // posCodeId: {
      //   type: Schema.Types.ObjectId,
      //   ref: "postCodes",
      // },
      email: {
        type: String,
        unique: true,
      },
      password: {
        type: String,
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
      name: {
        type: String,
      },
      phone: {
        type: String,
        default: null,
      },
      gender: {
        type: String,
        default: null,
      },
      address: {
        type: String,
        default: null,
      },
      position: {
        type: String,
        default: 'guest',
      },
      birthDate: {
        type: Date,
        default: null,
      },
      profession: {
        type: String,
        default: null,
      },
      address: {
        type: String,
        default: null,
      },
      education: {
        type: Array,
        default: null,
      },
      socials: {
        type: Array,
        default: null,
      },
      picture: {
        type: String,
        default: 'user.webp',
      },
    },
    {
      timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
      },
    }
  );
  const User = await mongoose.model("User", newSchema);
  return User;
};
