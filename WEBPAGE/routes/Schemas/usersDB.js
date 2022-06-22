const { model, Schema } = require("mongoose");

module.exports = model(
  "users",
  new Schema({
    _id: String,
    coins: {
      type: Number,
      default: 0,
    },
  })
);
