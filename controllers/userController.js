const User = require("../models/usermodel");

const fs = require("fs");
const Joi = require("joi");
const { json } = require("body-parser");
const { query } = require("express");

const postUser = async (req, res, next) => {
  try {
    userId = req.body.UserID;
    //console.log(userId);
    const options = {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    };
    const { error, value } = User.validate(req.body, options);

    if (error) {
      res.send(error.details[0].message);
    } else if (value) {
      const allUsers = getUsers();
      const findUser = allUsers.filter((user) => user.UserID === userId);
      //console.log(findUser);
      if (findUser.length == 0) {
        allUsers.push(value);
        saveUsers(allUsers);
        res.send(value);
      } else {
        res.send({ message: "user with ID already exists" });
      }
    }
  } catch (err) {
    //console.log(err);
  }
};

const getUserByMobileNumber = async (req, res, next) => {
  const allusers = getUsers();
  mobNo = parseInt(req.params.mobNo);
  const findUser = allusers.filter((user) => user.MobileNo === mobNo);
  if (findUser.length == 0) {
    return res.status(409).send({ error: true, msg: "user does not exist" });
  } else {
    return res.status(200).json(findUser);
  }
};

const getallusers = async (req, res, next) => {
  const allusers = getUsers();
  const method = req.query.method;
  const type = req.query.type;
  const from = parseInt(req.query.from);
  const to = parseInt(req.query.to);
  if (method == "Age" && to > from) {
    const findUser = allusers.filter(
      (user) => user[method] >= from && user[method] <= to
    );
    if (findUser.length == 0) {
      return res
        .status(409)
        .send({ error: true, msg: "method or type does not match" });
    } else {
      return res.status(200).json(findUser);
    }
  } else {
    const findUser = allusers.filter((user) => user[method] === type);
    if (findUser.length == 0) {
      return res
        .status(409)
        .send({ error: true, msg: "method or type does not match" });
    } else {
      return res.status(200).json(findUser);
    }
  }
};

const updateInteractions = async (req, res, next) => {
  const allusers = getUsers();
  userId = req.params.userId;
  const findUser = allusers.filter((user) => user.UserID === userId);
  if (findUser.length == 0) {
    return res.status(409).send({ error: true, msg: "user does not exist" });
  } else {
    updatedUser = allusers.map((user) => {
      if (user.UserID == userId) {
        user.Interactions.push(req.body);
      }
      return user;
    });
    //console.log(updatedUser);
    saveUsers(updatedUser);
    res.status(200).send({ message: "Updated successfully..!!" });
  }
};

getUsers = () => {
  const jsonData = fs.readFileSync("users.json");
  return JSON.parse(jsonData);
};

const saveUsers = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync("users.json", stringifyData);
};

module.exports = {
  postUser,
  getUserByMobileNumber,
  getallusers,
  updateInteractions,
};
