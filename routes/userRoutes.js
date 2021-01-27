const express = require("express");

const userControllers = require("../controllers/userController");

const route = express.Router();

route.post("/adduser", userControllers.postUser);

route.post(
  "/getuserbymobilenumber/:mobNo",
  userControllers.getUserByMobileNumber
);
//post

route.get("/getallusers", userControllers.getallusers);

route.put("/updateinteraction/:userId", userControllers.updateInteractions);

module.exports = route;
