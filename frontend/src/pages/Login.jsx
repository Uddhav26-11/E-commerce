import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {

  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {

    if (!form.email || !form.password || (!isLogin && !form.name)) {
      return toast.error("Please fill all fields");
    }

    if (isLogin) {
      toast.success("Login successful");
    } else {
      toast.success("Account created");
    }

    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center py-10 border-t">

      <div className="w-full max-w-md border p-6 space-y-4">

        <h2 className="text-2xl font-semibold text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {/* NAME */}
        {!isLogin && (
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="border p-3 w-full"
          />
        )}

        {/* EMAIL */}
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="border p-3 w-full"
        />

        {/* PASSWORD */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="border p-3 w-full"
        />

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          className="bg-black text-white w-full py-3"
        >
          {isLogin ? "Login" : "Create Account"}
        </button>

        {/* TOGGLE */}
        <p className="text-sm text-center">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            className="text-blue-600 cursor-pointer ml-1"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>

      </div>

    </div>
  );
};

export default Login;