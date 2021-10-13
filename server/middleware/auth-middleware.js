import { TOKEN_SECRET } from "../config/config";
import { verify } from "jsonwebtoken";
import User from "../models/userModel";
import { findOne } from "mongoose";

export function verifyUserToken(req, res, next) {
  let token = req.headers.authorization;
  if (!token)
    return res.status(401).send("Access Denied / Unauthorized request");

  try {
    token = token.split(" ")[1]; // Remove Bearer from string

    if (token === "null" || !token)
      return res.status(401).send("Unauthorized request");

    let verifiedUser = verify(token, TOKEN_SECRET); // config.TOKEN_SECRET => 'secretKey'
    if (!verifiedUser) return res.status(401).send("Unauthorized request");

    req.user = verifiedUser; // user_id & user_type_id
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
}

export async function IsUser(req, res, next) {
  if (req.user.user_type_id === 0) {
    next();
  }
  return res.status(401).send("Unauthorized!");
}

export async function IsAdmin(req, res, next) {
  if (req.user.user_type_id === 1) {
    next();
  }
  return res.status(401).send("Unauthorized!");
}
