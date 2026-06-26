import { BrowserRouter, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import { ShopContext } from "./context/ShopContext";

const PUBLIC_PATHS = ["/auth"];

function AppWrapper() {
  const { user } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!user && !PUBLIC_PATHS.includes(location.pathname)) {
      navigate("/auth");
    }
  }, [user, navigate, location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Toaster position="top-right" />

      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        <AppRoutes />
      </main>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;