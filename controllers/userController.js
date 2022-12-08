const { models } = require("../models");
const { createSantriSPP } = require("./transactionController");
const { User, Pembayaran } = models;

exports.getAll = async (req, res) => {
  const data = await User.find()
    .then((data) => data)
    .catch((err) => console.log(err));

  return res.status(200).json(data);
};

exports.santriRegstration = async (req, res) => {
  const userId = req.params.id;
  await User.updateOne({ _id: userId }, req.body)
    .then((data) => {
      console.log("Santri Registration successfuly done...");
    })
    .catch((err) => console.log(err));

  const { gender } = await User.findOne({ _id: userId });

  await createSantriSPP(userId, gender);

  res.status(200).json({ message: "santri registerd successfuly." });
};
