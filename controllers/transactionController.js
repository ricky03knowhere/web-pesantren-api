const { models } = require("../models");
const { Pembayaran, Biaya } = models;

exports.getAll = async (req, res) => {
  const data = await Pembayaran.find()
    .then((data) => data)
    .catch((err) => console.log(err));

  return res.status(200).json(data);
};

exports.getPembayaran = async (req, res) => {
  const userId = req.params.id;
  const data = await Pembayaran.find({ where: { userId: userId } })
    .then((data) => data)
    .catch((err) => console.log(err));

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
    userId: userId,
    type: "spp",
    price: price[0].total,
    dueDate: new Date(new Date().getTime() + i * 2592000000),
    status: false,
  }));

  await Pembayaran.create({
    userId: userId,
    type: "pendaftaran",
    price: 800000,
    dueDate: new Date(new Date().getTime() + 86400000),
    status: false,
  });

  await Pembayaran.insertMany(data)
    .then(() => console.log("SPP inserted successfuly."))
    .catch((err) => console.log(err));
};

exports.paySPP = async (req, res) => {
  const id = req.body.id
  Pembayaran.findOneAndUpdate({where: {_id : id}}, req.body)
}