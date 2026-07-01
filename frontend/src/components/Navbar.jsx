import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

import {
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaSearch,
  FaChevronDown,
} from "react-icons/fa";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { totalItems } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();

  const [search, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/books?search=${search}`);
    } else {
      navigate("/books");
    }
  };

  const handleLogout = () => {
    logout();
    setShowMenu(false);
    navigate("/");
  };

  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        📚 <span>CloudShop</span>
      </Link>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search cloud books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />

        <button onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>

      <ul className="nav-links">

        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/books">Books</Link>
        </li>

        <li>
          <Link to="/categories">Categories</Link>
        </li>

        <li>
          <Link to="/wishlist" className="icon-link">
            <FaHeart />
            Wishlist

            {wishlist.length > 0 && (
              <span className="badge">
                {wishlist.length}
              </span>
            )}
          </Link>
        </li>

        <li>
          <Link to="/cart" className="icon-link">
            <FaShoppingCart />
            Cart

            {totalItems > 0 && (
              <span className="badge">
                {totalItems}
              </span>
            )}
          </Link>
        </li>

        {!user ? (
          <>
            <li>
              <Link to="/login" className="login-btn">
                <FaUser />
                Login
              </Link>
            </li>

            <li>
              <Link to="/register" className="login-btn">
                Register
              </Link>
            </li>
          </>
        ) : (
          <li className="user-menu" ref={menuRef}>

            <button
              className="user-btn"
              onClick={() => setShowMenu(!showMenu)}
            >
              <FaUser />
              {user.name}
              <FaChevronDown size={12} />
            </button>

            {showMenu && (
              <div className="dropdown-menu">

                <Link
                  to="/profile"
                  onClick={() => setShowMenu(false)}
                >
                  Profile
                </Link>

                <Link
                  to="/orders"
                  onClick={() => setShowMenu(false)}
                >
                  Orders
                </Link>

                <Link
                  to="/wishlist"
                  onClick={() => setShowMenu(false)}
                >
                  Wishlist
                </Link>

                <button onClick={handleLogout}>
                  Logout
                </button>

              </div>
            )}

          </li>
        )}

      </ul>

    </nav>
  );
}

export default Navbar;