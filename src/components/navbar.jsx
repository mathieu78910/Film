import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/">Films</Link> |{" "}
      <Link to="/wishlist">Wishlist</Link>
    </nav>
  );
}
