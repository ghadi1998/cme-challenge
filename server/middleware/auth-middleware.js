import { TOKEN_SECRET } from "../config/config";
import { verify } from "jsonwebtoken";



//This function verifies the user token sent within the req.headers.authorization
//Checks if it is sent with the request
//This function is sent with every single request except Register
export function verifyUserToken(req, res, next) {
  let token = req.headers.authorization;
  console.log(token);
  if (!token)
    return res.status(401).send("Access Denied / Unauthorized request");
  try {
    token = token.split(" ")[1]; // Remove Bearer from string
    if (token === "null" || !token)
      return res.status(401).send("Unauthorized request");
    let verifiedUser = verify(token, TOKEN_SECRET); // config.TOKEN_SECRET => 'secretKey'
    console.log(verifiedUser);
    if (!verifiedUser) return res.status(401).send("Unauthorized request");
    req.user = verifiedUser; // user_id & user_type_id
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
}

//Called within the route middleware and moves to the next function
//If condition is passed
export async function IsUser(req, res, next) {
  if (req.user.user_type_id === 0) {
    console.log(req.user.user_type_id);
    next();
  } else {
    return res.status(401).send("Unauthorized!");
  }
}

//Called within the route middleware and moves to the next function
//If condition is passed
export async function IsAdmin(req, res, next) {
  if (req.user.user_type_id === 1) {
    next();
  } else {
    return res.status(401).send("Unauthorized!");
  }
}
