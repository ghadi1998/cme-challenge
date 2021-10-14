"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var CartSchema = new _mongoose.Schema({
  userId: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  products: [{
    productId: String,
    quantity: Number,
    name: String,
    price: Number
  }],
  active: {
    type: Boolean,
    "default": true
  },
  modifiedOn: {
    type: Date,
    "default": Date.now
  }
}, {
  timestamps: true
});

var _default = (0, _mongoose.model)("Cart", CartSchema);

exports["default"] = _default;