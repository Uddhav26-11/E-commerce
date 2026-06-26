import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import toast from "react-hot-toast";
import api from "../services/api";

const Auth = () => {
  const { login } = useContext(ShopContext);
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password || (!isLogin && !form.name)) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const endpoint = isLogin ? "/users/login" : "/users/register";

      const payload = isLogin
        ? { email: form.email, password: form.password }
        : { name: form.name, email: form.email, password: form.password };

      const res = await api.post(endpoint, payload);

      // Save the token + user in context/localStorage so the session
      // survives a page refresh.
      login(res.data.user, res.data.token);

      toast.success(
        isLogin ? "Login Successful" : "Account Created Successfully"
      );

      navigate("/");
    } catch (error) {
      const message =
        error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">

        {/* Logo + Brand */}
        <div className="text-center mb-8">

          <div className="flex justify-center mb-3">
            <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center text-3xl font-bold">
              F
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-wide">
            ForeverBuy
          </h1>

          <p className="text-gray-500 mt-2 text-sm">
            Premium Fashion & Lifestyle Store
          </p>

        </div>

        <h2 className="text-2xl font-semibold text-center mb-6">
          {isLogin ? "Welcome Back" : "Create Your Account"}
        </h2>

        {!isLogin && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Full Name
            </label>

            <input
              name="name"
              placeholder="Enter your full name"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-black"
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Email Address
          </label>

          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-black"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Password
          </label>

          <input
            name="password"
            type="password"
            placeholder="Enter your password"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-black"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition disabled:opacity-60"
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
        </button>

        <p
          className="text-center mt-5 text-sm cursor-pointer text-blue-600"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Login"}
        </p>

      </div>

    </div>
  );
};

export default Auth;