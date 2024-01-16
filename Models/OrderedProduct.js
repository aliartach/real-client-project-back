import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";
const { Schema, model } = mongoose;

const OrderedProductSchema = new Schema(
  {
    total_price: {
      type: Number,
    },
    quantity: {
      type: Number,
      required: true,
    },
    // order: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Order",
    //   required: true,
    //   autopopulate: true,
    // },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      require: true,
      autopopulate: true,
    },
  },
  { timestamps: true }
);

OrderedProductSchema.plugin(autopopulate);

export default model("OrderedProduct", OrderedProductSchema);
