import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchFromTMDB } from "../services/themoviedb";
import { useWishlist } from "../context/WishlistContext";
import styles from "./MovieDetail.module.css";

export default function MovieDetail() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [actors, setActors] = useState([]);
  const [similar, setSimilar] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isInWishlist = movie ? wishlist.some((m) => m.id === movie.id) : false;



  useEffect(() => {
  fetchFromTMDB(`/movie/${id}`)
    .then(setMovie)
    .catch(console.error);

  fetchFromTMDB(`/movie/${id}/credits`)
    .then((data) => setActors(data.cast.slice(0, 10)))
    .catch(console.error);

  fetchFromTMDB(`/movie/${id}/similar`)
    .then((data) => setSimilar(data.results))
    .catch(console.error);

  fetchFromTMDB(`/movie/${id}/videos`)
    .then((data) => {
      const yt = data.results.find(
        (v) => v.site === "YouTube" && v.type === "Trailer"
      );
      setTrailer(yt);
    })
    .catch(console.error);
}, [id]);



  if (!movie) return <p>Chargement...</p>;

  return (
    <div className={styles.container}>
      <h1>{movie.title}</h1>

      {movie.poster_path && (
        <img
          className={styles.poster}
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
        />
      )}

      <p>{movie.overview}</p>
      <p>Date de sortie : {movie.release_date}</p>
      <p>⭐ {movie.vote_average}</p>
      {trailer && (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${trailer.key}`}
          title="Trailer"
          allowFullScreen
        />
      )}
      <div className={styles.actors}>
        <h2>Acteurs principaux</h2>
        <div className={styles.grid}>
          {actors.map((actor) => (
            <div key={actor.id}>
              {actor.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                />
              )}
              <p>{actor.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.similar}>
        <h2>Films similaires</h2>
        <div className={styles.grid}>
          {similar.map((film) => (
            <div key={film.id}>
              {film.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${film.poster_path}`}
                  alt={film.title}
                />
              )}
              <p>{film.title}</p>
            </div>
          ))}
        </div>
       <button
  className={`${styles.wishlistButton} ${
    isInWishlist ? styles.added : ""
  }`}
  onClick={() =>
    isInWishlist ? removeFromWishlist(movie.id) : addToWishlist(movie)
  }
>
  {isInWishlist ? "Retirer de la wishlist" : "Ajouter à la wishlist"}
</button>

      </div>
    </div>
  );
}
