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
  buyFruits,
  getAllTransactions,
  getMyTransactions,
} from "../controllers/user-controller";

// Register a new User
router.post("/register", register);

// Login
router.post("/login", login);

//Auth user only
router.post("/list-fruits", verifyUserToken, IsUser, getFruits);

//Auth user only
router.post("/buyFruits", verifyUserToken, IsUser, buyFruits);

//Auth Admin only
router.post(
  "/get-all-transactions",
  verifyUserToken,
  IsAdmin,
  getAllTransactions
);

//Auth Admin only
//router.post("/get-my-transactions", verifyUserToken, IsUser, getMyTransactions);

export default router;
