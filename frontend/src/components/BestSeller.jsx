import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductCard from "./ProductCard";
import Title from "./Title";

const BestSeller = () => {
  const { products } = useContext(ShopContext);

  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    const bestProducts = products.filter(
      (item) => item.bestseller
    );

    // Backend products currently don't have a `bestseller` flag,
    // so fall back to showing the first few products instead of
    // leaving this section empty.
    setBestSeller(
      bestProducts.length > 0
        ? bestProducts.slice(0, 5)
        : products.slice(0, 5)
    );
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1="BEST" text2="SELLERS" />

        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Shop our most popular products loved by customers.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item) => (
          <ProductCard
            key={item._id}
            product={item}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;