const router = require("express").Router();
import {
  verifyUserToken,
  IsAdmin,
  IsUser,
} from "../middleware/auth-middleware";

import {
  register,
  login,
  getFruits,
  buyFruits,
  getMyTransactions,
} from "../controllers/user-controller";

import {
  changeQuantity,
  getAllTransactionsAdmin,
  getAllTransactionsOfUser,
} from "../controllers/admin-controller";

// Register a new User - Admin and
router.post("/register", register);

// Login
router.post("/login", login);

//Get and List fruits - User not client
router.post("/list-fruits", getFruits);

//Buy Fruits - Client
router.post("/buyFruits", verifyUserToken, IsUser, buyFruits);

//Get all transactions done - Admin
router.post(
  "/get-all-transactions",
  verifyUserToken,
  IsAdmin,
  getAllTransactionsAdmin
);

//get User Transactions
router.post(
  "/get-my-transactions",
  verifyUserToken,
  IsUser,
  async (req, res) => {
    const result = await getMyTransactions(req);
    res.send(result);
  }
);

//Admin change quantity
router.post(
  "/changeFruitQuantity",
  verifyUserToken,
  IsAdmin,
  async (req, res) => {
    const updateObj = await changeQuantity(req, res);
    res.status(200).send(`Update status :  ${updateObj}`);
  }
);

//get User Transactions
router.post(
  "/get-user-transactions-by-admin",
  verifyUserToken,
  IsAdmin,
  async (req, res) => {
    const username = req.body.username;
    const result = await getAllTransactionsOfUser(username);
    res.send(result);
  }
);

export default router;
