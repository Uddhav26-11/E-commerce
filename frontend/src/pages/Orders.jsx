import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Orders = () => {
  const { orders, ordersLoading } = useContext(ShopContext);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">
        My Orders
      </h2>

      {ordersLoading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg p-4 mb-4 shadow-sm"
          >
            <p>
              <strong>Order ID:</strong> {order._id}
            </p>

            <p>
              <strong>Amount:</strong> ₹{order.amount}
            </p>

            <p>
              <strong>Status:</strong> {order.status}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>

            <div className="mt-3">
              <strong>Items:</strong>

              <ul className="list-disc ml-5 mt-2">
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;