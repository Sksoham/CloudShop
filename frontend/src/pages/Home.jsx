import { Link } from "react-router-dom";
import "./Home.css";

import books from "../data/books";
import ProductCard from "../components/ProductCard";
import { useCart } from "../context/CartContext";

function Home() {
  const { addToCart } = useCart();

  const featuredBooks = books.slice(0, 4);

  return (
    <>
      {/* ================= HERO ================= */}

      <section className="hero">
        <div className="hero-left">
          <span className="hero-tag">
            📚 #1 Cloud Learning Bookstore
          </span>

          <h1>
            Learn Cloud Computing
            <br />
            Like a Professional
          </h1>

          <p>
            Master AWS, Docker, Kubernetes, React and modern cloud
            technologies with carefully selected books from industry experts.
          </p>

          <div className="hero-buttons">
            <Link to="/books">
              <button className="primary-btn">
                Shop Now
              </button>
            </Link>

            <Link to="/books">
              <button className="secondary-btn">
                Explore Books
              </button>
            </Link>
          </div>

          <div className="hero-stats">

            <div>
              <h2>500+</h2>
              <p>Books</p>
            </div>

            <div>
              <h2>20K+</h2>
              <p>Students</p>
            </div>

            <div>
              <h2>4.9★</h2>
              <p>Rating</p>
            </div>

          </div>
        </div>

        <div className="hero-right">
          <img
            src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1200"
            alt="Cloud Books"
          />
        </div>
      </section>

      {/* ================= FEATURES ================= */}

      <section className="features">

        <h2>Why Choose CloudShop?</h2>

        <div className="features-grid">

          <div className="feature-card">
            <div className="icon">🚀</div>

            <h3>Instant Access</h3>

            <p>
              Start learning immediately with digital books.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">📚</div>

            <h3>500+ Books</h3>

            <p>
              Huge collection covering cloud technologies.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">⭐</div>

            <h3>Top Rated</h3>

            <p>
              Books recommended by professionals.
            </p>
          </div>

          <div className="feature-card">
            <div className="icon">🔒</div>

            <h3>Secure Checkout</h3>

            <p>
              Fast and secure shopping experience.
            </p>
          </div>

        </div>

      </section>

      {/* ================= FEATURED BOOKS ================= */}

      <section className="featured-home">

        <div className="section-title">

          <h2>Featured Books</h2>

          <Link
            to="/books"
            className="view-all"
          >
            View All →
          </Link>

        </div>

        <div className="book-grid">

          {featuredBooks.map((book) => (

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

          ))}

        </div>

      </section>

    </>
  );
}

export default Home;