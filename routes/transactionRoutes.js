const express = require("express");
const {
  getAll,
  getPembayaran,
  createSantriSPP,
} = require("../controllers/transactionController");
const routes = express.Router();

routes.get("/", getAll);
routes.get("/pembayaran", getPembayaran);
routes.post("/spp", createSantriSPP);

module.exports = { transactionRoutes: routes };
