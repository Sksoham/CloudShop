import "./CartItem.css";

function CartItem({
  book,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
}) {
  return (
    <div className="cart-item-card">

      <img
        src={book.image}
        alt={book.title}
      />

      <div className="cart-info">

        <h2>{book.title}</h2>

        <p>{book.description}</p>

        <h3>₹{book.price}</h3>

        <div className="quantity">

          <button
            onClick={() => decreaseQuantity(book.id)}
          >
            −
          </button>

          <span>{book.quantity}</span>

          <button
            onClick={() => increaseQuantity(book.id)}
          >
            +
          </button>

        </div>

        <h4>
          Subtotal ₹
          {book.price * book.quantity}
        </h4>

        <button
          className="remove"
          onClick={() => removeItem(book.id)}
        >
          🗑 Remove
        </button>

      </div>

    </div>
  );
}

export default CartItem;