import Content from '../Models/Content.js'
import multer from "../Middlewares/Multer.js"

// update a content
export const updateContent = async (req, res) => {
  try {
    const { firstDescription, featuredDescription, storyDescription } = req.body;

    // Check if req.files is an object
    if (!req.files) {
      // If no files are uploaded, update other fields without checking for imageCat or imageDog
      const updatedContent = await Content.findByIdAndUpdate(
        req.params.id,
        {
          firstDescription,
          featuredDescription,
          storyDescription,
        },
        { new: true }
      );

      return res.status(200).json(updatedContent);
    }

    // Get existing content
    const existingContent = await Content.findById(req.params.id);

    // Update only the specified fields
    const updatedFields = {
      firstDescription: firstDescription || existingContent.firstDescription,
      featuredDescription: featuredDescription || existingContent.featuredDescription,
      storyDescription: storyDescription || existingContent.storyDescription,
    };

    if (req.files.imageCat) {
      updatedFields.imageCat = req.files.imageCat[0].path;
    }

    if (req.files.imageDog) {
      updatedFields.imageDog = req.files.imageDog[0].path;
    }

    const updatedContent = await Content.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    res.status(200).json(updatedContent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// get all the content
export const getAllContent = async (req, res) => {
    try {
        const contents = await Content.find();
        res.json(contents);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message : 'Internal Server Error' });
    }
};

// get a content by id
export const getContentById = async (req, res) => {
    const contentId = req.params.id;
  
    try {
      const content = await Content.findById(contentId);
  
      if (!content) {
        return res.status(404).json({ message: 'Content not found' });
      }
  
      res.json(content);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };

// create a content
export const createContent = async (req, res) => {
  try {
    console.log(req.files);

    const { firstDescription, featuredDescription, storyDescription } = req.body;

    // Check if req.files is an object with the expected properties
    if (!req.files || !req.files.imageCat || !req.files.imageDog) {
      return res.status(400).json({ error: 'Invalid file structure in request.' });
    }

    // Get file paths from Multer upload
    const imageCat = req.files.imageCat[0].path;
    const imageDog = req.files.imageDog[0].path;

    const newContent = new Content({
      firstDescription,
      featuredDescription,
      storyDescription,
      imageCat,
      imageDog,
    });

    const savedContent = await newContent.save();

    res.status(201).json(savedContent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

