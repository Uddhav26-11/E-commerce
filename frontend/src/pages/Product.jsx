import { useParams } from "react-router-dom";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import toast from "react-hot-toast";

const Product = () => {

  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);

  const [size, setSize] = useState(null);

  const product = products?.find(
    (item) => String(item._id) === String(productId)
  );

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-500">
        Product not found 😢
      </div>
    );
  }

  return (
    <div className="border-t py-10 flex flex-col md:flex-row gap-10">

      {/* IMAGE */}
      <div className="md:w-1/2">
        <img
          src={product.image}
          className="w-full border"
          alt=""
        />
      </div>

      {/* DETAILS */}
      <div className="md:w-1/2 space-y-6">

        <h1 className="text-2xl font-semibold">
          {product.name}
        </h1>

        <p className="text-gray-600">
          ₹{product.price}
        </p>

        <p className="text-gray-500">
          {product.description}
        </p>

        {/* SIZE */}
        <div>
          <p className="font-medium mb-2">Select Size</p>

          <div className="flex gap-2">

            {["S", "M", "L", "XL"].map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-3 py-1 border transition ${
                  size === s ? "bg-black text-white" : ""
                }`}
              >
                {s}
              </button>
            ))}

          </div>
        </div>

        {/* ADD TO CART */}
        <button
          onClick={() => {
            if (!size) {
              return toast.error("Please select size");
            }

            addToCart(product._id);
            toast.success("Added to cart");
          }}
          className="bg-black text-white px-6 py-3"
        >
          Add to Cart
        </button>

      </div>

    </div>
  );
};

export default Product;