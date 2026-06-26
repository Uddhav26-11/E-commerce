import { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    if (token) {
      localStorage.setItem("token", token);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("cartItems");
  };

  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProductsData(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : {};
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });
  };

  // Completely removes an item from the cart, regardless of quantity
  const clearItem = (itemId) => {
    setCartItems((prev) => {
      const updated = { ...prev };
      delete updated[itemId];
      return updated;
    });
  };

  const getCartCount = () => {
    let total = 0;
    for (const item in cartItems) {
      total += cartItems[item];
    }
    return total;
  };

  const getCartAmount = () => {
    let total = 0;
    productsData.forEach((product) => {
      if (cartItems[product._id]) {
        total += product.price * cartItems[product._id];
      }
    });
    return total;
  };

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      if (!user) return;

      // Managers (and employees) see every order; customers only see their own
      const res =
        user.role === "manager" || user.role === "employee"
          ? await api.get("/orders/all")
          : await api.get(`/orders/user/${user.email}`);

      setOrders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await api.delete(`/orders/${id}`);
      setOrders((prev) => prev.filter((order) => order._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const value = {
    user,
    setUser,
    login,
    logout,
    products: productsData,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    clearItem,
    getCartCount,
    getCartAmount,
    orders,
    setOrders,
    fetchOrders,
    deleteOrder,
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;