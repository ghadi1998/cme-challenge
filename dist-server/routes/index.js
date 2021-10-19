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

var _index = require("../controllers/helpers/index");

var router = require("express").Router();

//Register a new User - Admin and
//Response : 
//
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmVlMjQwNjE
//     2NDQxMjFkM2FhYjQ5NyIsInVzZXJfdHlwZV9pZCI6MCwia
//     WF0IjoxNjM0NjU2ODMyfQ.ZD7u9vqCVZpRt73a2-2OeN6jo3C3pzbXhziUbj3kyoo"
// 
// 
router.post("/register", _userController.register); // Login
//Response : 
//
//    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjZkOG
//     U2YjEzZWUyMTg4ODNkZGU2NiIsInVzZXJfdHlwZV9pZCI6M
//     SwiaWF0IjoxNjM0NjYwMjIwfQ.VyLfbQZIR-zq3-pVFdGHrjv_OpXpB4u8q5eAbHoi2yc"
// 
//  

router.post("/login", _userController.login); //Get and List fruits - User not client
//reponse : 
// [
//   {
//       "_id": "6166e1278d6590aac75a66b6",
//       "name": "strawberry",
//       "quantity": 1291
//   },
//   {
//       "_id": "6166e1548d6590aac75a66b7",
//       "name": "bananas",
//       "quantity": 3
//   }
// ]

router.post("/list-fruits", _userController.getFruits); //Buy Fruits - Client
// Response :
// {
//   "_id": "616d4e82f7678e9b2062a66b",
//   "userId": "6166d99fc19eb7eb57567902",
//   "products": [
//       {
//           "productId": "6166e1278d6590aac75a66b6",
//           "name": "bananas",
//           "price": 3,
//           "_id": "616d4e82f7678e9b2062a66c"
//       }
//   ],
//   "active": true,
//   "modifiedOn": "2021-10-18T10:37:54.796Z",
//   "createdAt": "2021-10-18T10:37:54.801Z",
//   "updatedAt": "2021-10-19T17:15:06.046Z",
//   "__v": 0
// }

router.post("/buyFruits", _authMiddleware.verifyUserToken, _authMiddleware.IsUser, _userController.buyFruits); //Get all transactions done - Admin
//Response {
//   {
//     "_id": "61682e3e4529a31d878457d7",
//     "transactionUser": "6166d99fc19eb7eb57567902",
//     "fruitType": "apples",
//     "quantity": 4,
//     "transactionTime": "2021-10-14T13:18:54.165Z",
//     "__v": 0
// },

router.post("/get-all-transactions", _authMiddleware.verifyUserToken, _authMiddleware.IsAdmin, /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(re, res) {
    var result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _adminController.getAllTransactionsAdmin)();

          case 2:
            result = _context.sent;
            res.status(200).send(result);

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
}()); //get User Transactions
// {
//   "transactionUser": "6166d99fc19eb7eb57567902",
//   "fruitType": "strawberry",
//   "quantity": 1,
//   "_id": "616d4d094c9089503423af75",
//   "transactionTime": "2021-10-18T10:31:37.290Z",
//   "__v": 0
// }

router.post("/get-my-transactions", _authMiddleware.verifyUserToken, _authMiddleware.IsUser, /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
    var result;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _index.getMyTransactions)(req);

          case 2:
            result = _context2.sent;
            res.send(result);

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
}()); //Admin change quantity
//Payload : 
//   {
//     "fruitName":"bananas",
//     "newQuantity":"11"
// }

router.post("/changeFruitQuantity", _authMiddleware.verifyUserToken, _authMiddleware.IsAdmin, /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
    var updateObj;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _adminController.changeQuantity)(req, res);

          case 2:
            updateObj = _context3.sent;
            res.status(200).send("Update status :  ".concat(updateObj));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}()); //get User Transactions
//Payload : {
//  "username" : "xyz"
//}

router.post("/get-user-transactions-by-admin", _authMiddleware.verifyUserToken, _authMiddleware.IsAdmin, /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var username, result;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            username = req.body.username;
            _context4.next = 3;
            return (0, _adminController.getAllTransactionsOfUser)(username);

          case 3:
            result = _context4.sent;
            res.send(result);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
var _default = router;
exports["default"] = _default;