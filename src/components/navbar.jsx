import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

export default function Navbar() {
  const { wishlist } = useWishlist();

  return (
    <nav>
      <Link to="/">🎬 Films</Link>
      <Link 
        to="/wishlist"
        data-count={wishlist.length}
      >
        ❤️ Wishlist ({wishlist.length})
      </Link>
    </nav>
  );
}