# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



#####################################
dans le fichier .env il faut ajouter cette variable 

VITE_THE_MOVIE_DB_API_KEY=YOUR_API_KEY


#####################################
les dépendances pour installer le fichiers  : 

npm install react-router-dom

#####################################
Fonctionnement de l’API TMDB
L’application utilise plusieurs endpoints TMDB :

/movie/popular

/movie/top_rated

/movie/now_playing

/movie/upcoming

/search/movie

/movie/{id}

/movie/{id}/credits

/movie/{id}/videos

/movie/{id}/similar

Les appels sont centralisés dans themoviedb.js.


#####################################
Structure du projet
FILM/
├── node_modules/
├── public/
├── .env
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
├── README.md
│
└── src/
    ├── App.jsx
    ├── main.jsx
    │
    ├── components/
    │   └── navbar.jsx
    │
    ├── context/
    │   └── WishlistContext.jsx
    │
    ├── hooks/
    │   └── useDebounce.js
    │
    ├── pages/
    │   ├── MovieDetail.jsx
    │   ├── MovieDetail.module.css
    │   ├── MovieList.jsx
    │   ├── MovieList.module.css
    │   ├── Wishlist.jsx
    │   └── Wishlist.module.css
    │
    ├── services/
    │   └── themoviedb.js
    │
    └── styles/
        ├── global.css
        └── Navbar.css
