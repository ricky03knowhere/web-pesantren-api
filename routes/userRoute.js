const express = require("express");
const { getAll, santriRegstration } = require("../controllers/userController");

const routes = express.Router();

routes.get("/", getAll);
routes.post("/register/:id", santriRegstration);

module.exports = { userRoutes: routes };
