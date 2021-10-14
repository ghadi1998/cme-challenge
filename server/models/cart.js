import { Schema, model } from "mongoose";

const CartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    products: [
      {
        productId: String,
        quantity: Number,
        name: String,
        price: Number,
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    modifiedOn: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default model("Cart", CartSchema);
