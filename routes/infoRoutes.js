const express = require("express");
const {
  getPengajar,
  getKegiatan,
  getKitab,
  getEkstra,
} = require("../controllers/infoController");

const routes = express.Router();

routes.get("/pengajar", getPengajar);
routes.get("/kegiatan", getKegiatan);
routes.get("/kitab", getKitab);
routes.get("/ekstra", getEkstra);

module.exports = { infoRoutes: routes };
