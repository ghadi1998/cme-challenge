import { Schema as _Schema, model } from "mongoose";

const Schema = _Schema;

const userSchema = new Schema({
  email: String,
  password: String,
  name: String,
  user_type_id: Number,
});

export default model("user", userSchema, "users");
