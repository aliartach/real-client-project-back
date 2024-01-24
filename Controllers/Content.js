import Content from '../Models/Content.js'

// update a content
export const updateContent = async (req, res) => {
  const { ContentId } = req.params;
  const imageCat = req.file?.path;
  const imageDog = req.file?.path;

  try {
    if (req.body) {
      const updatedContent = await Content.findByIdAndUpdate(
        ContentId,
        { ...req.body, imageCat, imageDog },
       
      );

      if (!updatedContent) {
        return res.status(404).json({ message: 'Content not found' });
      }

      return res.status(200).json({ message: 'Content updated successfully!', Content: updatedContent });
    }

    res.status(400).json({ message: 'Something went wrong' });
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
