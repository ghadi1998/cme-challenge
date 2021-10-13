import { Router } from "express";
var router = Router();

router.post("/index", function (req, res) {
  res.send("index page");
});
