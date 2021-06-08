const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: String,
    description: String,
    image: {
      type: String,
      default:
        "https://cdn1.iconfinder.com/data/icons/gardening-filled-line/614/1935_-_Growing_Plant-512.png",
    },
    category: [
      {
        type: String,
        enum: ["Plant", "Kombucha", "Kefir", "Vinegar"],
      },
    ],
    quantity: Number,
    address: String,
    location: {
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
      },
    },
    formattedAddress: String,
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    contact: { type: String, enum: ["phone", "email"] },
  
},
{ timestamps: true });

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
