"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _authMiddleware = require("../middleware/auth-middleware");

var _userController = require("../controllers/user-controller");

var router = require("express").Router();

// Register a new User
//router.post("/register", register);
// Login
router.post("/login", _userController.login); //Auth user only

router.post("/products", _authMiddleware.verifyUserToken, _authMiddleware.IsUser, _userController.getFruits); //Auth Admin only
//router.get("/admin-page", verifyUserToken, IsAdmin, adminEvent);

var _default = router;
exports["default"] = _default;