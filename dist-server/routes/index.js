"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _authMiddleware = require("../middleware/auth-middleware");

var _userController = require("../controllers/user-controller");

var router = require("express").Router();

// Register a new User
router.post("/register", _userController.register); // Login

router.post("/login", _userController.login); //Auth user only

router.get("/products", _authMiddleware.verifyUserToken, _authMiddleware.IsUser, _userController.getProducts); //Auth Admin only

router.get("/admin-page", _authMiddleware.verifyUserToken, _authMiddleware.IsAdmin, _userController.adminEvent);
var _default = router;
exports["default"] = _default;