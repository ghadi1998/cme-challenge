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

router.post("/list-fruits", _authMiddleware.verifyUserToken, _authMiddleware.IsUser, _userController.getFruits); //Auth user only

router.post("/buyFruits", _authMiddleware.verifyUserToken, _authMiddleware.IsUser, _userController.buyFruits); //Auth Admin only

router.post("/get-all-transactions", _authMiddleware.verifyUserToken, _authMiddleware.IsAdmin, _userController.getAllTransactions); //Auth Admin only
//router.post("/get-my-transactions", verifyUserToken, IsUser, getMyTransactions);

var _default = router;
exports["default"] = _default;