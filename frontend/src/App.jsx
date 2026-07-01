import Checkout from "./pages/Checkout";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import Home from "./pages/Home";
import Books from "./pages/Books";
import Categories from "./pages/Categories";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Wishlist from "./pages/Wishlist";
import BookDetails from "./pages/BookDetails";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/books" element={<Books />} />

        <Route path="/books/:id" element={<BookDetails />} />

        <Route path="/categories" element={<Categories />} />

        <Route path="/wishlist" element={<Wishlist />} />

        <Route path="/cart" element={<Cart />} />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="*"
          element={<NotFound />}
        />
<Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
}

export default App;