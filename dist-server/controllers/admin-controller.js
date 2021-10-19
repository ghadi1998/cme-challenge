"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changeQuantity = changeQuantity;
exports.getAllTransactionsAdmin = getAllTransactionsAdmin;
exports.getAllTransactionsOfUser = getAllTransactionsOfUser;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _userModel = _interopRequireDefault(require("../models/userModel"));

var _fruits = _interopRequireDefault(require("../models/fruits"));

var _transactions = _interopRequireDefault(require("../models/transactions"));

function changeQuantity(_x, _x2) {
  return _changeQuantity.apply(this, arguments);
}

function _changeQuantity() {
  _changeQuantity = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _fruits["default"].updateOne({
              name: req.body.fruitName
            }, // Filter
            {
              $set: {
                quantity: req.body.newQuantity
              }
            } // Update
            );

          case 3:
            result = _context.sent;
            return _context.abrupt("return", result.acknowledged);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            console.log(_context.t0);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));
  return _changeQuantity.apply(this, arguments);
}

function getAllTransactionsAdmin() {
  return _getAllTransactionsAdmin.apply(this, arguments);
}

function _getAllTransactionsAdmin() {
  _getAllTransactionsAdmin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _transactions["default"].find().exec();

          case 3:
            result = _context2.sent;

            if (!result) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", truee);

          case 6:
            _context2.next = 11;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](0);
            console.log(_context2.t0);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 8]]);
  }));
  return _getAllTransactionsAdmin.apply(this, arguments);
}

function getAllTransactionsOfUser(_x3) {
  return _getAllTransactionsOfUser.apply(this, arguments);
}

function _getAllTransactionsOfUser() {
  _getAllTransactionsOfUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(username) {
    var result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return _userModel["default"].find({
              name: username
            }).exec();

          case 3:
            result = _context3.sent;

            if (!result) {
              _context3.next = 6;
              break;
            }

            return _context3.abrupt("return", result[0].transactions);

          case 6:
            _context3.next = 11;
            break;

          case 8:
            _context3.prev = 8;
            _context3.t0 = _context3["catch"](0);
            console.log(_context3.t0);

          case 11:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 8]]);
  }));
  return _getAllTransactionsOfUser.apply(this, arguments);
}