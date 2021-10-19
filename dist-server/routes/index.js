"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _authMiddleware = require("../middleware/auth-middleware");

var _userController = require("../controllers/user-controller");

var _adminController = require("../controllers/admin-controller");

var router = require("express").Router();

// Register a new User - Admin and
router.post("/register", _userController.register); // Login

router.post("/login", _userController.login); //Get and List fruits - User not client

router.post("/list-fruits", _userController.getFruits); //Buy Fruits - Client

router.post("/buyFruits", _authMiddleware.verifyUserToken, _authMiddleware.IsUser, _userController.buyFruits); //Get all transactions done - Admin

router.post("/get-all-transactions", _authMiddleware.verifyUserToken, _authMiddleware.IsAdmin, _adminController.getAllTransactionsAdmin); //get User Transactions

router.post("/get-my-transactions", _authMiddleware.verifyUserToken, _authMiddleware.IsUser, /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _userController.getMyTransactions)(req);

          case 2:
            result = _context.sent;
            res.send(result);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); //Admin change quantity

router.post("/changeFruitQuantity", _authMiddleware.verifyUserToken, _authMiddleware.IsAdmin, /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var updateObj;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _adminController.changeQuantity)(req, res);

          case 2:
            updateObj = _context2.sent;
            res.status(200).send("Update status :  ".concat(updateObj));

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}()); //get User Transactions

router.post("/get-user-transactions-by-admin", _authMiddleware.verifyUserToken, _authMiddleware.IsAdmin, /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var username, result;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            username = req.body.username;
            _context3.next = 3;
            return (0, _adminController.getAllTransactionsOfUser)(username);

          case 3:
            result = _context3.sent;
            res.send(result);

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;