import {Schema, model} from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const ProductSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  sub_categories: [{
    type: Schema.Types.ObjectId,
    ref: 'SubCategory',
    autopopulate: true,
  }],
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag',
    autopopulate: true,
  }],
  description: {
    type: String,
    required: true,
  },
  price: { //add currency to price later
    type: Number,
    required: true,
  },
  image: { //might make required false
    type: String,
    required: true,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    required: true,
    enum: ['Cats and Dogs', 'Dogs'],
  },
  quantity: {
    type: Number,
    default: 0,
  },
  weight: { //add unit in front
    type: Number,
    required: false,
  },
  
}, {timestamps: true,});

ProductSchema.plugin(autopopulate);

const Product = model('Product', ProductSchema);

export default Product;