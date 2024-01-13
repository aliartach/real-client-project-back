import {Schema, model} from 'mongoose';
import autopopulate from 'mongoose-autopopulate'; //if a problem happened in populate check this naming

const SubCategorySchema = new Schema({
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
  icon: { //might make a default value later
    type: String,
    required: true,
  },
}, {timestamps: true,});

// SubCategorySchema.pre('findOneAndUpdate', async function (next) { // this middleware works before updating any subcategory, we use es5 function because it can use "this." expression
//   const sub_category_id = this.getQuery()._id;

//   await model('Product').updateMany({ 'sub_categories._id': sub_category_id }, { $set: { 'sub_categories.$': {_id: sub_category_id, } } }); //'sub_categories._id' means each _id field in each object in the array sub_categories

//   next();
// });

SubCategorySchema.plugin(autopopulate);

const SubCategory = model('SubCategory', SubCategorySchema);

export default SubCategory;