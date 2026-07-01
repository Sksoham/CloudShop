import "./Books.css";

import ProductCard from "../components/ProductCard";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

function Wishlist() {

  const { wishlist } = useWishlist();

  const { addToCart } = useCart();

  return (

    <section className="featured-books">

      <h2>❤️ My Wishlist</h2>

      <div className="book-grid">

        {wishlist.length === 0 ? (

          <h2>No books in wishlist.</h2>

        ) : (

          wishlist.map((book) => (

            <ProductCard
              key={book.id}
              id={book.id}
              title={book.title}
              author={book.author}
              description={book.description}
              price={book.price}
              originalPrice={book.originalPrice}
              rating={book.rating}
              reviews={book.reviews}
              bestseller={book.bestseller}
              stock={book.stock}
              image={book.image}
              onAddToCart={() => addToCart(book)}
            />

          ))

        )}

      </div>

    </section>

  );

}

export default Wishlist;