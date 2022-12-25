const { models } = require("../models");
const { createSantriSPP } = require("./transactionController");
const { User, Pembayaran } = models;

exports.getAll = async (req, res) => {
  const data = await User.find()
    .then((data) => data)
    .catch((err) => console.log(err));

  return res.status(200).json(data);
};

exports.getOne = async (req, res) => {
  const id = req.params.id;
  const data = await User.findOne({ _id: id })
    .then((data) => data)
    .catch((err) => console.log(err));

  return res.status(200).json(data);
};

exports.santriRegstration = async (req, res) => {
  const userId = req.params.id;

  const test = await User.findOne({ _id: userId }).then((data) => data);
  console.log("test  ==>> ", test);
  await User.updateOne({ _id: userId }, req.body)
    .then((data) => {
      console.log(data);
    })
    .catch((err) => console.log(err));

  const { gender } = await User.findOne({ _id: userId });

  await createSantriSPP(userId, gender);

  res.status(200).json({ message: "santri registerd successfuly." });
};
