const express = require("express");
const {
  generate,
  validate,
  activeDevice,
  loggedUser,
  loggoutUser,
} = require("../controllers/qrCodeController");

const routes = express.Router();

routes.post("/generate", generate);
routes.post("/validate", validate);
routes.get("/activeDevice", activeDevice);
routes.get("/loggedUser", loggedUser);
routes.put("/logoutUser/:id", loggoutUser);

module.exports = { qrCodeRoutes: routes };
