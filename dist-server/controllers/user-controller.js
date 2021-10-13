"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFruits = getFruits;
exports.login = login;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = require("mongoose");

var _config = require("../config/config");

var _bcryptjs = require("bcryptjs");

var _jsonwebtoken = require("jsonwebtoken");

var _userModel = _interopRequireDefault(require("../models/userModel"));

var _fruits = _interopRequireDefault(require("../models/fruits"));

// Connect to DB
var db = _config.DB_HOST;
(0, _mongoose.connect)(db, function (err) {
  if (err) {
    console.error("Error! " + err);
  } else {
    console.log("Connected to mongodb");
  }
});

exports.register = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var foundUser, salt, hasPassword, user;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _userModel["default"].findOne({
              email: req.body.email
            }).exec();

          case 2:
            foundUser = _context.sent;

            if (!foundUser) {
              _context.next = 7;
              break;
            }

            res.status(401).send("user exists");
            _context.next = 15;
            break;

          case 7:
            _context.next = 9;
            return (0, _bcryptjs.genSalt)(10);

          case 9:
            salt = _context.sent;
            _context.next = 12;
            return (0, _bcryptjs.hash)(req.body.password, salt);

          case 12:
            hasPassword = _context.sent;
            // Create an user object
            user = new _userModel["default"]({
              email: req.body.email,
              name: req.body.name,
              password: hasPassword,
              user_type_id: req.body.user_type_id
            }); // Save User in the database

            user.save(function (err, registeredUser) {
              if (err) {
                console.log(err);
              } else {
                // create payload then Generate an access token
                var payload = {
                  id: registeredUser._id,
                  user_type_id: req.body.user_type_id || 0
                };
                var token = (0, _jsonwebtoken.sign)(payload, _config.TOKEN_SECRET);
                res.status(200).send({
                  token: token
                });
              }
            });

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

function login(_x3, _x4) {
  return _login.apply(this, arguments);
}

function _login() {
  _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _userModel["default"].findOne({
              email: req.body.email
            }, /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(err, user) {
                var validPass, payload, token;
                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        if (!err) {
                          _context2.next = 4;
                          break;
                        }

                        console.log(err);
                        _context2.next = 16;
                        break;

                      case 4:
                        if (!user) {
                          _context2.next = 15;
                          break;
                        }

                        _context2.next = 7;
                        return (0, _bcryptjs.compare)(req.body.password, user.password);

                      case 7:
                        validPass = _context2.sent;

                        if (validPass) {
                          _context2.next = 10;
                          break;
                        }

                        return _context2.abrupt("return", res.status(401).send("Mobile/Email or Password is wrong"));

                      case 10:
                        // Create and assign token
                        payload = {
                          id: user._id,
                          user_type_id: user.user_type_id
                        };
                        token = (0, _jsonwebtoken.sign)(payload, _config.TOKEN_SECRET);
                        res.status(200).header("auth-token", token).send({
                          token: token
                        });
                        _context2.next = 16;
                        break;

                      case 15:
                        res.status(401).send("Invalid mobile");

                      case 16:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x8, _x9) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _login.apply(this, arguments);
}

function getFruits(_x5, _x6, _x7) {
  return _getFruits.apply(this, arguments);
}

function _getFruits() {
  _getFruits = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res, next) {
    var result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _fruits["default"].find().exec();

          case 3:
            result = _context4.sent;
            if (result) res.status(200).send(result);
            _context4.next = 10;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            console.log(_context4.t0);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 7]]);
  }));
  return _getFruits.apply(this, arguments);
}

;