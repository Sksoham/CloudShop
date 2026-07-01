const Order = require("../models/Order");

// Create Order
const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);

    res.status(201).json({
      message: "Order Placed Successfully",
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get All Orders of Logged-in User
const getMyOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ user: userId });

    res.json(orders);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
};