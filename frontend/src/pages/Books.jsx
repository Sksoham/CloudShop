import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./Books.css";

import ProductCard from "../components/ProductCard";
import books from "../data/books";

import { useCart } from "../context/CartContext";

function Books() {
  const { addToCart } = useCart();

  const [searchParams] = useSearchParams();

  const initialCategory =
    searchParams.get("category") || "All";

  const initialSearch =
    searchParams.get("search") || "";

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState("");

  const filteredBooks = books
    .filter((book) => {
      const matchesSearch =
        book.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        book.author
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        book.category === category;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sort === "low")
        return a.price - b.price;

      if (sort === "high")
        return b.price - a.price;

      if (sort === "rating")
        return b.rating - a.rating;

      return 0;
    });

  return (
    <section className="featured-books">

      <h2>Cloud Books</h2>

      <div className="toolbar">

        <input
          className="search"
          type="text"
          placeholder="🔍 Search books..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
        >
          <option value="All">
            All Categories
          </option>

          <option value="Cloud">
            Cloud
          </option>

          <option value="DevOps">
            DevOps
          </option>

          <option value="Frontend">
            Frontend
          </option>
        </select>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >
          <option value="">
            Sort By
          </option>

          <option value="low">
            Price: Low → High
          </option>

          <option value="high">
            Price: High → Low
          </option>

          <option value="rating">
            Highest Rated
          </option>
        </select>

      </div>

      <div className="book-grid">

        {filteredBooks.length === 0 ? (

          <h2>No books found.</h2>

        ) : (

          filteredBooks.map((book) => (

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
              onAddToCart={() =>
                addToCart(book)
              }
            />

          ))

        )}

      </div>

    </section>
  );
}

export default Books;