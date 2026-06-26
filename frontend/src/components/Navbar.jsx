import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const Navbar = () => {
  const { getCartCount, user, logout } = useContext(ShopContext);

  return (
    <div className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/">
          <img
            src={assets.logo}
            className="w-28 cursor-pointer"
            alt="logo"
          />
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-8 text-sm font-medium">

          <NavLink
            to="/"
            className={({ isActive }) =>
              `pb-1 border-b-2 ${
                isActive
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-black"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/collection"
            className={({ isActive }) =>
              `pb-1 border-b-2 ${
                isActive
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-black"
              }`
            }
          >
            Collection
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `pb-1 border-b-2 ${
                isActive
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-black"
              }`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `pb-1 border-b-2 ${
                isActive
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-black"
              }`
            }
          >
            Contact
          </NavLink>

          {/* Customer Links */}
          {user?.role === "customer" && (
            <>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  `pb-1 border-b-2 ${
                    isActive
                      ? "border-black text-black"
                      : "border-transparent text-gray-500 hover:text-black"
                  }`
                }
              >
                Orders
              </NavLink>
            </>
          )}

          {/* Manager */}
          {user?.role === "manager" && (
            <NavLink
              to="/manager"
              className={({ isActive }) =>
                `pb-1 border-b-2 ${
                  isActive
                    ? "border-black text-black"
                    : "border-transparent text-gray-500 hover:text-black"
                }`
              }
            >
              Manager Panel
            </NavLink>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Customer Cart */}
          {user?.role === "customer" && (
            <NavLink
              to="/cart"
              className="relative p-2 rounded-full hover:bg-gray-100"
            >
              <img
                src={assets.cart_icon}
                className="w-6"
                alt="cart"
              />

              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                  {getCartCount()}
                </span>
              )}
            </NavLink>
          )}

          {/* User Name */}
          {user && (
            <span className="text-sm font-medium">
              {user.name}
            </span>
          )}

          {/* Login */}
          {!user && (
            <NavLink
              to="/auth"
              className="border border-black px-4 py-2 rounded-md text-sm font-medium hover:bg-black hover:text-white transition"
            >
              Login
            </NavLink>
          )}

          {/* Logout */}
          {user && (
            <button
              onClick={logout}
              className="border border-black px-4 py-2 rounded-md text-sm font-medium hover:bg-black hover:text-white transition"
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