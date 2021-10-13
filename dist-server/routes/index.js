"use strict";

var router = require("express").Router();

var _require = require("../middleware/auth"),
    verifyUserToken = _require.verifyUserToken,
    IsAdmin = _require.IsAdmin,
    IsUser = _require.IsUser;

var userController = require("../controllers/user"); // Register a new User


router.post("/register", userController.register); // Login

router.post("/login", userController.login); // Auth user only

router.get("/products", verifyUserToken, IsUser, userController.userEvent); // Auth Admin only

router.get("/admin-page", verifyUserToken, IsAdmin, userController.adminEvent);
module.exports = router;