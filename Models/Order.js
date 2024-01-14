
import mongoose from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const { Schema, model } = mongoose;

const OrderSchema = new Schema({
  customer_name: {
    type: String,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,

  },
  total_quantity: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['submit','processing','shipped','delivered','closed'],
    required: true,
  },
  payment_method: {
    type: String,
    enum: ['cash','onCard'],

    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone_number:
    {
        type: String,
        required: true,
    },
    orderedProducts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'OrderedProduct',
          autopopulate:true,
        },
      ],
}, { timestamps: true });

OrderSchema.plugin(autopopulate);


export default model('Order', OrderSchema);