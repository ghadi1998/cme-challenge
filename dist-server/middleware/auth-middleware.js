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

var _userModel = _interopRequireDefault(require("../models/userModel"));

var _mongoose = require("mongoose");

function verifyUserToken(req, res, next) {
  var token = req.headers.authorization;
  if (!token) return res.status(401).send("Access Denied / Unauthorized request");

  try {
    token = token.split(" ")[1]; // Remove Bearer from string

    if (token === "null" || !token) return res.status(401).send("Unauthorized request");
    var verifiedUser = (0, _jsonwebtoken.verify)(token, _config.TOKEN_SECRET); // config.TOKEN_SECRET => 'secretKey'

    if (!verifiedUser) return res.status(401).send("Unauthorized request");
    req.user = verifiedUser; // user_id & user_type_id

    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
}

function IsUser(_x, _x2, _x3) {
  return _IsUser.apply(this, arguments);
}

function _IsUser() {
  _IsUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (req.user.user_type_id === 0) {
              next();
            }

            return _context.abrupt("return", res.status(401).send("Unauthorized!"));

          case 2:
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
            if (req.user.user_type_id === 1) {
              next();
            }

            return _context2.abrupt("return", res.status(401).send("Unauthorized!"));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _IsAdmin.apply(this, arguments);
}