import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import axios from "axios";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const { cart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);

  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/orders", {
        user: user.id,
        books: cart,
        totalAmount: totalPrice,
      });

      alert("🎉 Order placed successfully!");

      clearCart();

      navigate("/orders");

    } catch (err) {
      console.error(err);
      alert("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">

      <div className="checkout-card">

        <h1>Checkout</h1>

        <h2>Order Summary</h2>

        {cart.map((book) => (
          <div className="checkout-item" key={book.id}>
            <span>
              {book.title} × {book.quantity}
            </span>

            <strong>
              ₹{book.price * book.quantity}
            </strong>
          </div>
        ))}

        <hr />

        <h2>Total : ₹{totalPrice}</h2>

        <button
          className="place-order-btn"
          onClick={placeOrder}
          disabled={loading}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>

      </div>

    </div>
  );
}

export default Checkout;