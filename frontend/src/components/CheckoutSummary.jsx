import "./CheckoutSummary.css";
import { useNavigate } from "react-router-dom";

function CheckoutSummary({
  totalItems,
  totalPrice,
}) {

  const navigate = useNavigate();

  return (
    <div className="summary">

      <h2>Order Summary</h2>

      <div className="summary-row">
        <span>Items</span>
        <span>{totalItems}</span>
      </div>

      <div className="summary-row">
        <span>Subtotal</span>
        <span>₹{totalPrice}</span>
      </div>

      <div className="summary-row">
        <span>Delivery</span>
        <span style={{ color: "green" }}>
          FREE
        </span>
      </div>

      <hr />

      <div className="summary-row total">
        <span>Total</span>
        <span>₹{totalPrice}</span>
      </div>

      <button
        className="checkout"
        onClick={() => navigate("/checkout")}
      >
        Proceed to Checkout
      </button>

    </div>
  );
}

export default CheckoutSummary;