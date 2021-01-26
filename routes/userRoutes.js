const express = require("express");

const userControllers = require("../controllers/userController");

const route = express.Router();

route.post("/adduser", userControllers.postUser);

route.get(
  "/getuserbymobilenumber/:mobNo",
  userControllers.getUserByMobileNumber
);

route.get("/getallusers", userControllers.getallusers);

module.exports = route;
