const express = require("express");
const { getAll } = require("../controllers/userController");

const routes = express.Router();

routes.get("/", getAll);

module.exports = { UserRoutes: routes };
