const express = require("express");
const Item = require("../models/Item");
const router = express.Router();
const User = require("../models/User");

router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.patch("/me", function (req, res, next) {
  console.log("HELLO")

 
  User.findByIdAndUpdate(req.session.currentUser, { phoneNumber:  req.body.phoneNumber   }, { new: true })
  .then((updatedUser) => {
    console.log("HERE")
      console.log(updatedUser)
      res.status(200).json(updatedUser);
  })
  .catch(next);
});

router.get("/me", function (req, res, next) {
  User.findById(req.session.currentUser)
  .then((user) => {
      res.status(200).json(user);
  })
  .catch((error) => {
    res.status(500).json(error);
  });
});

router.get("/me/items", function (req, res, next) {

  const ObjectId = require('mongodb').ObjectID;
  if(req.session.currentUser) {

    Item.find({ "creator": ObjectId(req.session.currentUser) } )
    .then((item) => {

      res.status(200).json(item);
    }).catch((error) => {
      res.status(500).json(error);
    });
  } else {
    console.log("you have to connect")
  }
});

module.exports = router;
