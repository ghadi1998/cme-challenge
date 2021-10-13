"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var Schema = _mongoose.Schema;
var userSchema = new Schema({
  email: String,
  password: String,
  name: String,
  user_type_id: Number
});

var _default = (0, _mongoose.model)("user", userSchema, "users");

exports["default"] = _default;