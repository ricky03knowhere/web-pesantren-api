const express = require("express");
const {
  getAll,
  santriRegstration,
  getOne,
} = require("../controllers/userController");

const routes = express.Router();

routes.get("/", getAll);
routes.get("/:id", getOne);
routes.post("/register/:id", santriRegstration);

module.exports = { userRoutes: routes };
