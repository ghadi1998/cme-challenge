const router = require("express").Router();
import {
  verifyUserToken,
  IsAdmin,
  IsUser,
} from "../middleware/auth-middleware";
import {
  register,
  login,
  adminEvent,
  getFruits,
} from "../controllers/user-controller";

// Register a new User
//router.post("/register", register);

// Login
router.post("/login", login);

//Auth user only
router.post("/products",  verifyUserToken, IsUser , getFruits)

//Auth Admin only
//router.get("/admin-page", verifyUserToken, IsAdmin, adminEvent);

export default router;
