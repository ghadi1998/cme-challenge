import User from "../models/userModel";
import fruits from "../models/fruits";
import Transaction from "../models/transactions";


//Changes Quantity according to the fruit name
// payload {
//    "fruitName" : "xyz",
//   "newQuantity": 3
//}
export async function changeQuantity(req, res) {
  try {
    const result = await fruits.updateOne(
      { name: req.body.fruitName }, // Filter
      { $set: { quantity: req.body.newQuantity } } // Update
    );
    return result.acknowledged;
  } catch (err) {
    console.log(err);
  }
}

export async function getAllTransactionsAdmin() {
  try {
    const result = await Transaction.find().exec();
    if (result) return result;
  } catch (err) {
    console.log(err);
  }
}

export async function getAllTransactionsOfUser(username) {
  try {
    const result = await User.find({ name: username }).exec();
    if (result) return result[0].transactions;
  } catch (err) {
    console.log(err);
  }
}
