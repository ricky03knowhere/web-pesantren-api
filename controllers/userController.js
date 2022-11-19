const { models } = require("../models");
const { User } = models;

exports.getAll = async (req, res) => {
  const data = await User.find()
    .then((data) => data)
    .catch((err) => console.log(err));

  return res.status(200).json(data);
};
