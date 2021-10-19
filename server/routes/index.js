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
} from "../controllers/user-controller";

import {
  changeQuantity,
  getAllTransactionsAdmin,
  getAllTransactionsOfUser,
} from "../controllers/admin-controller";

import { getMyTransactions } from "../controllers/helpers/index";
 
//Register a new User - Admin and
//Response : 
//
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmVlMjQwNjE
//     2NDQxMjFkM2FhYjQ5NyIsInVzZXJfdHlwZV9pZCI6MCwia
//     WF0IjoxNjM0NjU2ODMyfQ.ZD7u9vqCVZpRt73a2-2OeN6jo3C3pzbXhziUbj3kyoo"
// 
// 
router.post("/register", register);

// Login
//Response : 
//
//    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjZkOG
//     U2YjEzZWUyMTg4ODNkZGU2NiIsInVzZXJfdHlwZV9pZCI6M
//     SwiaWF0IjoxNjM0NjYwMjIwfQ.VyLfbQZIR-zq3-pVFdGHrjv_OpXpB4u8q5eAbHoi2yc"
// 
//  
router.post("/login", login);

//Get and List fruits - User not client
//reponse : 
// [
//   {
//       "_id": "6166e1278d6590aac75a66b6",
//       "name": "strawberry",
//       "quantity": 1291
//   },
//   {
//       "_id": "6166e1548d6590aac75a66b7",
//       "name": "bananas",
//       "quantity": 3
//   }
// ]
router.post("/list-fruits", getFruits);

//Buy Fruits - Client
// Response :
// {
//   "_id": "616d4e82f7678e9b2062a66b",
//   "userId": "6166d99fc19eb7eb57567902",
//   "products": [
//       {
//           "productId": "6166e1278d6590aac75a66b6",
//           "name": "bananas",
//           "price": 3,
//           "_id": "616d4e82f7678e9b2062a66c"
//       }
//   ],
//   "active": true,
//   "modifiedOn": "2021-10-18T10:37:54.796Z",
//   "createdAt": "2021-10-18T10:37:54.801Z",
//   "updatedAt": "2021-10-19T17:15:06.046Z",
//   "__v": 0
// }
router.post("/buyFruits", verifyUserToken, IsUser, buyFruits);

//Get all transactions done - Admin
//Response {
//   {
//     "_id": "61682e3e4529a31d878457d7",
//     "transactionUser": "6166d99fc19eb7eb57567902",
//     "fruitType": "apples",
//     "quantity": 4,
//     "transactionTime": "2021-10-14T13:18:54.165Z",
//     "__v": 0
// },
router.post(
  "/get-all-transactions",
  verifyUserToken,
  IsAdmin,
  async function(re,res){
    const result = await getAllTransactionsAdmin()
    res.status(200).send(result)
  }
);

//get User Transactions
// {
//   "transactionUser": "6166d99fc19eb7eb57567902",
//   "fruitType": "strawberry",
//   "quantity": 1,
//   "_id": "616d4d094c9089503423af75",
//   "transactionTime": "2021-10-18T10:31:37.290Z",
//   "__v": 0
// }
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
//Payload : 
//   {
//     "fruitName":"bananas",
//     "newQuantity":"11"
// }
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
//Payload : {
//  "username" : "xyz"
//}
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
