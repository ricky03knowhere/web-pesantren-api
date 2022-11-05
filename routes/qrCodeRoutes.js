const express = require("express");
const { generate, validate } = require("../controllers/qrCodeController");

const routes = express.Router();

routes.post("/generate", generate);
routes.post("/validate", validate);

module.exports = { QRCodeRoutes: routes };
