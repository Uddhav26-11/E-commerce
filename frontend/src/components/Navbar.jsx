import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const Navbar = () => {
  const { getCartCount, user, logout } = useContext(ShopContext);

  return (
    <div className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">

        <NavLink to="/">
          <img src={assets.logo} className="w-28" alt="logo" />
        </NavLink>

        <div className="hidden sm:flex items-center gap-8 text-sm font-medium">

          <NavLink to="/">Home</NavLink>
          <NavLink to="/collection">Collection</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>

          {user && (
            <NavLink to="/orders">
              Orders
            </NavLink>
          )}

          {user?.role === "manager" && (
            <NavLink to="/manager">
              Manager Panel
            </NavLink>
          )}

        </div>

        <div className="flex items-center gap-4">

          {user?.role !== "manager" && (
            <NavLink to="/cart" className="relative">
              <img
                src={assets.cart_icon}
                className="w-6"
                alt="cart"
              />

              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white rounded-full w-5 h-5 text-[10px] flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </NavLink>
          )}

          {user && <span>{user.name}</span>}

          {!user ? (
            <NavLink
              to="/auth"
              className="border px-4 py-2 rounded"
            >
              Login
            </NavLink>
          ) : (
            <button
              onClick={logout}
              className="border px-4 py-2 rounded"
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </div>
  );
};

export default Navbar;