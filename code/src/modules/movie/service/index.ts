import { authService } from "../../auth/service";
import { MovieService } from "./movie-service";

const movieService = new MovieService(authService);

export { movieService };
