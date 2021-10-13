import { connect, findOne, find } from "mongoose";
import { DB_HOST, TOKEN_SECRET } from "../config/config";
import { genSalt, hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import User from "../models/userModel";
import Fruit from "../models/fruits";

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

// Access auth users only
exports.getProducts = async (req, res) => {
  try {
    const fruits = await Fruit.find().exec();
    res.json(fruits);
  } catch (err) {
    return err;
  }
};

exports.adminEvent = (req, res) => {
  let specialEvents = [
    {
      _id: "1",
      name: "Auto Expo Special",
      description: "lorem ipsum",
      date: "2012-04-23T18:25:43.511Z",
    },
    {
      _id: "2",
      name: "Auto Expo Special",
      description: "lorem ipsum",
      date: "2012-04-23T18:25:43.511Z",
    },
    {
      _id: "3",
      name: "Auto Expo Special",
      description: "lorem ipsum",
      date: "2012-04-23T18:25:43.511Z",
    },
    {
      _id: "4",
      name: "Auto Expo Special",
      description: "lorem ipsum",
      date: "2012-04-23T18:25:43.511Z",
    },
    {
      _id: "5",
      name: "Auto Expo Special",
      description: "lorem ipsum",
      date: "2012-04-23T18:25:43.511Z",
    },
    {
      _id: "6",
      name: "Auto Expo Special",
      description: "lorem ipsum",
      date: "2012-04-23T18:25:43.511Z",
    },
  ];
  res.json(specialEvents);
};
