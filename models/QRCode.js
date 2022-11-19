"use strict";
const { Schema } = require("mongoose");

module.exports = (mongoose) => {
  const newSchema = new mongoose.Schema({
    qrCodeId: {
      type: String,
      // required: true,
      // ref: "users",
    },
    connectedDeviceId: {
      type: Schema.Types.ObjectId,
      ref: "connectedDevices",
    },
    lastUsedDate: { type: Date, default: null },
    isActive: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  });
  const QRCode = mongoose.model("QRCode", newSchema);
  return QRCode;
};
