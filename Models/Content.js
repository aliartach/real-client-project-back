import mongoose from "mongoose";

const Schema = mongoose.Schema;

const contentSchema = new Schema({
    firstDescription: {
        type: String,
        required: true
    },
    featuredDescription: {
        type: String,
        required: true
    },
    storyDescription: {
        type: String,
        required: true
    },
    imageCat: {
        type: String,
        required: true
    },
    imageDog: {
        type: String,
        required: true
    },
}, {timestamps:true} ) 

export default mongoose.model('Content', contentSchema);
