import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <div className="border p-2">

      <Link to={`/product/${product._id}`}>
        <img
          src={product?.image}
          className="w-full h-52 object-cover"
        />
      </Link>

      <p className="text-sm mt-2">{product.name}</p>
      <p className="font-semibold">₹{product.price}</p>

    </div>
  );
};

export default ProductCard;