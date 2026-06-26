import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import ProductCard from "../components/ProductCard";
import Title from "../components/Title";

const Collection = () => {
  const { products } = useContext(ShopContext);

  const [category, setCategory] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // TOGGLE FILTER
  const toggleCategory = (value) => {
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // FILTER LOGIC
  useEffect(() => {
    if (!products) return;

    let temp = [...products];

    if (category.length > 0) {
      temp = temp.filter((item) =>
        category.includes(item.category)
      );
    }

    setFilteredProducts(temp);
  }, [category, products]);

  return (
    <div className="flex flex-col sm:flex-row gap-10 pt-10 border-t">

      {/* FILTER SECTION */}
      <div className="min-w-60">

        <p className="text-xl font-medium mb-5">FILTERS</p>

        <div className="border border-gray-300 p-4">

          <p className="mb-3 text-sm font-medium">CATEGORIES</p>

          <div className="flex flex-col gap-3 text-sm text-gray-700">

            <label className="cursor-pointer">
              <input
                type="checkbox"
                className="mr-2"
                onChange={() => toggleCategory("Men")}
              />
              Men
            </label>

            <label className="cursor-pointer">
              <input
                type="checkbox"
                className="mr-2"
                onChange={() => toggleCategory("Women")}
              />
              Women
            </label>

            <label className="cursor-pointer">
              <input
                type="checkbox"
                className="mr-2"
                onChange={() => toggleCategory("Kids")}
              />
              Kids
            </label>

          </div>

        </div>

      </div>

      {/* PRODUCTS SECTION */}
      <div className="flex-1">

        <div className="mb-6">
          <Title text1="ALL" text2="COLLECTIONS" />
        </div>

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">

          {filteredProducts.map((item) => (
            <ProductCard
              key={item._id}
              product={item}
            />
          ))}

        </div>

        {/* EMPTY STATE */}
        {filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No products found 😢
          </p>
        )}

      </div>

    </div>
  );
};

export default Collection;