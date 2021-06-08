const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const bcrypt = require("bcrypt");
const salt = 10;
const User = require("../models/User");
require("../config/dbConnection");
const users = [
  {
    firstName: "toto",
    lastName: "toto",
    email: "toto22@gmail.com",
    password: bcrypt.hashSync("1234", salt),
    phoneNumber: "06060606606",
  },
  {
    firstName: "Lola",
    lastName: "The Cat",
    email: "Lola@gmail.com",
    password: bcrypt.hashSync("1234", salt),
    phoneNumber: "06060606606",
  },
];
User.create(users)
  .then((documents) => {
    console.log(documents);
  })
  .catch((error) => {
    console.log(error);
  });