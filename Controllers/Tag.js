import Tag from "../Models/Tag.js";
import Product from "../Models/Product.js";
export const getAllTags = async (req, res) => {
    try {
      const tags = await Tag.find();
      res.json({tags, message: "Successfully get all tags" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  };
  export const getTagById=async (req, res) => {
   
    try {
      const tag = await Tag.findById(req.params.id);
      if (!tag) {
        return res.status(404).json({ message: 'tag not found' });
      }
      res.json(tag);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  };

 export const createTag=async (req, res) => {
  try {
    const { products } = req.body; 
    const new_tag = new Tag(req.body);

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

    const createdTag = await new_tag.save();
    res.status(200).json(createdTag);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  export const updateTag=async (req, res) => {
    try {
      const { products } = req.body; // Corrected: Use 'products' instead of 'Product'
      const tag_update_copy = req.body;
  
     
  
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
  
      const updatedTag= await Tag.findByIdAndUpdate(
        req.params.id,
        tag_update_copy,
        { new: true, runValidators: true }
      );
  
      if (!updatedTag) {
        return res.status(404).json({ message: 'tag not found' });
      }
  
      res.status(200).json(updatedTag);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  export const deleteTag = async (req, res) => {
    
  
    try {
      const deletedtag = await Tag.findByIdAndDelete(req.params.id);
  
      if (!deletedtag) {
        return res.status(404).json({ message: 'tag not found' });
      }
  
      res.json({ message: 'tag deleted successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  };