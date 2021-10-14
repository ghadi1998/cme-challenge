import { connect, findOne, find } from "mongoose";
import { DB_HOST, TOKEN_SECRET } from "../config/config";
import { genSalt, hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import User from "../models/userModel";
import fruits from "../models/fruits";
import Cart from "../models/cart";
import Transaction from "../models/transactions";
import transactions from "../models/transactions";

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
    const result = await getFruitsByName(name, quantity, res);
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
        Transaction.create({
          transactionUser: userId,
          fruitType: name,
          quantity: quantity,
        });

        return res.status(201).send(cart);
      } else {
        //no cart for user, create new cart
        const newCart = await Cart.create({
          userId,
          products: [{ productId, quantity, name, price }],
        });

        Transaction.create({
          transactionUser: userId,
          fruitType: name,
          quantity: quantity,
        });
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

export async function getTransactions(req, res, next) {
  try {
    const result = await transactions.find().exec();
    if (result) return truee;
  } catch (err) {
    console.log(err);
  }
}

export async function getFruitsByName(name, quantity, res) {
  try {
    const result = await fruits.find({ name: name }).exec();
    let newRes = quantity > result[0].quantity ? true : false;
    console.log(newRes);
    return newRes;
  } catch (err) {
    console.log(err);
  }
}
