import Product from "../Models/Product.js";
import OrderedProduct from "../Models/OrderedProduct.js";

//create OrderedProduct
export const createOrderedProduct = async (req, res) => {
  const { quantity } = req.body;
  try {
    var product = await Product.findById(req.body.product);

    if (!product) {
      console.log(`Product not found ${req.body.product}`);
      return res.status(404).json({ error: "Product not found" });
    }

    var total_price = quantity * product.price;

    const OrderedProductInstance = await OrderedProduct.create({
      quantity: quantity,
      product: product,
      total_price: total_price,
    });

    res.status(201).json(OrderedProductInstance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get all orderedproduct
export const getAllOrderedProducts = async (req, res) => {
  try {
    const ordered_products = await OrderedProduct.find();
    res.status(200).json(ordered_products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get product by id
export const getOrderedProductById = async (req, res) => {
  try {
    const ordered_products = await OrderedProduct.findById(req.params.id);
    if (!ordered_products) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(ordered_products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// update ordered products
export const updateOrderedProduct = async (req, res) => {
  const { id } = req.params;
  const quantity = req.body.quantity;
  try {
    var product = await Product.findById(req.body.product);

    if (!product) {
      console.log(`Product not found ${req.body.product}`);
      return res.status(404).json({ error: "Product not found" });
    }

    var total_price = quantity * product.price;

    const OrderedProductInstance = await OrderedProduct.findOneAndUpdate(
      { _id: id },
      {
        quantity: quantity,
        product: product,
        total_price: total_price,
      },
      { new: true }
    );

    if (!OrderedProductInstance) {
      return res.status(404).json({ error: "OrderedProduct not found" });
    }

    res.status(200).json(OrderedProductInstance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// delete a orderded product
export const deleteOrderedProductById = async (req, res) => {
  try {
    const orderded_product = await OrderedProduct.findByIdAndDelete(
      req.params.id
    );

    if (!orderded_product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
