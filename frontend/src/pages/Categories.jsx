import { Link } from "react-router-dom";
import { FaCloud, FaDocker, FaReact } from "react-icons/fa";
import books from "../data/books";
import "./Categories.css";

function Categories() {

  const categories = [
    {
      name: "Cloud",
      icon: <FaCloud />,
      count: books.filter(book => book.category === "Cloud").length,
    },
    {
      name: "DevOps",
      icon: <FaDocker />,
      count: books.filter(book => book.category === "DevOps").length,
    },
    {
      name: "Frontend",
      icon: <FaReact />,
      count: books.filter(book => book.category === "Frontend").length,
    },
  ];

  return (
    <section className="categories-page">

      <h1>Browse Categories</h1>

      <p>
        Explore books by technology.
      </p>

      <div className="categories-grid">

        {categories.map((category) => (

          <Link
  key={category.name}
  to={`/books?category=${category.name}`}
  className="category-card"
>

            <div className="category-icon">
              {category.icon}
            </div>

            <h2>{category.name}</h2>

            <p>
              {category.count} Book
              {category.count > 1 ? "s" : ""}
            </p>

          </Link>

        ))}

      </div>

    </section>
  );
}

export default Categories;