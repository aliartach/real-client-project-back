import {Schema, model} from 'mongoose';
import autopopulate from 'mongoose-autopopulate'; //if a problem happened in populate check this naming

const SubCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // products: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Product',
  //   autopopulate: true,
  // }],
  icon: { //might make a default value later
    type: String,
    required: true,
  },
}, {timestamps: true,});

SubCategorySchema.plugin(autopopulate);

export default model('SubCategory', SubCategorySchema);