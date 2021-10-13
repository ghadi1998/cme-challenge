import { Schema as _Schema, model } from "mongoose";
const Schema = _Schema;

const fruitSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

export default model("Fruit", fruitSchema);
