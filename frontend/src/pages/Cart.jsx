import "./Cart.css";

import CartItem from "../components/CartItem";
import CheckoutSummary from "../components/CheckoutSummary";

import { useCart } from "../context/CartContext";

function Cart() {

  const {
    cart,
    totalItems,
    totalPrice,
    increaseQuantity,
    decreaseQuantity,
    removeItem,
  } = useCart();

  return (
    <section className="cart-page">

      <div className="cart-left">

        <h1>Shopping Cart</h1>

        {cart.length === 0 ? (
          <h2>Your Cart is Empty</h2>
        ) : (
          cart.map((book) => (
            <CartItem
              key={book.id}
              book={book}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              removeItem={removeItem}
            />
          ))
        )}

      </div>

      <div className="cart-right">

        <CheckoutSummary
          totalItems={totalItems}
          totalPrice={totalPrice}
        />

      </div>

    </section>
  );
}

export default Cart;