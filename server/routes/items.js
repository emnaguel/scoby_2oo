const express = require("express");
const router = express.Router();
const Item = require("../models/Item");
const upload = require("../config/cloudinary");

router.get("/", (req, res, next) => {
  
    Item.find()
        .then((item) => {
            res.status(200).json(item);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

router.get("/:id", (req, res, next) => {
    Item.findById(req.params.id)
        .then((item) => {
            res.status(200).json(item);
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

router.post("/", upload.single("image"), (req, res, next) => {
    console.log(req.session)
    if(req.session.currentUser) {
        const { name, description, category, quantity, address,  formattedAddress, contact } = req.body;
        
        const newItem = {
            name,
            description,
        
            category,
            quantity,
            address,
            
            formattedAddress,
          
            contact
        };
        newItem.image = req.file.path
        newItem.creator = req.session.currentUser

        
        newItem.location= { coordinates: [Number(req.body.latitude), Number(req.body.longitude)] }
        
        console.log(newItem)
        
        Item.create(newItem)
            .then((itemDocument) => {
                console.log("you win")
                console.log(itemDocument)
                res.status(201).json(itemDocument);
            })
            .catch((error) => {
                console.log(error)
                //res.status(500).json(error);
            });
    } else {
        console.log("you have to be logged in to create an item")
    }
});

router.patch("/:id", (req, res, next) => {
    if(req.session.currentUser) {
        Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then((updatedItem) => {
                res.status(200).json(updatedItem);
            })
            .catch((error) => (console.log(error)));
    } else {
        console.log("you have to be logged in to create an item")
    }
});

router.delete("/:id", (req, res, next) => {
    if(req.session.currentUser) {
        Item.findByIdAndDelete(req.params.id)
            .then((deletedItem) => {
                res.status(202).json(deletedItem);
            })
            .catch(next);
    } else {
        console.log("you have to be logged in to create an item")
    }
});

module.exports = router;
