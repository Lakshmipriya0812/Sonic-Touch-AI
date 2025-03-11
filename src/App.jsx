import React, { useState, useEffect } from "react";
import "./index.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import HeaderBeforeLogin from "./components/headers/HeaderBeforeLogin";
import HeaderAfterLogin from "./components/headers/HeaderAfterLogin";
import Footer from "./components/Footer";
import RoutesConfig from "./routes/RoutesConfig";
import CartProvider from "./context/CartContext";
import OrderDetails from "./components/OrderDetails";

function App() {
  return (
    <Router>
      <AppWithCartProvider />
    </Router>
  );
}

function AppWithCartProvider() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("token") !== null;
    setIsAuthenticated(loggedIn);
  }, []);

  return (
    <CartProvider navigate={navigate}>
      <div className="min-h-screen flex flex-col">
        {isAuthenticated ? (
          <HeaderAfterLogin setIsAuthenticated={setIsAuthenticated} />
        ) : (
          <HeaderBeforeLogin setIsAuthenticated={setIsAuthenticated} />
        )}
        <main>
          <Routes>
            <Route
              path="/*"
              element={<RoutesConfig setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/order/:orderId" element={<OrderDetails />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
}

export default App;
