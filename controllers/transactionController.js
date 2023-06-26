const { models, mongoose, mongo } = require("../models");
const { Pembayaran, Biaya } = models;
var fs = require("fs");
var path = require("path");

exports.getAll = async (req, res) => {
  const data = await Pembayaran.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
  ])
    .then((data) => data)
    .catch((err) => console.log(err));

  return res.status(200).json(data);
};

exports.getPembayaran = async (req, res) => {
  const userId = req.params.id;
  const data = await Pembayaran.aggregate([
    { $match: { userId: mongo.ObjectId(userId) } },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
  ])
    .then((data) => data)
    .catch((err) => console.log(err));

  // console.log(data);
  return res.status(200).json(data);
};

exports.createSantriSPP = async (userId, gender) => {
  const getBiaya = await Biaya.aggregate([
    {
      $group: {
        _id: "$type",
        total: {
          $sum: "$price",
        },
      },
    },
  ]).then((data) => data);

  const price = getBiaya.filter((el) => el._id === gender);

  const data = [...Array(12)].map((el, i) => ({
    userId: mongoose.Types.ObjectId(userId),
    type: "spp",
    price: price[0].total,
    dueDate: new Date(new Date().getTime() + i * 2592000000),
    status: "unpaid",
  }));

  await Pembayaran.create({
    userId: mongoose.Types.ObjectId(userId),
    type: "pendaftaran",
    price: 800000,
    dueDate: new Date(new Date().getTime() + 86400000),
    status: "unpaid",
  });

  await Pembayaran.insertMany(data)
    .then(() => console.log("SPP inserted successfuly."))
    .catch((err) => console.log(err));
};

exports.paySPP = async (req, res, next) => {
  const id = req.body.id;
  const data = { ...req.body, picture: req.file.filename };

  console.log("data ==>> ", data);
  await Pembayaran.findOneAndUpdate({ _id: id }, data)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));

  res.status(200).json("SPP successfuly paid.");
};

exports.verification = async (req, res) => {
  const id = req.body.id;
  await Pembayaran.findOneAndUpdate({ _id: id }, req.body)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));

  res.status(200).json("SPP successfuly verificated.");
};
