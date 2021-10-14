import { Schema as _Schema, model } from "mongoose";
const cartSchema = require("./cart").schema;
const Schema = _Schema;

const transactionSchema = new Schema({
  transactionId: {
    type: Schema.Types.ObjectId,
  },
  transactionUser: String,
  transactionTime: {
    type: Date,
    default: Date.now,
  },
  fruitType: String,
  quantity: Number,
});

export default model("Transaction", transactionSchema);
