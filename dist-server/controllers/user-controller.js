"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFruits = getFruits;
exports.getMyTransactions = getMyTransactions;
exports.getStock = getStock;
exports.insertUserTransaction = insertUserTransaction;
exports.login = login;
exports.register = register;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = require("mongoose");

var _config = require("../config/config");

var _bcryptjs = require("bcryptjs");

var _lodash = require("lodash");

var _jsonwebtoken = require("jsonwebtoken");

var _userModel = _interopRequireDefault(require("../models/userModel"));

var _fruits = _interopRequireDefault(require("../models/fruits"));

var _cart = _interopRequireDefault(require("../models/cart"));

var _transactions = _interopRequireDefault(require("../models/transactions"));

// Connect to DB
var db = _config.DB_HOST;
(0, _mongoose.connect)(db, function (err) {
  if (err) {
    console.error("Error! " + err);
  } else {
    console.log("Connected to mongodb");
  }
});

function register(_x, _x2) {
  return _register.apply(this, arguments);
}

function _register() {
  _register = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var allUsers, i, foundUser, salt, hasPassword, user, result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(0, _lodash.isEmpty)(req.body)) {
              _context2.next = 4;
              break;
            }

            res.status(400).send("Body Is Missing");
            _context2.next = 31;
            break;

          case 4:
            if (!(req.body.user_type_id != 0 && req.body.user_type_id != 1)) {
              _context2.next = 8;
              break;
            }

            res.status(400).send("User Type ID can be only 0 or 1");
            _context2.next = 31;
            break;

          case 8:
            if (!(req.body.user_type_id === 1)) {
              _context2.next = 15;
              break;
            }

            _context2.next = 11;
            return _userModel["default"].find().exec();

          case 11:
            allUsers = _context2.sent;

            for (i = 0; i < allUsers.length; i++) {
              if (allUsers[i].user_type_id === 1) res.status(400).send("Only one admin can register");
            }

            _context2.next = 31;
            break;

          case 15:
            _context2.next = 17;
            return _userModel["default"].findOne({
              email: req.body.email
            }).exec();

          case 17:
            foundUser = _context2.sent;

            if (!foundUser) {
              _context2.next = 22;
              break;
            }

            res.status(401).send("user exists");
            _context2.next = 31;
            break;

          case 22:
            _context2.next = 24;
            return (0, _bcryptjs.genSalt)(10);

          case 24:
            salt = _context2.sent;
            _context2.next = 27;
            return (0, _bcryptjs.hash)(req.body.password, salt);

          case 27:
            hasPassword = _context2.sent;
            // Create an user object
            user = new _userModel["default"]({
              email: req.body.email,
              name: req.body.name,
              password: hasPassword,
              user_type_id: req.body.user_type_id
            });
            result = _userModel["default"].find(); // Save User in the database

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

          case 31:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _register.apply(this, arguments);
}

function login(_x3, _x4) {
  return _login.apply(this, arguments);
}

function _login() {
  _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _userModel["default"].findOne({
              email: req.body.email
            }, /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(err, user) {
                var validPass, payload, token;
                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        if (!err) {
                          _context3.next = 4;
                          break;
                        }

                        console.log(err);
                        _context3.next = 16;
                        break;

                      case 4:
                        if (!user) {
                          _context3.next = 15;
                          break;
                        }

                        _context3.next = 7;
                        return (0, _bcryptjs.compare)(req.body.password, user.password);

                      case 7:
                        validPass = _context3.sent;

                        if (validPass) {
                          _context3.next = 10;
                          break;
                        }

                        return _context3.abrupt("return", res.status(401).send("Mobile/Email or Password is wrong"));

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
                        _context3.next = 16;
                        break;

                      case 15:
                        res.status(401).send("Invalid mobile");

                      case 16:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3);
              }));

              return function (_x15, _x16) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _login.apply(this, arguments);
}

function getFruits(_x5, _x6, _x7) {
  return _getFruits.apply(this, arguments);
}

function _getFruits() {
  _getFruits = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res, next) {
    var result;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _fruits["default"].find().exec();

          case 3:
            result = _context5.sent;
            if (result) res.status(200).send(result);
            _context5.next = 10;
            break;

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);
            console.log(_context5.t0);

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 7]]);
  }));
  return _getFruits.apply(this, arguments);
}

exports.buyFruits = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var _req$body, productId, quantity, name, price, userId, result, cart, itemIndex, productItem, newTransaction, newCart, _newTransaction;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _req$body = req.body, productId = _req$body.productId, quantity = _req$body.quantity, name = _req$body.name, price = _req$body.price;
            userId = req.user.id; //TODO: the logged in user id

            _context.prev = 2;
            _context.next = 5;
            return getStock(name, quantity, res);

          case 5:
            result = _context.sent;

            if (result) {
              _context.next = 35;
              break;
            }

            _context.next = 9;
            return _cart["default"].findOne({
              userId: userId
            });

          case 9:
            cart = _context.sent;

            if (!cart) {
              _context.next = 24;
              break;
            }

            //cart exists for user
            itemIndex = cart.products.findIndex(function (p) {
              return p.productId == productId;
            });

            if (itemIndex > -1) {
              //product exists in the cart, update the quantity
              productItem = cart.products[itemIndex];
              productItem.quantity = quantity;
              cart.products[itemIndex] = productItem;
            } else {
              //product does not exists in cart, add new item
              cart.products.push({
                productId: productId,
                quantity: quantity,
                name: name,
                price: price
              });
            }

            _context.next = 15;
            return cart.save();

          case 15:
            cart = _context.sent;
            _context.next = 18;
            return _transactions["default"].create({
              transactionUser: userId,
              fruitType: name,
              quantity: quantity
            });

          case 18:
            newTransaction = _context.sent;
            _context.next = 21;
            return insertUserTransaction(userId, newTransaction);

          case 21:
            return _context.abrupt("return", res.status(201).send(cart));

          case 24:
            _context.next = 26;
            return _cart["default"].create({
              userId: userId,
              products: [{
                productId: productId,
                quantity: quantity,
                name: name,
                price: price
              }]
            });

          case 26:
            newCart = _context.sent;
            _context.next = 29;
            return _transactions["default"].create({
              transactionUser: userId,
              fruitType: name,
              quantity: quantity
            });

          case 29:
            _newTransaction = _context.sent;
            _context.next = 32;
            return insertUserTransaction(userId, _newTransaction);

          case 32:
            return _context.abrupt("return", res.status(201).send(newCart));

          case 33:
            _context.next = 36;
            break;

          case 35:
            return _context.abrupt("return", res.status(403).send("no supply found"));

          case 36:
            _context.next = 42;
            break;

          case 38:
            _context.prev = 38;
            _context.t0 = _context["catch"](2);
            console.log(_context.t0);
            res.status(500).send("Something went wrong");

          case 42:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 38]]);
  }));

  return function (_x8, _x9) {
    return _ref.apply(this, arguments);
  };
}();

function getStock(_x10, _x11) {
  return _getStock.apply(this, arguments);
}

function _getStock() {
  _getStock = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(name, quantity) {
    var result, newRes;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _fruits["default"].find({
              name: name
            }).exec();

          case 3:
            result = _context6.sent;
            newRes = quantity > result[0].quantity ? true : false;
            console.log(newRes);
            return _context6.abrupt("return", newRes);

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 9]]);
  }));
  return _getStock.apply(this, arguments);
}

function insertUserTransaction(_x12, _x13) {
  return _insertUserTransaction.apply(this, arguments);
}

function _insertUserTransaction() {
  _insertUserTransaction = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(userId, transaction) {
    var result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _userModel["default"].find({
              _id: userId
            }).exec();

          case 3:
            result = _context7.sent;
            _context7.next = 6;
            return result[0].transactions.push(transaction);

          case 6:
            result[0].save();
            console.log(result[0]);
            _context7.next = 13;
            break;

          case 10:
            _context7.prev = 10;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);

          case 13:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 10]]);
  }));
  return _insertUserTransaction.apply(this, arguments);
}

function getMyTransactions(_x14) {
  return _getMyTransactions.apply(this, arguments);
}

function _getMyTransactions() {
  _getMyTransactions = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req) {
    var userId, result;
    return _regenerator["default"].wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            userId = req.user.id;
            _context8.next = 4;
            return _userModel["default"].find({
              _id: userId
            }).exec();

          case 4:
            result = _context8.sent;
            console.log(result[0].transactions);
            return _context8.abrupt("return", result[0].transactions);

          case 9:
            _context8.prev = 9;
            _context8.t0 = _context8["catch"](0);
            console.log(_context8.t0);

          case 12:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, null, [[0, 9]]);
  }));
  return _getMyTransactions.apply(this, arguments);
}