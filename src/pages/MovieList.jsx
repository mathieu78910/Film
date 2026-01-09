import { useEffect, useMemo, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { fetchFromTMDB } from "../services/themoviedb";
import { Link } from "react-router-dom";
import styles from "./MovieList.module.css";

const CATEGORIES = {
  popular: "/movie/popular",
  now_playing: "/movie/now_playing",
  top_rated: "/movie/top_rated",
  upcoming: "/movie/upcoming",
};

export default function MovieList() {
  const [category, setCategory] = useState("popular");
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);

  const [page, setPage] = useState(1);

  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const mode = useMemo(() => {
    return debouncedQuery.trim().length > 0 ? "search" : "category";
  }, [debouncedQuery]);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");

      try {
        let data;

        if (mode === "search") {
          data = await fetchFromTMDB("/search/movie", `?query=${encodeURIComponent(debouncedQuery)}&page=${page}`);
        } else {
          const endpoint = CATEGORIES[category];
          data = await fetchFromTMDB(endpoint, `?page=${page}`);
        }

        setMovies(data.results || []);
        setTotalPages(Math.min(data.total_pages || 1, 500));
      } catch (err) {
        console.error(err);
        setError("Impossible de charger les films.");
        setMovies([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [category, mode, debouncedQuery, page]);

  useEffect(() => {
    setPage(1);
  }, [category, mode, debouncedQuery]);

  return (
    <div className={styles.container}>
      <h1>Films</h1>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Rechercher un film..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.categories}>
        {Object.entries(CATEGORIES).map(([key]) => (
          <button
            key={key}
            onClick={() => {
              setQuery("");
              setCategory(key);
            }}
            className={category === key && mode === "category" ? styles.active : ""}
          >
            {key.replace("_", " ").toUpperCase()}
          </button>
        ))}
      </div>

      {loading && <p>Chargement...</p>}

      {!loading && error && <p className={styles.error}>{error}</p>}

      {!loading && !error && (
        <>
          <div className={styles.movies}>
            {movies.length > 0 ? (
              movies.map((movie) => (
                <div key={movie.id} className={styles.movie}>
                  {movie.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                      alt={movie.title}
                      loading="lazy"
                    />
                  ) : (
                    <div className={styles.noPoster}>Pas d'affiche</div>
                  )}

                  <h3>{movie.title}</h3>

                  <p className={styles.rating}>
                    ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
                  </p>

                  <p className={styles.date}>
                    {movie.release_date ? movie.release_date.substring(0, 4) : "N/A"}
                  </p>

                  <Link to={`/movie/${movie.id}`} className={styles.detailsLink}>
                    Voir détails
                  </Link>
                </div>
              ))
            ) : (
              <p>Aucun film trouvé.</p>
            )}
          </div>

          {movies.length > 0 && (
            <div className={styles.pagination}>
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                ← Précédent
              </button>

              <span>
                Page <strong>{page}</strong> / {totalPages}
              </span>

              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Suivant →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
