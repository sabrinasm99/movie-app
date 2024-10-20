const isProduction = import.meta.env.VITE_ENV === "production";
const devUrl = "http://localhost:3000";
const productionUrl = "https://sabrina-movie-app.netlify.app";

export const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3",
  redirectUrl: isProduction ? productionUrl : devUrl,
};
