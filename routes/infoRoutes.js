const express = require("express");
const {
  getPengajar,
  getKegiatan,
  getKitab,
  getEkstra,
  getBiaya,
  getSantri,
  EditBiaya,
} = require("../controllers/infoController");

const routes = express.Router();

routes.get("/pengajar", getPengajar);
routes.get("/santri", getSantri);
routes.get("/kegiatan", getKegiatan);
routes.get("/kitab", getKitab);
routes.get("/ekstra", getEkstra);

routes.get("/biaya", getBiaya);
routes.put("/biaya", EditBiaya);

module.exports = { infoRoutes: routes };
