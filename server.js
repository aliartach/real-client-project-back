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


dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use("/api/content", contentRoutes)


// Routes
app.use("/images", express.static("images"));
app.use("/api/product", productRoutes);
app.use("/api/tag", tagRoutes);
app.use("/api/subcategory", subCategoryRoutes);
app.use("/api/orderedProduct", OrderedProductRoutes);
app.use("/api/order", orderRoutes);
app.use('/api/admin', Admin);

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
