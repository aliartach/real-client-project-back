import Content from '../Models/Content.js'

// update a content
export const updateContent = async (req, res) => {
  const { id } = req.params; 
  const { body } = req;
  const imageCat = req.files['imageCat'] ? req.files['imageCat'][0].path : null;
  const imageDog = req.files['imageDog'] ? req.files['imageDog'][0].path : null;
  
  try {
    const updatedContent = await Content.findByIdAndUpdate(
      id,
      {
        ...body,
        ...(req.files['imageCat'] && { imageCat }),
        ...(req.files['imageDog'] && { imageDog }),
      },
      { new: true }  // Return the updated document
    );

    if (!updatedContent) {
      return res.status(404).json({ message: 'Content not found' });
    }

    return res.status(200).json({ message: 'Content updated successfully!', content: updatedContent });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
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
 