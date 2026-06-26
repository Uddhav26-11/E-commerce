import { useEffect, useContext, useRef } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Success = () => {
  const {
    user,
    cartItems,
    products,
    getCartAmount,
    setCartItems,
    fetchOrders,
  } = useContext(ShopContext);

  const navigate = useNavigate();

  const hasPlaced = useRef(false);

  useEffect(() => {
    const saveOrder = async () => {
      if (hasPlaced.current) return;

      // Wait until products have loaded so cart items
      // can be matched and amount calculated correctly
      if (!products || products.length === 0) return;

      hasPlaced.current = true;

      try {
        const items = products
          .filter((item) => cartItems[item._id] > 0)
          .map((item) => ({
            productId: item._id,
            name: item.name,
            quantity: cartItems[item._id],
            price: item.price,
          }));

        if (!user?.email) {
          navigate("/auth");
          return;
        }

        const amount = getCartAmount();

        await api.post("/orders/create-order", {
          userId: user.email,
          items,
          amount,
        });

        setCartItems({});
        localStorage.removeItem("cartItems");

        await fetchOrders();

        setTimeout(() => {
          navigate("/orders");
        }, 2000);
      } catch (error) {
        console.error(error);
      }
    };

    saveOrder();
  }, [user, cartItems, products, getCartAmount, setCartItems, navigate]);

  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>

      <p>Saving order...</p>
    </div>
  );
};

export default Success;