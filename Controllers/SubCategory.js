
import SubCategory from "../Models/SubCategory.js";
import Product from "../Models/Product.js";
export const getAllSubCategories = async (req, res) => {
    try {
      const subCategories = await SubCategory.find();
      res.json({ subCategories, message: "Successfully get all sub categories" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  };
  

  export const getSubCategoryById=async (req, res) => {
 
    try {
    
      const subCategory = await SubCategory.findById(req.params.id);
      if (!subCategory) {
        return res.status(404).json({ message: 'SubCategory not found' });
      }
      res.json(subCategory);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  };
  export const createSubCategory = async (req, res) => {
    try {
      const { products } = req.body; 
      const new_sub_category = new SubCategory(req.body);
  
      if (req.file) {
        new_sub_category.icon = req.file.path;
      }
  
      var found_all_products_flag = true;
      var wrong_products_input = [];
  
      for (let i = 0; i < products.length; i++) {
        var product = await Product.findById(products[i]);
  
        if (!product) {
          wrong_products_input.push(products[i]);
          found_all_products_flag = false;
        }
      }
  
      if (!found_all_products_flag) {
        return res.status(404).json({ error: `Products with ids ${wrong_products_input} not found` });
      }
  
      const subCategory = await new_sub_category.save();
      res.status(200).json(subCategory);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  export const updateSubCategory = async (req, res) => {
    try {
      const { products } = req.body; // Corrected: Use 'products' instead of 'Product'
      const subCategory_update_copy = req.body;
  
      if (req.file) {
        subCategory_update_copy.icon = req.file.path;
      }
  
      var found_all_products_flag = true;
      var wrong_products_input = [];
  
      for (let i = 0; i < products.length; i++) {
        var product = await Product.findById(products[i]);
  
        if (!product) {
          wrong_products_input.push(products[i]);
          found_all_products_flag = false;
        }
      }
  
      if (!found_all_products_flag) {
        return res.status(404).json({ error: `Products with ids ${wrong_products_input} not found` });
      }
  
      const updatedSubCategory = await SubCategory.findByIdAndUpdate(
        req.params.id,
        subCategory_update_copy,
        { new: true, runValidators: true }
      );
  
      if (!updatedSubCategory) {
        return res.status(404).json({ message: 'Subcategory not found' });
      }
  
      res.status(200).json(updatedSubCategory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

  export const deleteSubCategory = async (req, res) => {

  
    try {
      const deletedSubCategory = await SubCategory.findByIdAndDelete(req.params.id);
  
      if (!deletedSubCategory) {
        return res.status(404).json({ message: 'SubCategory not found' });
      }
  
      res.json({ message: 'SubCategory deleted successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  };
  
