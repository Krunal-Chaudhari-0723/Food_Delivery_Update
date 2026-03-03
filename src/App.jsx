import React, { useContext } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import Placeorder from "./Pages/Placeorder/Placeorder";
import Footer from "./Components/Footer/Footer";
import Login from "./Components/Login/Login";
import { StoreContext } from "./context/StoreContext";

const App = () => {
  const { token } = useContext(StoreContext);

  return (
    <div className="App">
      <Routes>

        {/* Login Page (Public) */}
        <Route path="/login" element={<Login />} />

        {/* Protect Everything Else */}
        <Route
          path="*"
          element={
            token ? (
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/order" element={<Placeorder />} />
                </Routes>
                <Footer />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

      </Routes>
    </div>
  );
};

export default App;