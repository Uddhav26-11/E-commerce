const express = require("express");

const {
  createCheckoutSession,
  createOrder,
  getUserOrders,
  getAllOrders,
  deleteOrder,
} = require("../controllers/orderController");

const { authMiddleware, requireRole } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/create-checkout-session",
  createCheckoutSession
);

router.post(
  "/create-order",
  createOrder
);

router.get(
  "/user/:userId",
  getUserOrders
);

router.get(
  "/all",
  authMiddleware,
  requireRole("manager"),
  getAllOrders
);

router.delete(
  "/:id",
  authMiddleware,
  requireRole("manager"),
  deleteOrder
);

module.exports = router;