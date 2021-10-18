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
  getAllTransactionsAdmin,
  getUserTransactions,
  changeQuantity,
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
  getAllTransactionsAdmin
);

//Auth Admin only
router.post(
  "/get-my-transactions",
  verifyUserToken,
  IsUser,
  async (req, res) => {
    const result = await getUserTransactions(req);
    res.send(result);
  }
);

router.post(
  "/changeFruitQuantity",
  verifyUserToken,
  IsAdmin,
  async (req, res) => {
    const updateObj = await changeQuantity(req, res);
    res.status(200).send("Update status : " + " " + updateObj);
  }
);
export default router;
