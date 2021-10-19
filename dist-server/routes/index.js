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

var router = require("express").Router();

// Register a new User
router.post("/register", _userController.register); // Login

router.post("/login", _userController.login); //Auth user only

router.post("/list-fruits", _authMiddleware.verifyUserToken, _authMiddleware.IsUser, _userController.getFruits); //Auth user only

router.post("/buyFruits", _authMiddleware.verifyUserToken, _authMiddleware.IsUser, _userController.buyFruits); //Auth Admin only

router.post("/get-all-transactions", _authMiddleware.verifyUserToken, _authMiddleware.IsAdmin, _userController.getAllTransactionsAdmin); //Auth Admin only

router.post("/get-my-transactions", _authMiddleware.verifyUserToken, _authMiddleware.IsUser, /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _userController.getUserTransactions)(req);

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
}());
router.post("/changeFruitQuantity", _authMiddleware.verifyUserToken, _authMiddleware.IsAdmin, /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var updateObj;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _userController.changeQuantity)(req, res);

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
}());
var _default = router;
exports["default"] = _default;