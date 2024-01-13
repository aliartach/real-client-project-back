import {Schema, model} from 'mongoose';
import autopopulate from 'mongoose-autopopulate'; //if a problem happened in populate check this naming

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

TagSchema.plugin(autopopulate);

export default model('Tag', TagSchema);