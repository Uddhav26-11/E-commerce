import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import toast from "react-hot-toast";
import api from "../services/api";

const PlaceOrder = () => {
  const { user, cartItems, products, getCartAmount } =
    useContext(ShopContext);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async () => {
    if (!user) {
      toast.error("Please login first");
      navigate("/auth");
      return;
    }

    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.pincode
    ) {
      return toast.error("Please fill all details");
    }

    if (Object.keys(cartItems).length === 0) {
      return toast.error("Cart is empty");
    }

    const items = products
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        name: item.name,
        price: item.price,
        quantity: cartItems[item._id],
      }));

    const orderData = {
      userId: user.email,
      customer: {
        name: form.name,
        email: user.email,
      },

      address: {
        name: form.name,
        phone: form.phone,
        address: form.address,
        city: form.city,
        pincode: form.pincode,
      },

      items,
      amount: getCartAmount(),
    };

    console.log("ORDER DATA =>", orderData);

    try {
      setLoading(true);

      const res = await api.post(
        "/orders/create-checkout-session",
        orderData
      );

      window.location.href = res.data.url;
    } catch (error) {
      console.error(error);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-t py-10 flex flex-col lg:flex-row gap-10">

      <div className="lg:w-1/2 space-y-4">

        <h2 className="text-2xl font-semibold">
          Delivery Information
        </h2>

        <input
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="border p-3 w-full"
        />

        <input
          name="phone"
          placeholder="Phone Number"
          onChange={handleChange}
          className="border p-3 w-full"
        />

        <input
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className="border p-3 w-full"
        />

        <input
          name="city"
          placeholder="City"
          onChange={handleChange}
          className="border p-3 w-full"
        />

        <input
          name="pincode"
          placeholder="Pincode"
          onChange={handleChange}
          className="border p-3 w-full"
        />

      </div>

      <div className="lg:w-1/2 border rounded-lg p-6 shadow-sm">

        <h2 className="text-xl font-semibold mb-4">
          Order Summary
        </h2>

        <div className="space-y-3 text-sm">

          {products.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
                <div
                  key={item._id}
                  className="flex justify-between"
                >
                  <span>{item.name}</span>
                  <span>
                    Qty: {cartItems[item._id]}
                  </span>
                </div>
              );
            }

            return null;
          })}

        </div>

        <hr className="my-4" />

        <div className="flex justify-between text-lg font-semibold">
          <p>Total Amount</p>
          <p>₹{getCartAmount()}</p>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-md mt-5 hover:bg-gray-800 transition disabled:opacity-60"
        >
          {loading
            ? "Processing..."
            : "Proceed To Checkout"}
        </button>

      </div>

    </div>
  );
};

export default PlaceOrder;