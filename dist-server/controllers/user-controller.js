"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFruits = getFruits;
exports.getFruitsByName = getFruitsByName;
exports.getTransactions = getTransactions;
exports.login = login;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = require("mongoose");

var _config = require("../config/config");

var _bcryptjs = require("bcryptjs");

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
  _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _userModel["default"].findOne({
              email: req.body.email
            }, /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(err, user) {
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

              return function (_x16, _x17) {
                return _ref3.apply(this, arguments);
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
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var _req$body, productId, quantity, name, price, userId, cart, itemIndex, productItem, newCart;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _req$body = req.body, productId = _req$body.productId, quantity = _req$body.quantity, name = _req$body.name, price = _req$body.price;
            userId = req.user.id; //TODO: the logged in user id

            _context2.prev = 2;
            getFruitsByName(name, quantity, res);
            _context2.next = 6;
            return _cart["default"].findOne({
              userId: userId
            });

          case 6:
            cart = _context2.sent;

            if (!cart) {
              _context2.next = 17;
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

            _context2.next = 12;
            return cart.save();

          case 12:
            cart = _context2.sent;

            _transactions["default"].create({
              transactionUser: userId,
              fruitType: name,
              quantity: quantity
            });

            return _context2.abrupt("return", res.status(201).send(cart));

          case 17:
            _context2.next = 19;
            return _cart["default"].create({
              userId: userId,
              products: [{
                productId: productId,
                quantity: quantity,
                name: name,
                price: price
              }]
            });

          case 19:
            newCart = _context2.sent;

            _transactions["default"].create({
              transactionUser: userId,
              fruitType: name,
              quantity: quantity
            });

            return _context2.abrupt("return", res.status(201).send(newCart));

          case 22:
            _context2.next = 28;
            break;

          case 24:
            _context2.prev = 24;
            _context2.t0 = _context2["catch"](2);
            console.log(_context2.t0);
            res.status(500).send("Something went wrong");

          case 28:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 24]]);
  }));

  return function (_x8, _x9) {
    return _ref2.apply(this, arguments);
  };
}();

function getTransactions(_x10, _x11, _x12) {
  return _getTransactions.apply(this, arguments);
}

function _getTransactions() {
  _getTransactions = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res, next) {
    var result;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _transactions["default"].find().exec();

          case 3:
            result = _context6.sent;
            if (result) res.status(200).send(result);
            _context6.next = 10;
            break;

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);
            console.log(_context6.t0);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 7]]);
  }));
  return _getTransactions.apply(this, arguments);
}

function getFruitsByName(_x13, _x14, _x15) {
  return _getFruitsByName.apply(this, arguments);
}

function _getFruitsByName() {
  _getFruitsByName = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(name, quantity, res) {
    var result;
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return _fruits["default"].find({
              name: name
            }).exec();

          case 3:
            result = _context7.sent;

            if (quantity > result[0].quantity) {
              res.send(" There is no enough supply");
            } else {
              console.log(result);
            }

            _context7.next = 10;
            break;

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);
            console.log(_context7.t0);

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[0, 7]]);
  }));
  return _getFruitsByName.apply(this, arguments);
}