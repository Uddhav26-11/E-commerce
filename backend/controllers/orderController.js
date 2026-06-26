const stripe = require("../config/stripe");
const Order = require("../models/Order");

const createCheckoutSession = async (req, res) => {
  try {
    const {
      items,
      amount,
      customer,
      address,
    } = req.body;

    const line_items = items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    const frontendUrl =
      process.env.FRONTEND_URL || "https://e-commerce-vcta.vercel.app";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${frontendUrl}/success`,
      cancel_url: `${frontendUrl}/cart`,
    });

    await Order.create({
      customer,
      address,
      items,
      amount,
      payment: false,
      paymentStatus: "Pending",
      status: "Pending",
    });

    res.json({
      id: session.id,
      url: session.url,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      items,
      amount,
      customer,
      address,
    } = req.body;

    const order = await Order.create({
      userId,
      customer,
      address,
      items,
      amount,
      payment: true,
      paymentStatus: "Paid",
      status: "Pending",
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({
      userId,
    }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order =
      await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCheckoutSession,
  createOrder,
  getUserOrders,
  getAllOrders,
  deleteOrder,
};