
import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
const { Schema, model } = mongoose;

const OrderedProductSchema = new Schema({
  customer_name: {
    type: String,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,

  },
  quantity: {
    type: Number,
    required: true
  },
  order: {
    type: Schema.Types.ObjectId,
    ref: 'Order',
    required: true,
    autopopulate: true
  },
}, { timestamps: true });

OrderedProductSchema.plugin(autopopulate);


export default model('OrderedProduct', OrderedProductSchema);