import Product from "../Models/Product.js";
import SubCategory from "../Models/SubCategory.js";
import Tag from "../Models/Tag.js";

//create product
export const createProduct = async(req, res) => {
  try {
    const { sub_categories, tags } = req.body;

    const new_product = new Product(req.body);

    if (req.file) {
      new_product.image = req.file.path;
    }

    var found_all_subcategories_flag = true; // a flag to know if all subcategories entered are found in their table
    var found_all_tags_flag = true;
    var wrong_subcategories_input = []; // to record any wrong sub category id entered
    var wrong_tags_input = [];

    for (let i=0; i < sub_categories?.length; i++) {
      var sub_category = await SubCategory.findById(sub_categories[i]);
      if (!sub_category) {
        wrong_subcategories_input.push(sub_categories[i])
        found_all_subcategories_flag = false;
      }
    }
    if (!found_all_subcategories_flag) {
      return res.status(404).json({error: `sub categories with ids ${wrong_subcategories_input} not found`})
    }

    for (let i=0; i < tags?.length; i++) {
      var tag = await Tag.findById(tags[i]);
      if (!tag) {
        wrong_tags_input.push(tags[i])
        found_all_tags_flag = false;
      }
    }
    if (!found_all_tags_flag) {
      return res.status(404).json({error: `tags with ids ${wrong_tags_input} not found`})
    }

    const product = await new_product.save();
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

// get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('sub_categories').populate('tags');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get featured products
export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({featured: true}).populate('sub_categories').populate('tags');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get product by id
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('sub_categories').populate('tags');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update a product
export const updateProductById = async (req, res) => {
  try {
    const { sub_categories, tags } = req.body;
    const product_update_copy = req.body;

    if (req.file) {
      product_update_copy.image = req.file.path;
    }

    var found_all_subcategories_flag = true; // a flag to know if all subcategories entered are found in their table
    var found_all_tags_flag = true;
    var wrong_subcategories_input = []; // to record any wrong sub category id entered
    var wrong_tags_input = [];

    for (let i=0; i < sub_categories?.length; i++) {
      var sub_category = await SubCategory.findById(sub_categories[i]);
      if (!sub_category) {
        wrong_subcategories_input.push(sub_categories[i])
        found_all_subcategories_flag = false;
      }
    }
    if (!found_all_subcategories_flag) {
      return res.status(404).json({error: `sub categories with ids ${wrong_subcategories_input} not found`})
    }

    for (let i=0; i < tags?.length; i++) {
      var tag = await Tag.findById(tags[i]);
      if (!tag) {
        wrong_tags_input.push(tags[i])
        found_all_tags_flag = false;
      }
    }
    if (!found_all_tags_flag) {
      return res.status(404).json({error: `tags with ids ${wrong_tags_input} not found`})
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      product_update_copy,
      { new: true, runValidators: true } //new is to return updated object, validators is to validate conditions provided in models
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a product
export const deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};