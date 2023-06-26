const express = require("express");
const {
  getAll,
  getPembayaran,
  createSantriSPP,
  paySPP,
  verification,
} = require("../controllers/transactionController");
const { uploadImage } = require("../middleware");
const routes = express.Router();

routes.get("/pembayaran", getAll);
routes.get("/pembayaran/:id", getPembayaran);
routes.post("/spp", createSantriSPP);
routes.post("/spp/pay", uploadImage.single("picture"), paySPP);
routes.put("/spp/verification", verification);

module.exports = { transactionRoutes: routes };
