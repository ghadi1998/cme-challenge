import { connect, findOne, find } from "mongoose";
import { DB_HOST, TOKEN_SECRET } from "../config/config";
import { genSalt, hash, compare } from "bcryptjs";
import { isEmpty } from "lodash";
import { sign } from "jsonwebtoken";
import User from "../models/userModel";
import fruits from "../models/fruits";
import Cart from "../models/cart";
import Transaction from "../models/transactions";
import {
  getStock,
  insertUserTransaction,
  getMyTransactions,
} from "../controllers/helpers/index";

// Connect to DB
const db = DB_HOST;
connect(db, function (err) {
  if (err) {
    console.error("Error! " + err);
  } else {
    console.log("Connected to mongodb");
  }
});

//   Payload = {
//  "email": "xyz@gmail.com",
//   "password": "xyz",
//   "user_type_id": 0 || 1,
//   "name": "xyz"
//    }
export async function register(req, res) {
  //Check wether the body is empty or undefined
  if (isEmpty(req.body)) {
    res.status(400).send("Body Is Missing");
    //Check if the user_type_id is valid , either 0 or 1
  } else if (req.body.user_type_id != 0 && req.body.user_type_id != 1) {
    res.status(400).send("User Type ID can be only 0 or 1");
  } else if (req.body.user_type_id === 1) {
    //Check if there already exists an admin
    const allUsers = await User.find().exec();
    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].user_type_id === 1)
        res.status(400).send("Only one admin can register");
    }
  } else {
    //Check if the user already exists
    const foundUser = await User.findOne({ email: req.body.email }).exec();
    if (foundUser) {
      res.status(401).send("user exists");
    } else {
      //Hash password
      const salt = await genSalt(10);
      const hasPassword = await hash(req.body.password, salt);
      // Create an user object
      let user = new User({
        email: req.body.email,
        name: req.body.name,
        password: hasPassword,
        user_type_id: req.body.user_type_id,
      });

      const result = User.find();
      // Save User in the database
      user.save((err, registeredUser) => {
        if (err) {
          console.log(err);
        } else {
          // create payload then Generate an access token
          let payload = {
            id: registeredUser._id,
            user_type_id: req.body.user_type_id || 0,
          };
          const token = sign(payload, TOKEN_SECRET);
          res.status(200).send({ token });
        }
      });
    }
  }
}

// Payload = {
// "email": "xyz@gmail.com",
//   "password": "xyz"
//      }
export async function login(req, res) {
  User.findOne({ email: req.body.email }, async (err, user) => {
    if (err) {
      console.log(err);
    } else {
      if (user) {
        const validPass = await compare(req.body.password, user.password);
        if (!validPass)
          return res.status(401).send("Mobile/Email or Password is wrong");

        // Create and assign token
        let payload = { id: user._id, user_type_id: user.user_type_id };
        const token = sign(payload, TOKEN_SECRET);

        res.status(200).header("auth-token", token).send({ token: token });
      } else {
        res.status(401).send("Invalid mobile");
      }
    }
  });
}

//Payload : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjZkOGU2YjEzZWUyMTg4ODNkZGU2N
//iIsInVzZXJfdHlwZV9pZCI6MSwiaWF0IjoxNjM0NjYwMjIwfQ.VyLfbQZIR-zq3-pVFdGHrjv_OpXpB4u8q5eAbHoi2y
export async function getFruits(req, res, next) {
  try {
    const result = await fruits.find().exec();
    if (result) res.status(200).send(result);
  } catch (err) {
    console.log(err);
  }
}

//Payload Header : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjZkOGU2YjEzZWUyMTg4ODNkZGU2N
//iIsInVzZXJfdHlwZV9pZCI6MSwiaWF0IjoxNjM0NjYwMjIwfQ.VyLfbQZIR-zq3-pVFdGHrjv_OpXpB4u8q5eAbHoi2y

// Payload Body :
// {
// "name":"bananas",
//  "quantity":"1",
//  "productId":"6166e1278d6590aac75a66b6",
//  "price":"3"
//  }
exports.buyFruits = async (req, res) => {
  const { productId, quantity, name, price } = req.body;

  const userId = req.user.id;

  try {
    //Check if there is available stock
    const result = await getStock(name, quantity, res);
    if (!result) {
      let cart = await Cart.findOne({ userId });

      if (cart) {
        //cart exists for user
        let itemIndex = cart.products.findIndex(
          (p) => p.productId == productId
        );

        if (itemIndex > -1) {
          //product exists in the cart, update the quantity
          let productItem = cart.products[itemIndex];
          productItem.quantity = quantity;
          cart.products[itemIndex] = productItem;
        } else {
          //product does not exists in cart, add new item
          cart.products.push({ productId, quantity, name, price });
        }
        cart = await cart.save();

        //create transaction and insert to transaction documents
        const newTransaction = await Transaction.create({
          transactionUser: userId,
          fruitType: name,
          quantity: quantity,
        });

        //Insert user transaction to user model
        await insertUserTransaction(userId, newTransaction);

        return res.status(201).send(cart);
      } else {
        //no cart for user, create new cart
        const newCart = await Cart.create({
          userId,
          products: [{ productId, quantity, name, price }],
        });
        const newTransaction = await Transaction.create({
          transactionUser: userId,
          fruitType: name,
          quantity: quantity,
        });

        await insertUserTransaction(userId, newTransaction);
        return res.status(201).send(newCart);
      }
    } else {
      return res.status(403).send("no supply found");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};



