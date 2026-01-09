import { useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";
import styles from "./Wishlist.module.css";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const [search, setSearch] = useState("");

  const filteredWishlist = wishlist.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <h1>Ma Wishlist</h1>
      <input
        type="text"
        placeholder="Rechercher dans la wishlist..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />
      {filteredWishlist.length === 0 ? (      
        <p>Aucun film dans la wishlist.</p>
      ) : (
        <div className={styles.movies}>
          {filteredWishlist.map((movie) => (
            <div key={movie.id} className={styles.movie}>
              {movie.poster_path && (
                <img
                  className={styles.poster}
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
              )}
              <h3>
                <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
              </h3>
              <button
                onClick={() => removeFromWishlist(movie.id)}
                className={styles.removeButton}
              >
                Retirer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}