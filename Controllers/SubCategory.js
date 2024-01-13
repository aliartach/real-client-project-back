
import SubCategory from "../Models/SubCategory.js";
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
    const { id } = req.params;
    try {
      const subCategory = await SubCategory.findById(id);
      if (!subCategory) {
        return res.status(404).json({ message: 'SubCategory not found' });
      }
      res.json(subCategory);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  };

 export const createSubCategory=async (req, res) => {
    const { name} = req.body;
    if (!name || !req.file) {
      return res.status(400).json({ message: 'Name and icon are required.' });
    }
    try {
        const icon = req.file.path;
      const newSubCategory = await SubCategory.create({ name,icon });
      res.status(201).json(newSubCategory);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }

 };
  export const updateSubCategory=async (req, res) => {
    const { id } = req.params;
    const { name} = req.body;

    try {
        const icon = req.file ? req.file.path : null;

      const updatedSubCategory = await SubCategory.findByIdAndUpdate(
        id,
        { name, icon },
        { new: true }
      );

      if (!updatedSubCategory) {
        return res.status(404).json({ message: 'SubCategory not found' });
      }

      res.json(updatedSubCategory);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  };

  export const deleteSubCategory = async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedSubCategory = await SubCategory.findByIdAndDelete(id);
  
      if (!deletedSubCategory) {
        return res.status(404).json({ message: 'SubCategory not found' });
      }
  
      res.json({ message: 'SubCategory deleted successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  };
  
