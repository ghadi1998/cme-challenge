"use strict";

var _express = require("express");

var router = (0, _express.Router)();
router.post("/index", function (req, res) {
  res.send("index page");
});