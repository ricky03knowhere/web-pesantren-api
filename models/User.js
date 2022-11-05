"use strict";

module.exports = (mongoose) => {
  const newSchema = new mongoose.Schema(
    {
      posCodeId: {
        type: Number,
      },
      email: {
        type: String,
        unique: true,
      },
      password: {
        type: String,
      },
      isAdmin: {
        type: Boolean,
      },
      name: {
        type: String,
      },
      phone: {
        type: String,
        default: null,
      },
      address: {
        type: String,
        default: null,
      },
      position: {
        type: String,
        default: null,
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
        default: null,
      },
    },
    {
      timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
      },
    }
  );
  const User = mongoose.model("User", newSchema);
  return User;
};
