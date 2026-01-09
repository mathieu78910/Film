const API_KEY = import.meta.env.VITE_THE_MOVIE_DB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export async function fetchFromTMDB(endpoint, params = "") {
  try {
    if (!API_KEY) {
      throw new Error("Clé API manquante. Vérifiez votre fichier .env");
    }
    
    let url = `${BASE_URL}${endpoint}`;

    if (params.startsWith("?")) {
      url += `${params}&api_key=${API_KEY}&language=fr-FR`;
    } 
    else if (params.startsWith("&")) {
      url += `?api_key=${API_KEY}&language=fr-FR${params}`;
    }
    else if (params === "") {
      url += `?api_key=${API_KEY}&language=fr-FR`;
    }
    else {
      url += `?api_key=${API_KEY}&language=fr-FR&${params}`;
    }
    
    console.log("🔗 URL appelée:", url); 
    
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erreur API ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    
    if (data.success === false) {
      throw new Error(data.status_message || "Erreur inconnue de l'API TMDB");
    }
    
    return data;
    
  } catch (error) {
    console.error("❌ Erreur fetchFromTMDB:", error.message);
    throw error;
  }
}