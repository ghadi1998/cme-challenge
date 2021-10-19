import User from "../../models/userModel";
import fruits from "../../models/fruits";

export async function getStock(name, quantity) {
  try {
    const result = await fruits.find({ name: name }).exec();
    let newRes = quantity > result[0].quantity ? true : false;
    console.log(newRes);
    return newRes;
  } catch (err) {
    console.log(err);
  }
}

export async function insertUserTransaction(userId, transaction) {
  try {
    const result = await User.find({ _id: userId }).exec();
    await result[0].transactions.push(transaction);
    result[0].save();
    console.log(result[0]);
  } catch (err) {
    console.log(err);
  }
}

export async function getMyTransactions(req) {
  try {
    const userId = req.user.id;
    const result = await User.find({ _id: userId }).exec();
    console.log(result[0].transactions);
    return result[0].transactions;
  } catch (err) {
    console.log(err);
  }
}
