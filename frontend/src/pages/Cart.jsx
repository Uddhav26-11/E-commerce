import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const Cart = () => {

  const {
    cartItems,
    products,
    addToCart,
    removeFromCart,
    clearItem,
    getCartAmount
  } = useContext(ShopContext);

  const cartProducts = products.filter(
    (p) => cartItems[p._id] > 0
  );

  if (cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-5xl mb-4">🛒</div>
        <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">
          Looks like you haven't added anything yet.
        </p>
        <Link
          to="/collection"
          className="bg-black text-white px-8 py-3 rounded hover:bg-gray-800 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="border-t py-10 max-w-5xl mx-auto px-4">

      <h1 className="text-2xl font-semibold mb-1">
        Shopping Cart
      </h1>
      <p className="text-gray-500 text-sm mb-8">
        {cartProducts.length} {cartProducts.length === 1 ? "item" : "items"} in your cart
      </p>

      <div className="space-y-4">

        {cartProducts.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between border rounded-lg p-4 hover:shadow-sm transition"
          >

            {/* IMAGE + NAME */}
            <div className="flex items-center gap-4 flex-1 min-w-0">

              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md border flex-shrink-0"
              />

              <div className="min-w-0">
                <p className="font-medium truncate">{item.name}</p>
                <p className="text-gray-500 mt-1">₹{item.price}</p>
              </div>

            </div>

            {/* QUANTITY */}
            <div className="flex items-center gap-3 border rounded-md px-2 py-1 mx-6">

              <button
                onClick={() => removeFromCart(item._id)}
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 transition text-lg"
                aria-label="Decrease quantity"
              >
                −
              </button>

              <span className="w-6 text-center font-medium">
                {cartItems[item._id]}
              </span>

              <button
                onClick={() => addToCart(item._id)}
                className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 transition text-lg"
                aria-label="Increase quantity"
              >
                +
              </button>

            </div>

            {/* LINE TOTAL */}
            <div className="w-20 text-right font-medium hidden sm:block">
              ₹{item.price * cartItems[item._id]}
            </div>

            {/* REMOVE */}
            <button
              onClick={() => clearItem(item._id)}
              className="text-red-500 text-sm ml-6 hover:underline flex-shrink-0"
            >
              Remove
            </button>

          </div>
        ))}

      </div>

      {/* TOTAL + CHECKOUT */}
      <div className="mt-10 flex flex-col items-end gap-4 border-t pt-6">
        <div className="text-right">
          <p className="text-gray-500 text-sm">Total Amount</p>
          <p className="text-2xl font-semibold">₹{getCartAmount()}</p>
        </div>

        <Link
          to="/place-order"
          className="bg-black text-white px-10 py-3 rounded hover:bg-gray-800 transition text-center w-full sm:w-auto"
        >
          Proceed to Checkout
        </Link>
      </div>

    </div>
  );
};

export default Cart;