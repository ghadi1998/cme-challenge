"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IsAdmin = IsAdmin;
exports.IsUser = IsUser;
exports.verifyUserToken = verifyUserToken;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _config = require("../config/config");

var _jsonwebtoken = require("jsonwebtoken");

//This function verifies the user token sent within the req.headers.authorization
//Checks if it is sent with the request
//This function is sent with every single request except Register
function verifyUserToken(req, res, next) {
  var token = req.headers.authorization;
  console.log(token);
  if (!token) return res.status(401).send("Access Denied / Unauthorized request");

  try {
    token = token.split(" ")[1]; // Remove Bearer from string

    if (token === "null" || !token) return res.status(401).send("Unauthorized request");
    var verifiedUser = (0, _jsonwebtoken.verify)(token, _config.TOKEN_SECRET); // config.TOKEN_SECRET => 'secretKey'

    console.log(verifiedUser);
    if (!verifiedUser) return res.status(401).send("Unauthorized request");
    req.user = verifiedUser; // user_id & user_type_id

    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
} //Called within the route middleware and moves to the next function
//If condition is passed


function IsUser(_x, _x2, _x3) {
  return _IsUser.apply(this, arguments);
} //Called within the route middleware and moves to the next function
//If condition is passed


function _IsUser() {
  _IsUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(req.user.user_type_id === 0)) {
              _context.next = 5;
              break;
            }

            console.log(req.user.user_type_id);
            next();
            _context.next = 6;
            break;

          case 5:
            return _context.abrupt("return", res.status(401).send("Unauthorized!"));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _IsUser.apply(this, arguments);
}

function IsAdmin(_x4, _x5, _x6) {
  return _IsAdmin.apply(this, arguments);
}

function _IsAdmin() {
  _IsAdmin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res, next) {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(req.user.user_type_id === 1)) {
              _context2.next = 4;
              break;
            }

            next();
            _context2.next = 5;
            break;

          case 4:
            return _context2.abrupt("return", res.status(401).send("Unauthorized!"));

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _IsAdmin.apply(this, arguments);
}