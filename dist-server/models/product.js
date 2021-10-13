"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var Schema = _mongoose.Schema;
var productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

var _default = (0, _mongoose.model)("Product", productSchema);

exports["default"] = _default;
productSchema.pre("save", function (next) {
  // capitalize
  this.title.charAt(0).toUpperCase() + this.title.slice(1);
  next();
});