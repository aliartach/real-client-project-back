import Tag from "../Models/Tag.js";
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
    const { id } = req.params;
    try {
      const tag = await Tag.findById(id);
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
    const { name} = req.body;

    try {

      const newtag = await Tag.create({ name });
      res.status(201).json(newtag);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }

 };
  export const updateTag=async (req, res) => {
    const { id } = req.params;
    const { name} = req.body;

    try {


      const updatedtag = await Tag.findByIdAndUpdate(
        id,
        { name },

      );

      if (!updatedtag) {
        return res.status(404).json({ message: 'tag not found' });
      }

      res.json(updatedtag);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  };

  export const deleteTag = async (req, res) => {
    const { id } = req.params;

    try {
      const deletedtag = await Tag.findByIdAndDelete(id);

      if (!deletedtag) {
        return res.status(404).json({ message: 'tag not found' });
      }

      res.json({ message: 'tag deleted successfully' });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Internal Server Error');
    }
  };