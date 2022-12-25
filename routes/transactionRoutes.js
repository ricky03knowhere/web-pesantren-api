const express = require("express");
const {
  getAll,
  getPembayaran,
  createSantriSPP,
  paySPP,
  verification,
} = require("../controllers/transactionController");
const routes = express.Router();

routes.get("/pembayaran", getAll);
routes.get("/pembayaran/:id", getPembayaran);
routes.post("/spp", createSantriSPP);
routes.put("/spp/pay", paySPP);
routes.put("/spp/verification", verification);

module.exports = { transactionRoutes: routes };
