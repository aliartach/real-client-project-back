import express from "express";
// import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import productRoutes from './Routes/Product.js';
import subCategoryRoutes from "./Routes/SubCategory.js";
import tagRoutes from "./Routes/Tag.js";

dotenv.config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors());

// Routes
app.use('/images', express.static('images'));
app.use('/api/product', productRoutes);
app.use('/api/tag', tagRoutes);
app.use('/api/subcategory', subCategoryRoutes);

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
