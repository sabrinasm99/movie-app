const isProduction = import.meta.env.VITE_ENV === "production";
const { protocol, hostname, port } = window.location;
const devUrl = `${protocol}//${hostname}:${port}`;
const productionUrl = "https://sabrina-movie-app.netlify.app";

export const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3",
  redirectUrl: isProduction ? productionUrl : devUrl,
};
