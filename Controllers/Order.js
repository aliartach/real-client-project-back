import Order from "../Models/Order.js";
import OrderedProduct from "../Models/OrderedProduct.js";

//create Order
export const createOrder = async (req, res) => {
  try {
    const {
      orderedProducts,
      customer_name,
      status,
      payment_method,
      address,
      phone_number,
    } = req.body;
    var total_price = 0;
    var total_quantity = 0;
    var error = false;
    for (var i = 0; i < orderedProducts.length; i++) {
      const ordered_product = await OrderedProduct.findById(orderedProducts[i]);

      if (ordered_product) {
        total_price += ordered_product.total_price;
        total_quantity += ordered_product.quantity;
      } else {
        error = true;
      }
    }
    if (error) {
      res.send("invalid orderedProducts");
    }
    const OrderInstance = await Order.create({
      orderedProducts: orderedProducts,
      customer_name: customer_name,
      status: status,
      payment_method: payment_method,
      address: address,
      phone_number: phone_number,
      total_price: total_price,
      total_quantity: total_quantity,
    });

    res.status(201).json(OrderInstance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get all order
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// get a specific order

export const getSingleOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// update an order

export const updateOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const {
      orderedProducts,
      customer_name,
      status,
      payment_method,
      address,
      phone_number,
    } = req.body;

    const order = await Order.findByIdAndUpdate(
      orderId,
      {
        orderedProducts,
        customer_name,
        status,
        payment_method,
        address,
        phone_number,
      },
      { new: true }
    );

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// delete an order
export const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (deletedOrder) {
      res.status(204).send("orders deleted successfully");
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
