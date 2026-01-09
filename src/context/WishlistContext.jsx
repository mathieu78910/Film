import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem("wishlist");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = useCallback((movie) => {
    if (!movie?.id) return;
    setWishlist((prev) =>
      prev.some((m) => m.id === movie.id) ? prev : [...prev, movie]
    );
  }, []);

  const removeFromWishlist = useCallback((id) => {
    setWishlist((prev) => prev.filter((movie) => movie.id !== id));
  }, []);

  const isInWishlist = useCallback(
    (id) => wishlist.some((m) => m.id === id),
    [wishlist]
  );

  const value = useMemo(
    () => ({
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
    }),
    [wishlist, addToWishlist, removeFromWishlist, isInWishlist]
  );

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist doit être utilisé dans WishlistProvider");
  return ctx;
}
