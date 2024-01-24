import express from "express";
// import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import contentRoutes from "./Routes/Content.js";
import productRoutes from "./Routes/Product.js";
import subCategoryRoutes from "./Routes/SubCategory.js";
import tagRoutes from "./Routes/Tag.js";
import OrderedProductRoutes from "./Routes/OrderedProduct.js";
import orderRoutes from "./Routes/Order.js";
import Admin from "./Routes/Admin.js";
import cookieParser from 'cookie-parser';
import multer from 'multer';
import uploadMiddleware from "./Middlewares/Multer.js"


dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });
// const uploadMiddleware = upload.fields([{ name: 'imageCat', maxCount: 1 }, { name: 'imageDog', maxCount: 1 }]);


// Routes
app.use("/images", express.static("images"));
app.use("/api/product", productRoutes);
app.use("/api/tag", tagRoutes);
app.use("/api/subcategory", subCategoryRoutes);
app.use("/api/orderedProduct", OrderedProductRoutes);
app.use("/api/order", orderRoutes);
app.use('/api/admin', Admin);
app.use("/api/content", contentRoutes)

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`DB connected and Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to the database:", err);
  });
