"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var cartSchema = require("./cart").schema;

var Schema = _mongoose.Schema;
var transactionSchema = new Schema({
  transactionId: {
    type: Schema.Types.ObjectId
  },
  transactionUser: String,
  transactionTime: {
    type: Date,
    "default": Date.now
  },
  fruitType: String,
  quantity: Number
});

var _default = (0, _mongoose.model)("Transaction", transactionSchema);

exports["default"] = _default;