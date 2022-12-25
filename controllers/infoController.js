const { models } = require("../models");
const { User, Kegiatan, Kitab, Ekstrakulikuler, Biaya } = models;

exports.getPengajar = async (req, res) => {
  const data = await User.find({
    position: {
      $not: {
        $regex: "santri",
      },
    },
  });
  res.status(200).json(data);
};

exports.getSantri = async (req, res) => {
  const data = await User.find({ position: "santri" });
  res.status(200).json(data);
};

exports.getKegiatan = async (req, res) => {
  const data = await Kegiatan.find();
  res.status(200).json(data);
};

exports.getKitab = async (req, res) => {
  const data = await Kitab.find();
  res.status(200).json(data);
};

exports.getEkstra = async (req, res) => {
  const data = await Ekstrakulikuler.find();
  res.status(200).json(data);
};

exports.getBiaya = async (req, res) => {
  const data = await Biaya.find();
  res.status(200).json(data);
};
