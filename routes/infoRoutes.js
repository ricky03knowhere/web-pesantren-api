const express = require("express");
const {
  getPengajar,
  getKegiatan,
  getKitab,
  getEkstra,
  getBiaya,
} = require("../controllers/infoController");

const routes = express.Router();

routes.get("/pengajar", getPengajar);
routes.get("/kegiatan", getKegiatan);
routes.get("/kitab", getKitab);
routes.get("/ekstra", getEkstra);
routes.get("/biaya", getBiaya);

module.exports = { infoRoutes: routes };
