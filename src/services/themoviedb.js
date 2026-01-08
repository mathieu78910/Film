// themoviedb.js
const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_THE_MOVIE_DB_API_KEY;

export async function fetchFromTMDB(endpoint) {
  const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&language=fr-FR`;
  console.log("URL:", url); 
  
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Erreur lors de l'appel à TMDB: ${response.status}`);
  }

  return response.json();
}