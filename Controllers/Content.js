import Content from '../Models/Content.js'
import multer from "../Middlewares/Multer.js"

// update a content
export const updateContent = async (req, res) => {
  const { ContentId } = req.params;
  try {
    const { firstDescription, featuredDescription, storyDescription } = req.body;

  
    if (!req.files) {
   
      const updatedContent = await Content.findByIdAndUpdate(
        ContentId,
        updatedFields,
        { new: true }
      );

      return res.status(200).json(updatedContent);
    }

   
    const existingContent = await Content.findById(req.params.id);

  
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
// Create a new content
export const createContent = async (req, res) => {
  const { firstDescription, featuredDescription, storyDescription } = req.body;
  const imageCat = req.files['imageCat'] ? req.files['imageCat'][0].path : null;
  const imageDog = req.files['imageDog'] ? req.files['imageDog'][0].path : null;

  try {
     // Create a new content instance
     const newContent = new Content({
       firstDescription,
       featuredDescription,
       storyDescription,
       imageCat,
       imageDog,
     });

     // Save the content to the database
     const savedContent = await newContent.save();

     res.status(201).json({ message: 'Content created successfully!', content: savedContent });
  } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Internal Server Error' });
  }
 };

