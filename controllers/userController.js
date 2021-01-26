const User = require("../models/usermodel");

const fs = require("fs");
const Joi = require("joi");
const { json } = require("body-parser");
const { query } = require("express");

const postUser = async (req, res, next) => {
  try {
    const options = {
      abortEarly: false, // include all errors
      allowUnknown: true, // ignore unknown props
      stripUnknown: true, // remove unknown props
    };
    const { error, value } = User.validate(req.body, options);

    if (error) {
      res.send(error.details[0].message);
    } else if (value) {
      fs.readFile("users.json", (err, data) => {
        if (err) throw err;
        const allUsers = getUsers();
        allUsers.push(value);
        saveUsers(allUsers);
      });
    }
    return res.send(value);
  } catch (err) {}
};

const getUserByMobileNumber = async (req, res, next) => {
  const allusers = getUsers();
  mobNo = parseInt(req.params.mobNo);
  const findUser = allusers.filter((user) => user.MobileNo === mobNo);
  if (!findUser) {
    return res.status(409).send({ error: true, msg: "username not exist" });
  } else {
    return res.status(200).json(findUser);
  }
};

const getallusers = async (req, res, next) => {
  const allusers = getUsers();
  const method = req.query.method;
  const type = req.query.type;
  const findUser = allusers.filter((user) => user[method] === type);
  if (!findUser) {
    return res.status(409).send({ error: true, msg: "user does not exist" });
  } else {
    return res.status(200).json(findUser);
  }
};

const updateInteractions = async (req, res, next) => {};

getUsers = () => {
  const jsonData = fs.readFileSync("users.json");
  return JSON.parse(jsonData);
};

const saveUsers = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync("users.json", stringifyData);
};

module.exports = { postUser, getUserByMobileNumber, getallusers };
