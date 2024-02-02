import {Schema, model} from 'mongoose';

const TagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
    autopopulate: true,
  }],
}, {timestamps: true,});

const Tag = model('Tag', TagSchema);

export default Tag;
