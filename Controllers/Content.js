import Content from '../Models/Content.js'

// update a content
export const updateContent = async (req, res) => {
    const {firstDescription, featuredDescription, storyDescription } = req.body;
    const contentId = req.params.id;
    const {imageCat, imageDog} = req.file.path;

    try{

        const content = await Content.findById(contentId);

        if (!content) {
            return res.status(404).json({ message: 'Content not found' });
          }
        //   update the fields
          content.firstDescription = firstDescription;
          content.featuredDescription = featuredDescription;
          content.storyDescription = storyDescription;
          content.imageCat = imageCat;
          content.imageDog = imageDog;
          
          const updatedContent = await content.save();

          res.json(updatedContent);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
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
