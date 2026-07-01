import { useParams } from "react-router-dom";
import books from "../data/books";
import { useCart } from "../context/CartContext";
import "./BookDetails.css";

function BookDetails() {

  const { id } = useParams();

  const { addToCart } = useCart();

  const book = books.find(
    (b) => b.id === Number(id)
  );

  if (!book) {
    return <h2>Book not found.</h2>;
  }

  return (
    <section className="details-page">

      <div className="details-image">

        <img
          src={book.image}
          alt={book.title}
        />

      </div>

      <div className="details-content">

        <h1>{book.title}</h1>

        <p className="author">
          {book.author}
        </p>

        <div className="rating">
          ⭐ {book.rating} ({book.reviews} Reviews)
        </div>

        <div className="price-row">

          <span className="price">
            ₹{book.price}
          </span>

          <span className="old-price">
            ₹{book.originalPrice}
          </span>

        </div>

        <p className="stock">
          {book.stock}
        </p>

        <p className="description">
          {book.description}
        </p>

        <button
          onClick={() => addToCart(book)}
        >
          🛒 Add To Cart
        </button>

      </div>

    </section>
  );
}

export default BookDetails;