import "./ProductCard.css";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

function ProductCard({
  id,
  title,
  author,
  description,
  price,
  originalPrice,
  rating,
  reviews,
  bestseller,
  stock,
  image,
  onAddToCart,
}) {
  const discount = Math.round(
    ((originalPrice - price) / originalPrice) * 100
  );

  const {
    addToWishlist,
    removeFromWishlist,
    isWishlisted,
  } = useWishlist();

  const book = {
    id,
    title,
    author,
    description,
    price,
    originalPrice,
    rating,
    reviews,
    bestseller,
    stock,
    image,
  };

  const wished = isWishlisted(id);

  function handleWishlist(e) {
    e.preventDefault();
    e.stopPropagation();

    if (wished) {
      removeFromWishlist(id);
    } else {
      addToWishlist(book);
    }
  }

  return (
    <div className="product-card">

      {bestseller && (
        <span className="badge">
          BESTSELLER
        </span>
      )}

      <button
        className="wishlist-btn"
        onClick={handleWishlist}
      >
        {wished ? "❤️" : "🤍"}
      </button>

      <Link
        to={`/books/${id}`}
        className="product-link"
      >
        <img
          src={image}
          alt={title}
          className="book-image"
        />

        <div className="product-content">

          <h3>{title}</h3>

          <p className="author">
            by {author}
          </p>

          <p className="description">
            {description}
          </p>

          <div className="rating">
            ⭐ {rating}
            <span>
              ({reviews} Reviews)
            </span>
          </div>

          <div className="price-box">

            <span className="price">
              ₹{price}
            </span>

            <span className="old-price">
              ₹{originalPrice}
            </span>

          </div>

          <p className="discount">
            Save {discount}%
          </p>

          <p
            className={
              stock > 5
                ? "stock in-stock"
                : "stock low-stock"
            }
          >
            {stock > 5
              ? `In Stock (${stock})`
              : `Only ${stock} Left`}
          </p>

        </div>

      </Link>

      <button
        className="cart-btn"
        onClick={onAddToCart}
      >
        🛒 Add to Cart
      </button>

    </div>
  );
}

export default ProductCard;