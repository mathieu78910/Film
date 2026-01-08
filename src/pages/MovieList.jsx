import { useEffect, useState } from "react";
import { fetchFromTMDB } from "../services/themoviedb.js";

export default function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchFromTMDB("/movie/popular")
      .then((data) => setMovies(data.results))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Films populaires</h1>

      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.title} ⭐ {movie.vote_average}
          </li>
        ))}
      </ul>
    </div>
  );
}
