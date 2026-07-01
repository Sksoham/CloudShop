import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  function addToWishlist(book) {
    const exists = wishlist.find((item) => item.id === book.id);

    if (exists) return;

    setWishlist([...wishlist, book]);
  }

  function removeFromWishlist(id) {
    setWishlist(
      wishlist.filter((item) => item.id !== id)
    );
  }

  function isWishlisted(id) {
    return wishlist.some((item) => item.id === id);
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}