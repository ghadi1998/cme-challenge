import { connect, findOne, find } from "mongoose";
import { DB_HOST, TOKEN_SECRET } from "../config/config";
import { genSalt, hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import User from "../models/userModel";
import fruits from "../models/fruits";
import Cart from "../models/cart";
import Transaction from "../models/transactions";

// Connect to DB
const db = DB_HOST;
connect(db, function (err) {
  if (err) {
    console.error("Error! " + err);
  } else {
    console.log("Connected to mongodb");
  }
});

exports.register = async (req, res) => {
  const foundUser = await User.findOne({ email: req.body.email }).exec();
  if (foundUser) {
    res.status(401).send("user does not exist");
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
};

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

export async function getFruits(req, res, next) {
  try {
    const result = await fruits.find().exec();
    if (result) res.status(200).send(result);
  } catch (err) {
    console.log(err);
  }
}

exports.buyFruits = async (req, res) => {
  const { productId, quantity, name, price } = req.body;

  const userId = req.user.id; //TODO: the logged in user id

  try {
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

        const newTransaction = await Transaction.create({
          transactionUser: userId,
          fruitType: name,
          quantity: quantity,
        });

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

export async function getAllTransactionsAdmin() {
  try {
    const result = await Transaction.find().exec();
    if (result) return truee;
  } catch (err) {
    console.log(err);
  }
}

export async function getStock(name, quantity) {
  try {
    const result = await fruits.find({ name: name }).exec();
    let newRes = quantity > result[0].quantity ? true : false;
    console.log(newRes);
    return newRes;
  } catch (err) {
    console.log(err);
  }
}

export async function insertUserTransaction(userId, transaction) {
  try {
    const result = await User.find({ _id: userId }).exec();
    await result[0].transactions.push(transaction);
    result[0].save();
    console.log(result[0]);
  } catch (err) {
    console.log(err);
  }
}

export async function getUserTransactions(req, res) {
  try {
    const userId = req.user.id;
    const result = await User.find({ _id: userId }).exec();
    console.log(result[0].transactions);
    return result[0].transactions;
  } catch (err) {
    console.log(err);
  }
}

export async function changeQuantity(req, res) {
  try {
    const result = await fruits.updateOne(
      { name: req.body.fruitName }, // Filter
      { $set: { quantity: req.body.newQuantity } } // Update
    );
    return result.acknowledged;
  } catch (err) {
    console.log(err);
  }
}

